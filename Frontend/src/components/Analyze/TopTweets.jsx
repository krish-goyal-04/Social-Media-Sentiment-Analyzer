import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Heart, Repeat2, Eye, MessageSquare, Filter } from "lucide-react"
import TweetDisplay from "./TweetDisplay"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const filterItems = [
    { value: 'likes', label: 'Likes', icon: Heart, color: 'text-pink-500' },
    { value: 'shares', label: 'Shares', icon: Repeat2, color: 'text-green-500' },
    { value: 'views', label: 'Views', icon: Eye, color: 'text-blue-500' },
    { value: 'replies', label: 'Replies', icon: MessageSquare, color: 'text-yellow-500' }
]

const TopTweets = ({results})=>{
    let tweets = results.tweetsData
    const chartData = tweets.map((item)=>({
        ...item,
        likes:item.likeCount,
        shares:item.retweetCount,
        replies:item.replyCount+item.quoteCount,
        views:item.viewCount
    }))
    
    const [filter,setFilter] = useState('likes')
    const selectedFilter = filterItems.find(item => item.value === filter)
    
    return(
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <TrendingUp className="text-orange-400" size={32} />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Top Performing Posts</h1>
                            <p className="text-gray-300">Discover the most engaging content from your analysis</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Filter className="text-gray-400" size={20} />
                        <div className="bg-white/20 rounded-2xl p-1 flex">
                            {filterItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <button
                                        key={item.value}
                                        onClick={() => setFilter(item.value)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                            filter === item.value 
                                                ? "bg-white text-gray-900 shadow-lg" 
                                                : "text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <Icon size={16} className={filter === item.value ? "text-gray-900" : item.color} />
                                        {item.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/20"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {selectedFilter && (
                                <>
                                    <div className={`${selectedFilter.color} bg-white/10 rounded-xl p-3`}>
                                        <selectedFilter.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Sorted by {selectedFilter.label}</h3>
                                        <p className="text-gray-300 text-sm">Posts ranked by {selectedFilter.label.toLowerCase()} count</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-white">{chartData.length}</div>
                            <div className="text-gray-300 text-sm">Total Posts</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <TweetDisplay data={chartData} filter={filter}/>
                </motion.div>
            </div>
        </motion.div>
    )
}
export default TopTweets