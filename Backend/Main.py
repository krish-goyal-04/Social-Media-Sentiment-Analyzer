"""FastAPI application for tweet analysis
-----------------------------------------
Pipeline per request:
    1) Fetch tweets page-by-page (async) respecting QPS limits
    2) For each page, preprocess and run sentiment + emotion in parallel threads
    3) Aggregate results and compute TF-IDF keywords once at the end

Threads are used for CPU-bound model inference because PyTorch releases the GIL
and threads can share model weights (more memory efficient than processes).
"""

from Keyword_Extractor import extract_keywords
from Sentiment_Analysis import sentiment_analyzer
import pandas as pd
from Fetch_Tweets import fetch_tweets_by_page
import asyncio
from concurrent.futures import ThreadPoolExecutor
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from Emotion_Detection import detect_emotion
from Text_Preprocessing import preprocess_tweet

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",  
        "http://127.0.0.1:5174",
        "http://localhost:5175",  
        "http://127.0.0.1:5175"    
    ],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers = ["*"]
)

class QueryRequest(BaseModel):
    query:str
    max_tweets:int=50



@app.post("/analyze/")
async def mainFun(request: QueryRequest):
    # ---------------------------------------------------------------------
    # Thread pool for CPU-bound work (model inference on 6-core machine)
    # ---------------------------------------------------------------------
    # Why threads not processes?
    # - PyTorch ops release the GIL during heavy tensor math, so threads
    #   can run in parallel and share the same loaded model weights.
    # - Using processes would duplicate model memory per process, which is
    #   expensive for large transformers and slower to start.
    MAX_WORKERS = min(6, os.cpu_count() or 6)
    executor = ThreadPoolExecutor(max_workers=MAX_WORKERS)
    loop = asyncio.get_running_loop()

    # --------------------------------------------------------------
    # Process tweets page-by-page as they arrive from the fetcher
    # --------------------------------------------------------------
    async def process_batch(batch):
        """Process a single fetched page of tweets end-to-end.
        Steps (CPU-bound parts offloaded to thread pool):
          1) Lightweight preprocessing (sync, vectorizable)
          2) Sentiment + Emotion inferences run in parallel threads
          3) Return records and cleaned texts for later aggregation
        """
        df_batch = pd.DataFrame(batch)
        processed = df_batch["text"].apply(preprocess_tweet)
        df_batch["profanity_flag"] = processed.apply(lambda x: x["profanity_flag"])    
        df_batch["cleaned_data"] = processed.apply(lambda x: x["cleaned_data"])

        # Run model inferences for the batch in parallel using our executor.
        # Each call is CPU-heavy; running them concurrently reduces wall time.
        sent_future = loop.run_in_executor(executor, sentiment_analyzer, df_batch['cleaned_data'].tolist())
        emo_future  = loop.run_in_executor(executor, detect_emotion,     df_batch['text'].tolist())
        sent_res, emo_res = await asyncio.gather(sent_future, emo_future)

        df_batch['individual_sentiment'] = sent_res
        df_batch['detected_emotion'] = emo_res
        return df_batch.to_dict(orient='records'), df_batch['cleaned_data'].tolist()

    all_records = []
    all_cleaned = []
    tasks = []

    # Fetch pages one-by-one; as soon as one arrives, start processing it
    # in the background so we overlap network I/O with CPU inference.
    async for page in fetch_tweets_by_page(request.query, max_tweets=request.max_tweets):
        tasks.append(asyncio.create_task(process_batch(page)))

    if not tasks:
        return {"tweetsData": [], "keywords": []}

    for recs, cleaned in await asyncio.gather(*tasks):
        all_records.extend(recs)
        all_cleaned.extend(cleaned)

    # Keyword extraction over all cleaned texts (fast; run once at the end)
    keywords = extract_keywords(all_cleaned)

    # Return aggregated results (bug fix: return all_records, not undefined df)
    return {"tweetsData": all_records, "keywords": keywords}

