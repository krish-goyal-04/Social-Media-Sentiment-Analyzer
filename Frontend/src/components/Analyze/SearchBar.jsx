import {Input} from "../ui/input"
import { Search, Loader2, TrendingUp, BarChart3, Heart, MessageSquare } from 'lucide-react';
import {Button} from "../ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import OverallSentiment from "./OverallSentiment";
import SentimentOverTime from "./SentimentOverTime"
import EngagementData from "./EngagementData";
import TopTweets from "./TopTweets"
import EmotionAnalysis from "./EmotionAnalysis";

const SearchBar = ()=>{
    const [query,setQuery] = useState("")
    const [results,setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async ()=>{
        if (!query.trim()) return;
        
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await fetch("http://127.0.0.1:8000/analyze/",{
                method:"POST",
                headers: { 'Content-Type': "application/json" },
                body:JSON.stringify({query,max_tweets:50})
            })

            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }

            const data = await response.json()
            setResults(data)
            setQuery("")
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    
    return(
        <div className="w-full">
            {/* Search Section */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold bg-white bg-clip-text text-transparent">
                            Social Media Sentiment Analyzer
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover insights from social media conversations with AI-powered sentiment and emotion analysis
                        </p>
                    </div>
                    
                    <motion.div 
                        initial={{opacity:0,y:20}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:0.6, delay: 0.2}}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
                    >
                        <div className="relative w-full">
                            <Input 
                                placeholder="Enter a Topic, Hashtag, or Keyword..." 
                                className="rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 shadow-2xl h-14 text-lg pr-12"
                                value={query}
                                onChange={(e)=>setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                        </div>
                        <Button 
                            className="rounded-4xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:scale-105 h-14  transition-all duration-200 w-14"
                            onClick={handleSearch}
                            disabled={isLoading || !query.trim()}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <Search size={20} />
                            )}
                        </Button>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 max-w-md mx-auto"
                        >
                            <p className="text-red-300">{error}</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        {/* Results Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center space-y-4"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <TrendingUp className="text-purple-400" size={32} />
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    Analysis Results
                                </h2>
                            </div>
                            
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                    <BarChart3 className="text-blue-400 mx-auto mb-3" size={24} />
                                    <div className="text-2xl font-bold text-white">{results.tweetsData?.length || 0}</div>
                                    <div className="text-gray-300 text-sm">Posts Analyzed</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                    <Heart className="text-pink-400 mx-auto mb-3" size={24} />
                                    <div className="text-2xl font-bold text-white">
                                        {results.tweetsData?.reduce((sum, tweet) => sum + (tweet.likeCount || 0), 0).toLocaleString()}
                                    </div>
                                    <div className="text-gray-300 text-sm">Total Likes</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                    <MessageSquare className="text-green-400 mx-auto mb-3" size={24} />
                                    <div className="text-2xl font-bold text-white">
                                        {results.tweetsData?.reduce((sum, tweet) => sum + (tweet.retweetCount || 0), 0).toLocaleString()}
                                    </div>
                                    <div className="text-gray-300 text-sm">Total Shares</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Analysis Components */}
                        <div className="space-y-16">
                            <OverallSentiment results={results} />
                            <SentimentOverTime tweets={results.tweetsData} />
                            <EngagementData results={results} />
                            <TopTweets results={results} />
                            <EmotionAnalysis results={results} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
export default SearchBar