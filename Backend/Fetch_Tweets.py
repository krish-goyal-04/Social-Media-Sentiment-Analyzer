import requests


def fetch_tweets(query,max_tweets=1000):

    url = "https://api.twitterapi.io/twitter/tweet/advanced_search"

    headers = {"X-API-Key": "<api-key>"}

    base_query = f"{query}"

    params = {
        "query" : base_query,
        "queryType" : "Latest",
    }
    tweets = []
    next_cursor = None

    while len(tweets)<max_tweets:
        if next_cursor:
            params['cursor'] = next_cursor
        response = requests.json(url=url,headers=headers,params=params)
        data = response.json()

        for tweet in data["tweets"]:
            if len(tweet)>=30:
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
                    "hashtags":tweet.get('entities').get('hashtags').get("text")
                })

        next_cursor = data.get('next_cursor')
        return tweets


