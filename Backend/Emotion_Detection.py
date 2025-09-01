from transformers import pipeline

pipe = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-emotion-multilabel-latest", return_all_scores=True)

"""text = [
    "I love this product, it's amazing! ❤️",
    "I'm so frustrated with the service.",
    "Feeling hopeful about the future!",
    "Why does this always happen to me? 😢",
    "Haha that was hilarious 😂"
]"""

def detect_emotion(text,batch_size=32):
    if isinstance(text,str):
        text = [text]
    results = pipe(text,batch_size=batch_size)
    final = []
    for i,res in enumerate(results):
        top_emotion = max(res,key=lambda x:x['score'])
        final.append({
            "emotion":top_emotion['label'],
            "score":top_emotion['score']
        })
    return final
