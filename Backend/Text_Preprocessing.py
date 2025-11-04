from better_profanity import profanity
from Text_Cleaning import clean_text

def preprocess_tweet(tweet):
    """Minimal preprocessing wrapper for tweets.

    - profanity_flag: boolean indicating presence of profanity
    - cleaned_data: normalized text (see Text_Cleaning.clean_text)
    """
    return {
        "profanity_flag": profanity.contains_profanity(tweet),
        "cleaned_data": clean_text(tweet),
    }