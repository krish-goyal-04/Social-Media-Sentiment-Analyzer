import re

def remove_emojis_and_special_chars(text):
    # Remove emojis
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F1E0-\U0001F1FF"  # flags (iOS)
        "\U00002702-\U000027B0"  # Dingbats
        "\U000024C2-\U0001F251" 
        "]+", flags=re.UNICODE)
    text = emoji_pattern.sub(r'', text)

    # Remove special characters (keeping alphanumeric and whitespace)
    # [^\w\s] matches any character that is NOT a word character (\w) or whitespace (\s)
    text = re.sub(r'[^\w\s]', '', text) 
    return text


print(remove_emojis_and_special_chars("Hello 👋 World! This is an example #string with some $pecial characters."))