"""Keyword extraction with TF-IDF
----------------------------------
Computes corpus-level TF-IDF scores for unigrams and bigrams and returns the
top-N tokens by aggregate score. Keeps computation in sparse form for speed
and memory efficiency on larger corpora.
"""

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np


def extract_keywords(corpus, top_n=25):
    """Return top-N keywords from a corpus using TF-IDF.

    Parameters
    ----------
    corpus : str | list[str]
        A single document or list of documents.
    top_n : int
        Number of keywords to return.

    Returns
    -------
    list[dict]
        Sorted list of {"keyword": token, "score": float}.
    """

    if isinstance(corpus, str):
        corpus = [corpus]

    # Unigrams + bigrams with stop-word removal; bound max_df to reduce noise
    vectorizer = TfidfVectorizer(
        stop_words='english', max_df=0.85, min_df=1, ngram_range=(1, 2)
    )

    vectorized_corpus = vectorizer.fit_transform(corpus)
    features_array = np.array(vectorizer.get_feature_names_out())
    # Keep operations sparse for efficiency (avoid .toarray())
    tfidf_scores = (vectorized_corpus.sum(axis=0)).A1
    keyword_scores = [
        {"keyword": word, "score": float(score)}
        for word, score in zip(features_array, tfidf_scores)
    ]

    keyword_scores = sorted(keyword_scores, key=lambda x: x["score"], reverse=True)
    return keyword_scores[:top_n]