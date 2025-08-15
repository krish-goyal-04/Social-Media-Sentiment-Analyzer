import nltk
from nltk.tokenize import word_tokenize,sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def sentence_tokenizer(text):
    return sent_tokenize(text)

#Word Tokenizer and Stopwords removal and lemmatization
def word_tokenizer(text):
    sentences = sentence_tokenizer(text)
    lemmatizer = WordNetLemmatizer()
    for i in range(len(sentences)):
        words = word_tokenize(sentences[i])
        words = [lemmatizer.lemmatize(word,'v').lower() for word in words if word.lower() not in set(stopwords.words('english')) and word.isalpha()]
        sentences[i]=' '.join(words)
    return sentences

print(word_tokenizer("""Lemmatization is an important text pre-processing technique in Natural Language Processing (NLP) that reduces words to their base form known as a "lemma." For example, the lemma of "running" is "run" and "better" becomes "good." Unlike stemming which simply removes prefixes or suffixes, it considers the word's meaning and part of speech (POS) and ensures that the base form is a valid word. This makes lemmatization more accurate as it avoids generating non-dictionary words.

Lemmatization is important for various reasons in NLP:

Improves accuracy: It ensures words with similar meanings like "running" and "ran" are treated as the same.
Reduced Data Redundancy: By reducing words to their base forms, it reduces redundancy in the dataset. This leads to smaller datasets which makes it easier to handle and process large amounts of text for analysis or training machine learning models.
Better NLP Model Performance: By treating all similar word as same, it improves the performance of NLP models by making text more consistent. For example, treating "running," "ran" and "runs" as the same word improves the model's understanding of context and meaning."""))
