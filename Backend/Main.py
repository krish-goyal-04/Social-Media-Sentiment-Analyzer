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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
    df = pd.DataFrame(tweets)
    #df['text'] = tweets

    df['profanity_flag'] = df['text'].apply(lambda x: profanity.contains_profanity(str(x)))

    df['cleaned_data'] = df['text'].apply(clean_text)

    df['individual_sentiment'] = df['cleaned_data'].apply(sentiment_analyzer) 
    
    keywords = extract_keywords(df['cleaned_data'].tolist())
    
    return{
        "tweetsData":df.to_dict(orient='records'),
        "keywords":keywords
    }

