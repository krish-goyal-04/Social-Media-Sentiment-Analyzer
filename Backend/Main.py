from Keyword_Extractor import extract_keywords
from Sentiment_Analysis import sentiment_analyzer
from Text_Cleaning import clean_text
from better_profanity import profanity
import pandas as pd
from Fetch_Tweets import fetch_tweets
import asyncio

query = "AI"
def mainFun():
    tweets = asyncio.run(fetch_tweets(query,max_tweets=100))
    df = pd.DataFrame(tweets)
    #df['text'] = tweets

    df['profanity_flag'] = df['text'].apply(lambda x: profanity.contains_profanity(str(x)))

    df['cleaned_data'] = df['text'].apply(clean_text)

    df['individual_sentiment'] = df['cleaned_data'].apply(sentiment_analyzer) 
    
    keywords = extract_keywords(df['cleaned_data'].tolist())
    print(df)
    print(keywords)

if __name__=="__main__":
    mainFun()