from Text_Cleaning import clean_text
from transformers import pipeline,logging,AutoTokenizer, AutoModelForSequenceClassification
import torch

logging.set_verbosity_error()

"""
logging: controls Hugging Face logs (warnings/info messages).

AutoTokenizer: automatically loads the right tokenizer for a model.

AutoModelForSequenceClassification: automatically loads the model architecture that is built for classification (like positive/negative sentiment).

torch imports Pytorch is the framework which runs the model

"""

MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
#MODEL = "distilbert-base-uncased-finetuned-sst-2-english" this doesnot give accurate output
sentiment_pipeline = pipeline("sentiment-analysis",model=MODEL)

tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)


def sentiment_analyzer(text,batch_size=32):

    if isinstance(text,str):
        text = [text]

    results = []

    for i in range(0,len(text),batch_size):
        #for 100 tweets it will do 32+32+32+4

        batch_texts = text[i:i+batch_size]
        #batch_texts = [clean_tweet_text(t)for t in batch_texts]
        encodings = tokenizer(batch_texts,return_tensors='pt',padding=True,truncation=True)

        """
        return_tensors='pt': return results as PyTorch tensors.

        padding=True: makes all sequences in the batch the same length by padding with special tokens.

        truncation=True: cuts off text if it’s too long for the model.
        """


        with torch.no_grad():
            #disables gradient tracking because we arent training just predicting
            outputs = model(**encodings)
            #output contains logits which contains raw predicted text in neg,neu,pos format, so now we need to get those raw scores normalize them using softmax and discard all other
        
        probabilities = torch.nn.functional.softmax(outputs.logits,dim=-1)

        predictions = torch.argmax(probabilities,dim=-1)

        for pred,prob in zip(predictions,probabilities):
            label = model.config.id2label[pred.item()]
            confidence = prob[pred.item()].item()
            results.append({"label":label,"confidence":round(confidence,2)})
    return results


        

"""
def sentiment_analyzer(text,batch_mode=False):
    if isinstance(text, str):
        text = [text]
        #If text is string, we will convert to list
    text = [clean_tweet_text(t) for t in text]
    if batch_mode:
        result = sentiment_pipeline(text,batch_size=32)
    else:
        result = sentiment_pipeline(text)
    return result
"""
"""tweets = [
    "Covid cases are increasing fast!",
    "I love the new iPhone.",
    "This weather is terrible today."
]"""

#ans = sentiment_analyzer("Covid cases are increasing fast!")
#ans = sentiment_analyzer(tweets)
#print(ans)
