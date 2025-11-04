"""Emotion Detection
---------------------
Uses a multilabel RoBERTa model to detect the dominant emotion for each text.
We configure the HF pipeline with truncation (max_length=128) for speed and
run on GPU if available (device=0), otherwise CPU (device=-1).

Input: str | list[str]
Output: list[dict] with keys: emotion, score
"""

from transformers import pipeline
import torch

# Use GPU if available for faster inference; -1 selects CPU in HF pipelines.
device = 0 if torch.cuda.is_available() else -1
emotion_pipe = pipeline(
    "text-classification",
    model="cardiffnlp/twitter-roberta-base-emotion-multilabel-latest",
    top_k=1,
    truncation=True,
    padding=True,
    max_length=128,
    batch_size=32,
    device=device,
)

def detect_emotion(text):
    """Detect the most likely emotion for each text.

    Parameters
    ----------
    text : str | list[str]
        A single string or list of strings.

    Returns
    -------
    list[dict]
        Each element: {"emotion": <label>, "score": <0..1>}
    """
    if isinstance(text, str):
        text = [text]
    results = emotion_pipe(text)
    final = []
    for r in results:
        final.append({"emotion": r[0]['label'], "score": round(r[0]['score'], 4)})
    return final