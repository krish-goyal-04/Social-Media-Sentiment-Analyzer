from Keyword_Extractor import extract_keywords
from Sentiment_Analysis import sentiment_analyzer
from Text_Cleaning import clean_text
import pandas as pd

tweets = [
    "Covid cases are increasing fast!",
    "I love the new iPhone.",
    "This weather is terrible today."
]

def mainFun():
    df = pd.DataFrame()
    df['data'] = tweets
    df['cleaned_data'] = df['data'].apply(clean_text)
    df['indivisual_sentiment'] = df['cleaned_data'].apply(sentiment_analyzer) 
    keywords = extract_keywords(df['cleaned_data'].tolist())
    print(df)
    print(keywords)

if __name__=="__main__":
    mainFun()