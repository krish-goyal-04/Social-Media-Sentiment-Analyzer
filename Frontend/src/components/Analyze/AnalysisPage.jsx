import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";

const sampleResults = {
  tweetsData: [
    {
      createdAt: "Mon Sep 02 14:23:45 +0000 2025",
      likeCount: 120,
      retweetCount: 30,
      replyCount: 15,
      viewCount: 1500,
      quoteCount:45
    },
    {
      createdAt: "Mon Sep 02 15:10:12 +0000 2025",
      likeCount: 90,
      retweetCount: 20,
      replyCount: 10,
      viewCount: 1200,
      quoteCount:10
    },
    {
      createdAt: "Mon Sep 02 15:45:02 +0000 2025",
      likeCount: 200,
      retweetCount: 50,
      replyCount: 25,
      viewCount: 2500,
      quoteCount:500
    },
    {
      createdAt: "Mon Sep 02 16:20:30 +0000 2025",
      likeCount: 75,
      retweetCount: 15,
      replyCount: 8,
      viewCount: 1000,
      quoteCount:400
    },
    {
      createdAt: "Mon Sep 02 17:05:11 +0000 2025",
      likeCount: 300,
      retweetCount: 80,
      replyCount: 40,
      viewCount: 4000,
      quoteCount:200
    },
  ],
};

const AnalysisPage = ()=>{
    return(
        <div className="min-h-screen w-full dark:bg-gray-900 px-6 md:px-12 lg:px-20 py-8">
            <div className="mb-10">
                <SearchBar />
            </div>
            {<div className="p-6 md:p-10 space-y-3 mx-15">
                
                {<EngagementData results={sampleResults} />}
            </div>}
                
        </div>
    )
}

export default AnalysisPage