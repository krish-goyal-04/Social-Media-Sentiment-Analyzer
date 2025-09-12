import {Input} from "../ui/input"
import { Search, Loader2, TrendingUp, BarChart3, Heart, MessageSquare } from 'lucide-react';
import {Button} from "../ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import {AuthContext} from "../../hooks/useAuthContext"
import saveAnalysisResult from "../../hooks/useSaveAnalysisResult";
import QuickStats from "./QuickStats";

const SearchBar = ()=>{
    const [query,setQuery] = useState("")
    const [results,setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [saveResults,setSaveResults] = useState(false)
    const [saveSuccess,setSaveSuccess] = useState(false)
    const [isSaved,setIsSaved] = useState(false)

    const {user} = useContext(AuthContext)

    useEffect(()=>{
        if(results){
            setIsSaved(false)
        }
    },[results])
    const handleSave = async (e)=>{
        e.preventDefault()
        if(isSaved)return
        try {
            setSaveResults(true)
            await saveAnalysisResult(user.uid,results,query)
            setIsSaved(true)
            setSaveSuccess(true)
            setTimeout(()=>setSaveSuccess(false),3000)
            setQuery("")
        } catch (error) {
            console.error(error)
        }
        finally{
            setSaveResults(false)
        }
    }

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
    console.log(results)
    
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
                            <QuickStats results={results} />
                        </motion.div>

                        {/* Analysis Components */}
                        <div className="space-y-16">
                            <Dashboard results={results} />
                        </div>

                        <div className="flex justify-center items-center">
                            <Button 
                                variant="default" 
                                onClick={handleSave} 
                                disabled={saveResults||isSaved}
                                className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 text-md ">
                                {isSaved?"Saved":saveResults?(<span className="flex items-center gap-2">Saving<Loader2 className="animate-spin" size={24} /></span>):("Save")}</Button>
                    </div>
                    </motion.div>
                )}
                
            </AnimatePresence>
            {saveSuccess && (
                <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    className="text-green-400 text-center mt-4"
                >
                    Analysis saved successfully!
                </motion.div>
            )
            }
        </div>
    )
}
export default SearchBar