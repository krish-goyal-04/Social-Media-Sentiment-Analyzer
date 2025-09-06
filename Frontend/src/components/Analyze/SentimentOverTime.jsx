import {parse,format,startOfHour} from 'date-fns'
import SentimentLineChart from './SentimentLineChart'
import SentimentAreaChart from './SentimentAreaChart'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, Activity, Clock } from 'lucide-react'

const formatDate = (str)=>{
    const date = parse(str,"yyyy-MM-dd HH:mm",new Date())
    return format(date, "d MMM, h a")
}

const SentimentOverTime = ({tweets})=>{
    const data = {}
    const[chartType,setChartType] = useState('Area')
    
    tweets.forEach(tweet=>{
        const parsedDate = parse(tweet.createdAt, "EEE MMM dd HH:mm:ss xx yyyy",new Date())
        const hour = startOfHour(parsedDate)
        const timeLabel = format(hour,'yyyy-MM-dd HH:mm')
        const sentiment = tweet.individual_sentiment.label
        const confidence = tweet.individual_sentiment.confidence
        if(!data[timeLabel]){
            data[timeLabel] = {time:hour,timeLabel,positive:0,negative:0,neutral:0,count:0}
        }
        data[timeLabel][sentiment]=confidence;
        data[timeLabel].count++;
    })
    const chartData = Object.values(data).map((d)=>({
        ...d,
        timeLabel:d.timeLabel,
        positive:d.positive/d.count,
        negative:d.negative/d.count,
        neutral:d.neutral/d.count
    })).sort((a,b)=>a.time-b.time)

    // Calculate sentiment trends
    const totalDataPoints = chartData.length
    const avgPositive = chartData.reduce((sum, d) => sum + d.positive, 0) / totalDataPoints
    const avgNegative = chartData.reduce((sum, d) => sum + d.negative, 0) / totalDataPoints
    const avgNeutral = chartData.reduce((sum, d) => sum + d.neutral, 0) / totalDataPoints

    const summaryItems = [
        {text:'Positive',data:avgPositive,color:"text-green-400"},
        {text:'Negative',data:avgNegative,color:"text-red-400"},
        {text:'Neutral',data:avgNeutral,color:"text-blue-400"},   
    ]

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
                        <Clock className="text-blue-400" size={32} />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Sentiment Over Time</h1>
                            <p className="text-gray-300">Track how sentiment evolves throughout the conversation</p>
                        </div>
                    </div>
                    
                    <div className="bg-white/20 rounded-2xl p-1 flex">
                        <button
                            onClick={()=>setChartType('Area')}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                chartType === "Area" 
                                    ? "bg-white text-gray-900 shadow-lg" 
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            <BarChart3 size={16} />
                            Area
                        </button>
                        <button
                            onClick={()=>setChartType('Line')}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                chartType === "Line" 
                                    ? "bg-white text-gray-900 shadow-lg" 
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            <TrendingUp size={16} />
                            Line
                        </button>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    {summaryItems.map((item,index)=>(
                        <div key={index} className="bg-white/5 rounded-xl p-4 text-center border border-white/20">
                            <div className={`text-2xl font-bold mb-1 ${item.color}`} >{(item.data * 100).toFixed(1)}%</div>
                            <div className="text-sm text-gray-300">Avg {item.text}</div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 rounded-2xl p-6 h-96 flex items-center justify-center"
                >
                    {chartType === 'Line' ? (
                        <SentimentLineChart formatDate={formatDate} data={chartData} />
                    ) : (
                        <SentimentAreaChart formatDate={formatDate} data={chartData} />
                    )}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                        <Activity className="text-gray-400" size={16} />
                        <span className="text-gray-300 text-sm">
                            {totalDataPoints} time periods analyzed
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
export default SentimentOverTime