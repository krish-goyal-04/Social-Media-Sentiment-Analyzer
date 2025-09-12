import asyncio
import aiohttp
import os
import time
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
URL = "https://api.twitterapi.io/twitter/tweet/advanced_search"
HEADERS = {"X-API-Key": API_KEY}

REQUESTS_PER_SECOND = 18  # lower if you still get 429
DELAY = 1 / REQUESTS_PER_SECOND   # gap between requests


async def fetch_page(session, query, cursor=None):
    """Fetch one page of tweets"""
    params = {"query": query, "queryType": "Top"}
    if cursor:
        params["cursor"] = cursor

    async with session.get(URL, headers=HEADERS, params=params) as resp:
        if resp.status != 200:
            print(f"Error {resp.status}")
            return [], None

        data = await resp.json()
        tweets = []
        for tweet in data.get("tweets", []):
            if len(tweet.get("text", "")) >= 30:
                tweets.append({
                    "id": tweet.get("id"),
                    "url": tweet.get("url"),
                    "text": tweet.get("text", ""),
                    "retweetCount": tweet.get("retweetCount", 0),
                    "replyCount": tweet.get("replyCount", 0),
                    "likeCount": tweet.get("likeCount", 0),
                    "quoteCount": tweet.get("quoteCount", 0),
                    "viewCount": tweet.get("viewCount", 0),
                    "createdAt": tweet.get("createdAt", ""),
                    "authorName": tweet.get("author", {}).get("userName"),
                    "hashtags": [h.get("text") for h in tweet.get("entities", {}).get("hashtags", [])]
                })
        return tweets, data.get("next_cursor")


async def fetch_tweets(query, max_tweets=500):
    """Fetch tweets while respecting API rate limits (staggered)."""
    tweets = []
    cursor = None

    async with aiohttp.ClientSession() as session:
        while len(tweets) < max_tweets:
            page_tweets, next_cursor = await fetch_page(session, query, cursor)
            tweets.extend(page_tweets)

            print(f"Fetched {len(tweets)} so far")

            if not next_cursor:  # no more pages
                break
            cursor = next_cursor

            # wait before next request
            await asyncio.sleep(DELAY)

    return tweets

"""if __name__ == "__main__":
    query = "AI"
    results = asyncio.run(fetch_tweets(query, max_tweets=100))
    print("\n=== Final Tweets ===")
    for t in results:
        print(t)"""





