import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";

const sampleResults = {
  tweetsData: [
    {
      id: "1",
      authorName: "SonuSood",
      likeCount: 1200,
      retweetCount: 350,
      replyCount: 95,
      quoteCount: 40,
      viewCount: 15000,
      createdAt: "Mon Sep 01 06:31:45 +0000 2025",
      text: "We stand together in tough times. Punjab will rise again!",
    },
    {
      id: "2",
      authorName: "TechGuru",
      likeCount: 890,
      retweetCount: 210,
      replyCount: 75,
      quoteCount: 25,
      viewCount: 11000,
      createdAt: "Mon Sep 01 09:12:33 +0000 2025",
      text: "AI will reshape the future — and it’s happening faster than you think!",
    },
    {
      id: "3",
      authorName: "MovieBuff",
      likeCount: 560,
      retweetCount: 130,
      replyCount: 40,
      quoteCount: 18,
      viewCount: 8000,
      createdAt: "Mon Sep 01 12:45:21 +0000 2025",
      text: "Just watched an incredible film — highly recommend it!",
    },
    {
      id: "4",
      authorName: "FoodieLife",
      likeCount: 2300,
      retweetCount: 780,
      replyCount: 210,
      quoteCount: 65,
      viewCount: 20000,
      createdAt: "Mon Sep 01 16:11:02 +0000 2025",
      text: "This new street food spot is insane 🤯🔥",
    },
  ],
};

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
                {<EngagementData results={sampleResults} />}
            </div>*/}
                
        </div>
    )
}

export default AnalysisPage