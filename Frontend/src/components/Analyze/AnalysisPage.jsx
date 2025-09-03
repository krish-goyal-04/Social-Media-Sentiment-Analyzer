import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
const sampleTweets = [
  {
    createdAt: "Tue Sep 02 09:15:00 +0000 2025",
    individual_sentiment: { sentiment: "positive", confidence: 0.92 },
    text: "Loving this product! 🚀",
  },
  {
    createdAt: "Tue Sep 02 09:45:00 +0000 2025",
    individual_sentiment: { sentiment: "negative", confidence: 0.81 },
    text: "This update broke everything 😡",
  },
  {
    createdAt: "Tue Sep 02 09:55:00 +0000 2025",
    individual_sentiment: { sentiment: "neutral", confidence: 0.65 },
    text: "It's okay, nothing special.",
  },
  {
    createdAt: "Tue Sep 02 10:20:00 +0000 2025",
    individual_sentiment: { sentiment: "positive", confidence: 0.88 },
    text: "Great improvements in the UI 👌",
  },
  {
    createdAt: "Tue Sep 02 10:40:00 +0000 2025",
    individual_sentiment: { sentiment: "negative", confidence: 0.73 },
    text: "Still crashing sometimes…",
  },
  {
    createdAt: "Tue Sep 02 11:05:00 +0000 2025",
    individual_sentiment: { sentiment: "positive", confidence: 0.95 },
    text: "Best update so far! 🎉",
  },
  {
    createdAt: "Tue Sep 02 11:25:00 +0000 2025",
    individual_sentiment: { sentiment: "neutral", confidence: 0.70 },
    text: "Just checking out the new version.",
  },
];

const AnalysisPage = ()=>{
    return(
        <div className="min-h-screen w-full dark:bg-gray-900 px-6 md:px-12 lg:px-20 py-8">
            <div className="mb-10">
                <SearchBar />
            </div>
            {/*<div className="p-6 md:p-10 space-y-3 mx-15">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-indigo-400 dark:text-gray-100 text-center font-extrabold">
                    Sentiment Analysis Overview
                </h2>
                {<SentimentOverTime tweets={sampleTweets}/>}
            </div>*/}
                
        </div>
    )
}

export default AnalysisPage