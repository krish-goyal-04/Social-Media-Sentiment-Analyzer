import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, TrendingDown, Minus } from "lucide-react";
import OverallSentimentChart from "./OverallSentimentChart";
import SentimentBar from "./SentimentBar";

const COLORS = {
  positive: "#10b981",
  negative: "#f43f5e",
  neutral: "#6366f1"
};

const OverallSentiment = ({results})=>{
    const [chartType,setChartType] = useState('Bar')
    const tweets = results.tweetsData

    let pos = {score:0,count:0}
    let neg = {score:0,count:0}
    let neut = {score:0,count:0}

    tweets.forEach((item)=>{
        if(item?.individual_sentiment?.label === 'positive'){
            pos.score+=item?.individual_sentiment?.confidence;
            pos.count++;
        }
        else if(item?.individual_sentiment?.label === 'negative'){
            neg.score+=item?.individual_sentiment?.confidence;
            neg.count++;
        }
        else if(item?.individual_sentiment?.label === 'neutral'){
            neut.score+=item?.individual_sentiment?.confidence;
            neut.count++;
        }
    })

    let total = pos.count+neg.count+neut.count

    const posAvg = pos.count > 0 ? (pos.score/pos.count).toFixed(2) : 0
    const negAvg = neg.count > 0 ? (neg.score/neg.count).toFixed(2) : 0
    const neutAvg = neut.count > 0 ? (neut.score/neut.count).toFixed(2) : 0

    const sentimentIndex = total > 0 ? ((pos.score-neg.score)/(pos.score+neg.score+neut.score)).toFixed(2) : 0
    const data = [
        { name: "Positive", value: total > 0 ? (pos.count / total) * 100 : 0 },
        { name: "Negative", value: total > 0 ? (neg.count / total) * 100 : 0 },
        { name: "Neutral", value: total > 0 ? (neut.count / total) * 100 : 0 },
    ];

    const tweetStats = [
        {label:pos,text:'Positive',data:posAvg,color:"text-green-400"},
        {label:neg,text:'Negative',data:negAvg,color:"text-red-400"},
        {label:neut,text:'Neutral',data:neutAvg,color:"text-blue-400"},
    ]

    const dominantSentiment = data.reduce((a,b)=>(a.value>b.value?a:b))

    const getSentimentIcon = (sentiment) => {
        switch(sentiment.toLowerCase()) {
            case 'positive': return <TrendingUp className="text-green-400" size={24} />
            case 'negative': return <TrendingDown className="text-red-400" size={24} />
            default: return <Minus className="text-blue-400" size={24} />
        }
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
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Overall Sentiment Analysis</h1>
                    <p className="text-gray-300 text-md">Understanding the general mood across all analyzed content</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3">
                                {getSentimentIcon(dominantSentiment.name)}
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    {dominantSentiment.name}
                                </h2>
                            </div>
                            <div 
                                className="text-4xl md:text-5xl font-bold"
                                style={{color: COLORS[dominantSentiment.name.toLowerCase()]}}
                            >
                                {dominantSentiment.value.toFixed(1)}%
                            </div>
                            <p className="text-gray-300 text-md">
                                {dominantSentiment.name} sentiment dominates the conversation
                            </p>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-1 flex">
                            <button
                                onClick={() => setChartType("Bar")}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                    chartType === "Bar" 
                                        ? "bg-white text-gray-900 shadow-lg" 
                                        : "text-white hover:bg-white/10"
                                }`}
                            >
                                <BarChart3 size={16} />
                                Bar
                            </button>
                            <button
                                onClick={() => setChartType("Pie")}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                    chartType === "Pie" 
                                        ? "bg-white text-gray-900 shadow-lg" 
                                        : "text-white hover:bg-white/10"
                                }`}
                            >
                                <PieChart size={16} />
                                Pie
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/5 rounded-2xl p-6 h-80 flex items-center justify-center">
                            <OverallSentimentChart COLORS={COLORS} data={data} chart={chartType} />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/5 rounded-2xl p-6 h-80 flex items-center justify-center">
                            <SentimentBar sentimentIndex={sentimentIndex}/>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                    {tweetStats.map((item,index)=>(
                        <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                            <div className={`text-2xl font-bold mb-1 ${item.color}`} >{item.label.count}</div>
                            <div className="text-sm text-gray-300">{item.text} Tweets</div>
                            <div className="text-xs text-gray-400 mt-1">Avg Confidence: {item.data}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}
export default OverallSentiment