import asyncio
import aiohttp
import os
from dotenv import load_dotenv
import time
load_dotenv()

API_KEY = os.getenv('API_KEY')
URL = "https://api.twitterapi.io/twitter/tweet/advanced_search"
HEADERS = {"X-API-Key": API_KEY}

MAX_CONCURRENT = 10
REQUEST_PER_SECOND = 20
semaphore = asyncio.Semaphore(MAX_CONCURRENT)

async def fetch_page(session,query,cursor=None):
    async with semaphore:
        params = {"query":query,"queryType":"Top"}
        if cursor:
            params['cursor'] = cursor

        async with session.get(URL,headers=HEADERS,params=params) as resp:
            if resp.status!=200:
                print(f"Error{resp.status}")
                return [],None
            
            data = await resp.json()

            tweets = []
            for tweet in data.get("tweets",[]):
                if len(tweet.get("text"))>=30:
                    tweets.append({
                        "id":tweet.get("id"),
                        "url":tweet.get("url"),
                        "text":tweet.get("text",""),
                        "retweetCount":tweet.get("retweetCount",0),
                        "replyCount":tweet.get("replyCount",0),
                        "likeCount":tweet.get("likeCount",0),
                        "quoteCount":tweet.get("quoteCount",0),
                        "viewCount":tweet.get("viewCount",0),
                        "createdAt":tweet.get("createdAt",""),
                        "authorName":tweet['author'].get("userName"),
                        "hashtags":[h.get("text") for h in tweet.get('entities',{}).get('hashtags',[])]
                    })
            
            return tweets,data.get("next_cursor")




async def fetch_tweets(query,max_tweets=1000):
    if query.strip()=="":
        return []
    tweets = []
    cursors = [None]
    last_req_time = time.monotonic()
    async with aiohttp.ClientSession() as session: #Using once open connection Tcp/ip and reusing it
        while len(tweets) < max_tweets and cursors:

            current_batch = cursors[:MAX_CONCURRENT]
            cursors = cursors[MAX_CONCURRENT:]
            """
            We limit concurrency.

            Example: If MAX_CONCURRENT=5 and cursors=[None, "abc", "def", "ghi", "jkl", "mno"]

            current_batch = [None, "abc", "def", "ghi", "jkl"]

            cursors = ["mno"] (remaining).

            This prevents us from launching hundreds of requests at once and overloading the API.
            """
            now = time.monotonic()
            elapsed = now-last_req_time
            if elapsed<1:
                await asyncio.sleep(1-elapsed)
            last_req_time=time.monotonic()


            tasks = [fetch_page(session,query,c) for c in current_batch]
            for coro in asyncio.as_completed(tasks):
                page_tweets,next_cursor = await coro
                tweets.extend(page_tweets)
                if next_cursor and len(tweets)<max_tweets:
                    cursors.append(next_cursor)
            print(f"Fetched{len(tweets)} so far")
    
    return tweets

"""if __name__ == "__main__":
    query = "AI"
    results = asyncio.run(fetch_tweets(query, max_tweets=100))
    print("\n=== Final Tweets ===")
    for t in results:
        print(t)"""