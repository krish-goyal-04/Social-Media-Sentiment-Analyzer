import re

def clean_tweet_text(text):
    # Replace URLs
    text = re.sub(r'http\S+', 'http', text)
    # Replace user mentions
    text = re.sub(r'@\w+', '@user', text)
    # Remove emojis and symbols
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags
        "\u2702-\u27B0"          # dingbats
        "\u24C2-\U0001F251"
        "]+", flags=re.UNICODE)
    text = emoji_pattern.sub(r'', text)
    # Remove special characters except alphanumeric and whitespace
    text = re.sub(r'[^\w\s]', '', text)
    # Remove '#' from hashtags but keep text
    text = re.sub(r'#', '', text)
    # Lowercase
    text = text.lower()
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text


# Example usage
example_text = "Hello 👋 World! Visit https://example.com @user                     #HappyDay $$$"
print(clean_tweet_text(example_text))
