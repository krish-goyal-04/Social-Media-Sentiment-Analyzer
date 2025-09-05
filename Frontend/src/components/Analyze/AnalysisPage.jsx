import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";
import TweetDisplay from "./TweetDisplay";
import TopTweets from "./TopTweets";

const sampleResults = {
  tweetsData: [
    {
      createdAt: "Mon Sep 02 14:23:45 +0000 2025",
      likeCount: 120,
      retweetCount: 30,
      replyCount: 15,
      viewCount: 1500,
      quoteCount: 45,
      profanity_flag: false,
      text: "Excited about the new update! 🚀",
      url:"https://ui.shadcn.com/docs/components/select"
    },
    {
      createdAt: "Mon Sep 02 15:10:12 +0000 2025",
      likeCount: 90,
      retweetCount: 20,
      replyCount: 10,
      viewCount: 1200,
      quoteCount: 10,
      profanity_flag: false,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "This feature could be better, but not bad overall."
    },
    {
      createdAt: "Mon Sep 02 15:45:02 +0000 2025",
      likeCount: 200,
      retweetCount: 50,
      replyCount: 25,
      viewCount: 2500,
      quoteCount: 500,
      url:"https://ui.shadcn.com/docs/components/select",
      profanity_flag: true,
      text: "Worst update ever 🤬 Totally useless."
    },
    {
      createdAt: "Mon Sep 02 16:20:30 +0000 2025",
      likeCount: 75,
      retweetCount: 15,
      replyCount: 8,
      viewCount: 1000,
      quoteCount: 400,
      url:"https://ui.shadcn.com/docs/components/select",
      profanity_flag: false,
      text: "Loving the improvements, smooth experience!"
    },
    {
      createdAt: "Mon Sep 02 17:05:11 +0000 2025",
      likeCount: 300,
      retweetCount: 80,
      replyCount: 40,
      viewCount: 4000,
      quoteCount: 200,
      profanity_flag: false,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "Hands down the best version so far 🎉🔥"
    },
    {
      createdAt: "Mon Sep 02 18:40:55 +0000 2025",
      likeCount: 45,
      retweetCount: 10,
      replyCount: 5,
      viewCount: 800,
      quoteCount: 5,
      profanity_flag: true,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "This is trash 💩 won’t recommend."
    },
    {
      createdAt: "Mon Sep 02 19:25:20 +0000 2025",
      likeCount: 160,
      retweetCount: 35,
      replyCount: 12,
      viewCount: 2200,
      quoteCount: 60,
      profanity_flag: false,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "Great job team 👏, waiting for the next rollout."
    },
    {
      createdAt: "Mon Sep 02 20:05:40 +0000 2025",
      likeCount: 50,
      retweetCount: 8,
      replyCount: 3,
      viewCount: 600,
      quoteCount: 2,
      profanity_flag: false,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "Not bad, but still room for improvement."
    },
    {
      createdAt: "Mon Sep 02 21:15:12 +0000 2025",
      likeCount: 410,
      retweetCount: 120,
      replyCount: 55,
      viewCount: 6000,
      quoteCount: 350,
      profanity_flag: false,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "This went viral! 🚀🔥 Absolute madness."
    },
    {
      createdAt: "Mon Sep 02 22:45:01 +0000 2025",
      likeCount: 30,
      retweetCount: 5,
      replyCount: 2,
      viewCount: 500,
      quoteCount: 1,
      profanity_flag: true,
      url:"https://ui.shadcn.com/docs/components/select",
      text: "Such a dumb change 😡 won’t use this anymore."
    }
  ]
};

const AnalysisPage = ()=>{
    return(
        <div className="min-h-screen w-full dark:bg-gray-900 px-6 md:px-12 lg:px-20 py-8">
            <div className="mb-10">
                <SearchBar />
            </div>
            {/*<div className="p-6 md:p-10 space-y-3 mx-15">
                
                {<TopTweets results={sampleResults} />}
            </div>*/}
                
        </div>
    )
}

export default AnalysisPage