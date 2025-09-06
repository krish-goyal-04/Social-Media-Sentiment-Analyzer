import EnagagementCard from "./EngagementCards"
import { Heart, Repeat2, View, Info, MessageSquareReply, BarChart3, TrendingUp, Activity } from "lucide-react";
import ToolTipComponent from "./ToolTipComponent";
import {parse,format,startOfHour} from 'date-fns'
import EngagementChart from "./EngagementChart";
import { useState } from "react";
import { motion } from "framer-motion";

const chartItems = ['Likes','Shares','Replies','Views']

const formatDate = (str)=>{
    const date = parse(str, "yyyy-MM-dd HH:mm",new Date())
    return format(date,"d MMM, h a")
}

const EngagementData = ({results})=>{
    const [showChart,setShowChart] = useState("No")
    const [chartCategory,setChartCategory] = useState('Likes')

    const engagementData = {}
    const tweets = results.tweetsData
    let count = 0
    let likes = 0
    let shares = 0
    let views = 0
    let replies = 0
    let quotes = 0
    tweets.forEach((t)=>{
        count++;
        likes+=t.likeCount;
        shares+=t.retweetCount;
        views+=t.viewCount;
        replies+=t.replyCount;
        quotes+=t?.quoteCount

        const parsedDate = parse(t.createdAt, "EEE MMM dd HH:mm:ss xx yyyy",new Date())
        const hour = startOfHour(parsedDate)
        const timeLabel = format(hour,'yyyy-MM-dd HH:mm')
        const currEngagement = ((t.likeCount+t.retweetCount+t.replyCount+t?.quoteCount)/t.viewCount)*100

        if(!engagementData[timeLabel]){
            engagementData[timeLabel] = {time:hour,timeLabel,engagement:currEngagement,count:1,Likes:t.likeCount,Shares:t.retweetCount,Views:t.viewCount,Replies:t.replyCount+t.quoteCount,modifiedTime:formatDate(timeLabel)}
        }
        else{
            engagementData[timeLabel].engagement+=currEngagement
            engagementData[timeLabel].count++
            engagementData[timeLabel].Likes += t.likeCount;
            engagementData[timeLabel].Shares += t.retweetCount;
            engagementData[timeLabel].Views += t.viewCount;
            engagementData[timeLabel].Replies += (t.replyCount + t.quoteCount);
        }
        
    })
    
    const avgLikes = Math.round(likes/count)
    const avgShares =  Math.round(shares/count)
    const avgViews =  Math.round(views/count)
    const avgReplies = Math.round((replies+quotes)/(count))
    const engagementRate = ((likes+shares+replies+quotes)/views)*100

    const items = [
        {avgLabel:"Avg Likes",icon:Heart,color:"text-pink-500",avgData:avgLikes,totalData:likes,totalLabel:"Total Likes"},
        {avgLabel:"Avg Shares",icon:Repeat2,color:"text-green-500",avgData:avgShares,totalData:shares,totalLabel:"Total Shares"},
        {avgLabel:"Avg Views",icon:View,color:"text-blue-400",avgData:avgViews,totalData:views,totalLabel:"Total Views"},
        {avgLabel:"Avg Replies",icon:MessageSquareReply,color:"text-yellow-500",avgData:avgReplies,totalData:replies+quotes,totalLabel:"Total Replies"}
    ]

    return(
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Activity className="text-purple-400" size={32} />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Engagement Metrics</h1>
                        <ToolTipComponent text={`Based on ${count} Tweets`} />
                    </div>
                    <p className="text-gray-300">Understanding how audiences interact with content</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {items.map((item,ind)=> <EnagagementCard key={ind} {...item} index={ind}/>)}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-8 border border-white/20"
                >
                    <div className="flex items-center justify-center gap-4">
                        <TrendingUp className="text-green-400" size={24} />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{engagementRate.toFixed(2)}%</div>
                            <div className="text-gray-300 text-sm">Overall Engagement Rate</div>
                        </div>
                    </div>
                </motion.div>

                {/* Chart Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <BarChart3 className="text-blue-400" size={24} />
                        <h3 className="text-2xl text-white font-semibold">Metrics Chart</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="bg-white/20 rounded-2xl p-1 flex">
                            <button
                                onClick={()=>{setShowChart('Yes'); setChartCategory('Likes')}}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                                    showChart === "Yes" 
                                        ? "bg-white text-gray-900 shadow-lg" 
                                        : "text-white hover:bg-white/10"
                                }`}
                            >
                                Show Chart
                            </button>
                            <button
                                onClick={()=>setShowChart('No')}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                                    showChart === "No" 
                                        ? "bg-white text-gray-900 shadow-lg" 
                                        : "text-white hover:bg-white/10"
                                }`}
                            >
                                Hide Chart
                            </button>
                        </div>

                        {showChart === "Yes" && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/20 rounded-2xl p-1 flex flex-wrap gap-1"
                            >
                                {chartItems.map((item,ind)=>(
                                    <button
                                        key={ind}
                                        onClick={()=>{setChartCategory(`${item}`)}}
                                        className={`px-3 py-2 rounded-xl transition-all duration-300 text-sm ${
                                            chartCategory === `${item}` 
                                                ? "bg-white text-gray-900 shadow-lg" 
                                                : "text-white hover:bg-white/10"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="space-y-12">
                    {showChart === "Yes" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 rounded-2xl p-6"
                        >
                            <h2 className="text-2xl text-white font-semibold mb-6 text-center">
                                {chartCategory} Over Time
                            </h2>
                            <EngagementChart
                                dataKey={chartCategory}
                                data={Object.values(engagementData).sort((a,b)=>a.time - b.time)}
                            />
                        </motion.div>
                    )}
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 rounded-2xl p-6"
                    >
                        <h2 className="text-2xl text-white font-semibold mb-6 text-center">
                            Overall Engagement Over Time
                        </h2>
                        <EngagementChart dataKey={"engagement"} data={Object.values(engagementData)} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
export default EngagementData