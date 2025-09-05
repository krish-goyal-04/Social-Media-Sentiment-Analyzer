import {Input} from "../ui/input"
import { Search } from 'lucide-react';
import {Button} from "../ui/button"
import { motion } from "framer-motion";
import { useState } from "react";
import OverallSentiment from "./OverallSentiment";
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";
import TopTweets from "./TopTweets"
import EmotionAnalysis from "./EmotionAnalysis";
const SearchBar = ()=>{

    const [query,setQuery] = useState("")
    const [results,setResults] = useState(null)
    console.log("Results",results)

    const handleSearch = async ()=>{
        const response = await fetch("http://127.0.0.1:8000/analyze/",{
            method:"POST",
            headers: { 'Content-Type': "application/json" },
            body:JSON.stringify({query,max_tweets:50})
        })

        const data = await response.json()
        setResults(data)
        setQuery("")
    }
    
    return(
        <div>
            <motion.div 
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.75}}
            className="flex p-8 space-x-3 justify-center ">
            <Input 
                placeholder="Enter a Topic" 
                className="rounded-2xl max-w-2xl bg-gray-200  placeholder:text-gray-700 shadow-2xl h-10"
                value={query}
                onChange = {(e)=>setQuery(e.target.value)}
            />
            <Button 
                className="rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-2xl hover:scale-110 h-10"
                onClick = {handleSearch}
            ><Search /></Button>
        </motion.div>
        {results && (
            <>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-indigo-400 dark:text-gray-100 text-center font-extrabold">
                    Sentiment Analysis Overview
                </h2>
                <OverallSentiment results={results} />
                <SentimentOverTime tweets={results.tweetsData} />
                <EngagementData results={results} />
                <TopTweets results={results} />
                <EmotionAnalysis results={results} />
            </>
             )}
        </div>
        
    )
}
export default SearchBar