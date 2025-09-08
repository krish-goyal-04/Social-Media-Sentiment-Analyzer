from Keyword_Extractor import extract_keywords
from Sentiment_Analysis import sentiment_analyzer
from Text_Cleaning import clean_text
from better_profanity import profanity
import pandas as pd
from Fetch_Tweets import fetch_tweets
import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from Emotion_Detection import detect_emotion

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
async def mainFun(request:QueryRequest):
    tweets = await fetch_tweets(request.query,max_tweets=request.max_tweets)
    if tweets == []:
        return {
            "tweetsData": [],
            "keywords": []
        }
    df = pd.DataFrame(tweets)

    df['profanity_flag'] = df['text'].apply(lambda x: profanity.contains_profanity(str(x)))

    df['cleaned_data'] = df['text'].apply(clean_text)

    df['individual_sentiment'] = sentiment_analyzer(df['cleaned_data'].tolist())
    
    df['detected_emotion'] = detect_emotion(df['text'].tolist())

    keywords = extract_keywords(df['cleaned_data'].tolist())
    
    return{
        "tweetsData":df.to_dict(orient='records'),
        "keywords":keywords
    }

