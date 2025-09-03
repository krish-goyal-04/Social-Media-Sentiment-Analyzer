import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"
import SentimentOverTime from "./SentimentOverTime"


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