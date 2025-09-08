import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, PieChart, Heart, Smile, Frown, Zap, Shield, Star } from "lucide-react"
import EmotionBarChart from "./EmotionBarChart"
import EmotionRadialChart from "./EmotionRadialChart"

const EmotionAnalysis = ({ results }) => {
    const[chartType,setChartType] = useState('Bar')
    
    const emotionsData = [
        { label: "anger", score: 0, count: 0, color: "#ef4444", icon: "😠" },
        { label: "anticipation", score: 0, count: 0, color: "#f97316", icon: "⏳" },
        { label: "disgust", score: 0, count: 0, color: "#a855f7", icon: "🤢" },
        { label: "fear", score: 0, count: 0, color: "#4b5563", icon: "😨" },
        { label: "joy", score: 0, count: 0, color: "#facc15", icon: "😄" },
        { label: "love", score: 0, count: 0, color: "#ec4899", icon: "❤️" },
        { label: "optimism", score: 0, count: 0, color: "#22c55e", icon: "😊" },
        { label: "pessimism", score: 0, count: 0, color: "#78350f", icon: "😔" },
        { label: "sadness", score: 0, count: 0, color: "#3b82f6", icon: "😢" },
        { label: "surprise", score: 0, count: 0, color: "#8b5cf6", icon: "😲" },
        { label: "trust", score: 0, count: 0, color: "#14b8a6", icon: "🤝" },
    ]
    
    const tweets = results.tweetsData
    tweets.forEach((item)=>{
        const detected = item.detected_emotion
        const idx = emotionsData.findIndex((e)=>e.label === detected.emotion)
        if(idx !== -1 ){
            emotionsData[idx].score+=detected['score']
            emotionsData[idx].count++
        }
    })
    
    const chartData = emotionsData.map((item)=>({
        'label':item.label,
        'score':item.count>0?item.score/item.count:0,
        'color':item.color,
        'icon': item.icon
    }))
    
    const topEmotions = [...chartData].sort((a,b)=>b.score-a.score).slice(0,3)
    const totalEmotions = emotionsData.reduce((sum, emotion) => sum + emotion.count, 0)

    const getEmotionIcon = (emotion) => {
        const emotionObj = emotionsData.find(e => e.label === emotion)
        return emotionObj ? emotionObj.icon : "😐"
    }

    return(
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Emotion Analysis</h1>
                        <p className="text-gray-300">Understanding the emotional landscape of conversations</p>
                    </div>
                    
                    {/* Chart Type Selector */}
                    <div className="bg-white/20 rounded-2xl p-1 flex">
                        <button
                            onClick={() => setChartType("Bar")}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                chartType === "Bar" 
                                    ? "bg-white text-gray-900 shadow-lg" 
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            <BarChart3 size={16} />
                            Bar
                        </button>
                        <button
                            onClick={() => setChartType("Radial")}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                chartType === "Radial" 
                                    ? "bg-white text-gray-900 shadow-lg" 
                                    : "text-white hover:bg-white/10"
                            }`}
                        >
                            <PieChart size={16} />
                            Radial
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top Emotions */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/5 rounded-2xl p-6 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <Star className="text-yellow-400" size={24} />
                                <h2 className="text-xl font-bold text-white">Top Emotions</h2>
                            </div>
                            
                            <div className="space-y-4">
                                {topEmotions.map((emotion, index) => (
                                    <motion.div
                                        key={emotion.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{emotion.icon}</div>
                                                <div>
                                                    <div className="font-semibold text-white capitalize">
                                                        {emotion.label}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {emotionsData.find(e => e.label === emotion.label)?.count || 0} occurrences
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-white">
                                                    {(emotion.score * 100).toFixed(1)}%
                                                </div>
                                                <div className="text-xs text-gray-400">confidence</div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-white/20 rounded-full h-2">
                                                <div 
                                                    className="h-2 rounded-full transition-all duration-500"
                                                    style={{ 
                                                        width: `${emotion.score * 100}%`,
                                                        backgroundColor: emotion.color 
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Summary Stats */}
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-white">11</div>
                                        <div className="text-xs text-gray-400">Total Emotions</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">{chartData.filter(e => e.score > 0).length}</div>
                                        <div className="text-xs text-gray-400">Detected Types</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white/5 rounded-2xl p-6 h-96 flex items-center justify-center">
                            {chartType === "Bar" ? (
                                <EmotionBarChart data={chartData} />
                            ) : (
                                <EmotionRadialChart data={chartData} />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Emotion Distribution */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Emotion Distribution</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {chartData.filter(emotion => emotion.score > 0).map((emotion) => (
                            <div 
                                key={emotion.label}
                                className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="text-2xl mb-2">{emotion.icon}</div>
                                <div className="text-sm font-medium text-white capitalize mb-1">
                                    {emotion.label}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {(emotion.score * 100).toFixed(1)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
export default EmotionAnalysis