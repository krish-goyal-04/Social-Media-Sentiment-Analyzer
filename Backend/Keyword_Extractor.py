from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np


def extract_keywords(corpus,top_n=25):

    if isinstance(corpus,str):
        corpus = [corpus]
    
    vectorizer = TfidfVectorizer(stop_words='english',max_df=0.85,min_df=1,ngram_range=(1,2))

    vectorized_corpus = vectorizer.fit_transform(corpus)
    features_array = np.array(vectorizer.get_feature_names_out())
    tfidf_scores =vectorized_corpus.toarray().sum(axis=0)
    keyword_scores = [
        {"keyword": word,"score":float(score)} for word,score in zip(features_array,tfidf_scores)
    ]

    keyword_scores = sorted(keyword_scores,key=lambda x:x["score"],reverse=True)

    top_keywords = keyword_scores[:top_n]
    return top_keywords




    
"""tweets = [
    "Covid cases are increasing fast!",
    "I love the new iPhone.",
    "This weather is terrible today."
]
print(extract_keywords(tweets))"""