"""Text cleaning utilities
----------------------------
Lightweight normalization for tweets:
- Replace URLs with a placeholder (http)
- Replace @mentions with @user
- Strip emojis/symbols and non-alphanumeric punctuation
- Remove # from hashtags but keep the tag text
- Lowercase and collapse repeated whitespace

Precompiled regexes are used to avoid recompilation overhead in hot paths.
"""

import re

# Precompiled regex patterns for efficiency
URL_PATTERN = re.compile(r'http\S+')
MENTION_PATTERN = re.compile(r'@\w+')
EMOJI_PATTERN = re.compile(
    "["
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F680-\U0001F6FF"  # transport & map symbols
    "\U0001F1E0-\U0001F1FF"  # flags
    "\u2702-\u27B0"          # dingbats
    "\u24C2-\U0001F251"
    "]+", flags=re.UNICODE)
SPECIAL_CHAR_PATTERN = re.compile(r'[^\w\s]')
HASHTAG_PATTERN = re.compile(r'#')
WHITESPACE_PATTERN = re.compile(r'\s+')

def clean_text(text):
    """Normalize a single tweet to a clean, lowercased form.

    Parameters
    ----------
    text : str
        Raw tweet text.

    Returns
    -------
    str
        Cleaned text suitable for tokenization and modeling.
    """
    # Replace URLs
    text = URL_PATTERN.sub('http', text)
    # Replace user mentions
    text = MENTION_PATTERN.sub('@user', text)
    # Remove emojis and symbols
    text = EMOJI_PATTERN.sub(r'', text)
    # Remove special characters except alphanumeric and whitespace
    text = SPECIAL_CHAR_PATTERN.sub('', text)
    # Remove '#' from hashtags but keep text
    text = HASHTAG_PATTERN.sub('', text)
    # Lowercase
    text = text.lower()
    # Remove extra whitespace
    text = WHITESPACE_PATTERN.sub(' ', text).strip()
    return text
