"""Sentiment Analysis
---------------------------------
This module loads a RoBERTa model fine-tuned for Twitter sentiment and exposes
`sentiment_analyzer`, which performs batched inference over a list of texts.

Key concepts
- Tokenization: texts are tokenized with a max_length of 128 tokens. Longer
    texts are gracefully truncated by the tokenizer (standard practice for tweets).
- Batching: inputs are processed in batches (default 32) for better throughput.
- Device selection: if CUDA is available, the model runs on GPU; otherwise CPU.
    PyTorch releases the GIL in its tensor ops, so this function can be executed
    in parallel threads to utilize multiple CPU cores.

Inputs
- text: str | list[str]
    A single string or list of strings to analyze.
- batch_size: int
    Number of texts per batch for inference.

Output
- list[dict]: [{"label": "positive|neutral|negative", "confidence": 0..1}, ...]
"""

from transformers import logging, AutoTokenizer, AutoModelForSequenceClassification
import torch

logging.set_verbosity_error()

MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

# Optional: device detection for future improvements
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

def sentiment_analyzer(text, batch_size=32):
    if isinstance(text, str):
        text = [text]
    results = []
    for i in range(0, len(text), batch_size):
        batch_texts = text[i:i+batch_size]
        # Tokenize with padding/truncation for uniform sequence length. A shorter
        # max_length (128) significantly improves throughput for tweet-length text.
        encodings = tokenizer(batch_texts, return_tensors='pt', padding=True, truncation=True, max_length=128)
        encodings = {k: v.to(device) for k, v in encodings.items()}
        with torch.no_grad():
            outputs = model(**encodings)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        predictions = torch.argmax(probabilities, dim=-1)
        for pred, prob in zip(predictions, probabilities):
            label = model.config.id2label[pred.item()]
            confidence = prob[pred.item()].item()
            results.append({"label": label, "confidence": round(confidence, 2)})
    return results
