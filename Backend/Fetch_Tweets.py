import requests


def fetch_tweets(query,max_tweets=20):

    url = "https://api.twitterapi.io/twitter/tweet/advanced_search"

    headers = {"X-API-Key": "<api-key>"}

    response = requests.get(url, headers=headers)

    print(response.json())