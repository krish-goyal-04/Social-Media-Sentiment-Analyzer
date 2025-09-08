import EngagementData from "./EngagementData"
import OverallSentiment from "./OverallSentiment"
import SentimentOverTime from "./SentimentOverTime"
import TopTweets from "./TopTweets"
import EmotionAnalysis from "./EmotionAnalysis"

const Dashboard = ({results})=>{
    return(
        <div>
            <OverallSentiment results={results} />
            <SentimentOverTime tweets={results.tweetsData} />
            <EngagementData results={results} />
            <TopTweets results={results} />
            <EmotionAnalysis results={results} />
        </div>
    )
}
export default Dashboard