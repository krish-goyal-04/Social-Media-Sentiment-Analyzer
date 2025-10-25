from transformers import pipeline

pipe = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-emotion-multilabel-latest", top_k=1, truncation=True,padding=True,max_length=512,batch_size=32)

"""text = [
    "I love this product, it's amazing! ❤️",
    "I'm so frustrated with the service.",
    "Feeling hopeful about the future!",
    "Why does this always happen to me? 😢",
    "Haha that was hilarious 😂"
]"""

def detect_emotion(text):
    if isinstance(text,str):
        text = [text]
    results = pipe(text)
    final = []
    for r in results:
        final.append({"emotion": r[0]['label'], "score": round(r[0]['score'], 4)})
    return final
"""if __name__ == "__main__":
    print(detect_emotion(text))"""