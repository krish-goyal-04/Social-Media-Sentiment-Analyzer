import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";
import TweetDisplay from "./TweetDisplay";
import TopTweets from "./TopTweets";
import EmotionAnalysis from "./EmotionAnalysis";
import { motion } from "framer-motion";


const AnalysisPage = ()=>{
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">            
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto"
                >
                    <SearchBar />
                </motion.div>
            </div>
            {/*<div className="p-6 md:p-10 space-y-3 mx-15">
                
                {<EmotionAnalysis results={sampleResults} />}
            </div>*/}
                
        </div>
    )
}

export default AnalysisPage