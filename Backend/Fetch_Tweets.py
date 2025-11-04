"""Tweet fetching utilities (async)
-----------------------------------
Provides two entry points:
- fetch_tweets: fetches all pages up to max_tweets and returns a single list
- fetch_tweets_by_page: async generator yielding each page as it arrives

QPS is controlled via env var QPS_LIMIT (default 20). The client applies
timeouts, connection limits, and retries with exponential backoff.
"""

import asyncio
import aiohttp
import os
import random
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
URL = "https://api.twitterapi.io/twitter/tweet/advanced_search"
HEADERS = {"X-API-Key": API_KEY}

# QPS configuration: default to 20 for high-credit accounts; can be overridden via env
REQUESTS_PER_SECOND = int(os.getenv("QPS_LIMIT", "18"))
REQUESTS_PER_SECOND = max(1, REQUESTS_PER_SECOND)
DELAY = 1 / REQUESTS_PER_SECOND   # inter-request gap to respect QPS

# Retry/backoff settings for robustness under rate limiting
MAX_RETRIES = 5
BACKOFF_BASE = 0.25  # seconds
BACKOFF_FACTOR = 2.0


async def fetch_page(session, query, cursor=None):
    """Fetch one page of tweets with retries and backoff."""
    params = {"query": query, "queryType": "Top"}
    if cursor:
        params["cursor"] = cursor

    attempt = 0
    while True:
        try:
            async with session.get(URL, headers=HEADERS, params=params) as resp:
                if resp.status == 200:
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

                # 4xx/5xx handling
                if resp.status == 429 or 500 <= resp.status < 600:
                    if attempt >= MAX_RETRIES:
                        print(f"Error {resp.status}: max retries reached")
                        return [], None
                    # Exponential backoff with a little jitter
                    wait = min(5.0, BACKOFF_BASE * (BACKOFF_FACTOR ** attempt)) + random.uniform(0, 0.1)
                    print(f"HTTP {resp.status}, backing off for {wait:.2f}s (attempt {attempt+1})")
                    attempt += 1
                    await asyncio.sleep(wait)
                    continue
                else:
                    print(f"Error {resp.status}")
                    return [], None

        except (aiohttp.ClientError, asyncio.TimeoutError) as e:
            if attempt >= MAX_RETRIES:
                print(f"Request failed: {e}; max retries reached")
                return [], None
            wait = min(5.0, BACKOFF_BASE * (BACKOFF_FACTOR ** attempt)) + random.uniform(0, 0.1)
            print(f"Request error: {e}; retrying in {wait:.2f}s (attempt {attempt+1})")
            attempt += 1
            await asyncio.sleep(wait)


async def fetch_tweets(query, max_tweets=500):
    """Fetch tweets while respecting API rate limits (staggered)."""
    tweets = []
    cursor = None

    timeout = aiohttp.ClientTimeout(total=15)
    connector = aiohttp.TCPConnector(limit=REQUESTS_PER_SECOND, limit_per_host=REQUESTS_PER_SECOND)
    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
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


async def fetch_tweets_by_page(query, max_tweets=500):
    """Async generator: yields each page (list of tweets) as soon as it's fetched.
    Notes
    -----
    - Keeps a running count (yielded) to ensure we never exceed max_tweets.
    - Respects a simple, fixed inter-request delay (DELAY) to avoid rate limits.
    - You can enhance this with exponential backoff/jitter on 429/5xx if needed.
    - Using an async generator allows the caller to start processing immediately
      while the next page is being fetched.
    """
    yielded = 0
    cursor = None
    timeout = aiohttp.ClientTimeout(total=15)  # protect against slow servers
    connector = aiohttp.TCPConnector(limit=REQUESTS_PER_SECOND, limit_per_host=REQUESTS_PER_SECOND)
    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
        while yielded < max_tweets:
            # Fetch one page using the current cursor (server-driven pagination)
            page_tweets, next_cursor = await fetch_page(session, query, cursor)

            # Stop if the API returns nothing
            if not page_tweets:
                break

            # Do not exceed max_tweets on the final batch
            remaining = max_tweets - yielded
            batch = page_tweets[:remaining]
            yielded += len(batch)

            # Yield immediately so the caller can process while we wait
            yield batch

            # Stop when there are no more pages
            if not next_cursor:
                break

            # Advance the cursor and respect basic pacing between requests
            cursor = next_cursor
            await asyncio.sleep(DELAY)

"""if __name__ == "__main__":
    query = "AI"
    results = asyncio.run(fetch_tweets(query, max_tweets=100))
    print("\n=== Final Tweets ===")
    for t in results:
        print(t)"""





