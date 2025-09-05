import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";
import TweetDisplay from "./TweetDisplay";
import TopTweets from "./TopTweets";
import EmotionAnalysis from "./EmotionAnalysis";

const sampleResults = {
  tweetsData: [
    {
      id: "1",
      text: "Feeling hopeful about the future!",
      detected_emotion: { emotion: "optimism", score: 0.92 },
    },
    {
      id: "2",
      text: "This disaster makes me so angry 😡",
      detected_emotion: { emotion: "anger", score: 0.88 },
    },
    {
      id: "3",
      text: "I love the support from this community ❤️",
      detected_emotion: { emotion: "love", score: 0.95 },
    },
    {
      id: "4",
      text: "I’m scared things will get worse...",
      detected_emotion: { emotion: "fear", score: 0.81 },
    },
    {
      id: "5",
      text: "Such a joyful celebration 🎉",
      detected_emotion: { emotion: "joy", score: 0.97 },
    },
    {
      id: "6",
      text: "I trust the process, we’ll get through this.",
      detected_emotion: { emotion: "trust", score: 0.84 },
    },
    {
      id: "7",
      text: "Losing hope day by day...",
      detected_emotion: { emotion: "pessimism", score: 0.76 },
    },
    {
      id: "8",
      text: "I’m so disgusted by this corruption!",
      detected_emotion: { emotion: "disgust", score: 0.89 },
    },
    {
      id: "9",
      text: "Didn’t expect this news at all 😲",
      detected_emotion: { emotion: "surprise", score: 0.9 },
    },
    {
      id: "10",
      text: "Sad to see so many people suffering...",
      detected_emotion: { emotion: "sadness", score: 0.87 },
    },
  ],
}


const AnalysisPage = ()=>{
    return(
        <div className="min-h-screen w-full dark:bg-gray-900 px-6 md:px-12 lg:px-20 py-8">
            <div className="mb-10">
                <SearchBar />
            </div>
            {/*<div className="p-6 md:p-10 space-y-3 mx-15">
                
                {<EmotionAnalysis results={sampleResults} />}
            </div>*/}
                
        </div>
    )
}

export default AnalysisPage