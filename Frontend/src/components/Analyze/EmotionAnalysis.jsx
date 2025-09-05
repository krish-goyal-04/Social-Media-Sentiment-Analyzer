import { useState } from "react"
import EmotionBarChart from "./EmotionBarChart"
import EmotionRadialChart from "./EmotionRadialChart"

const EmotionAnalysis = ({ results }) => {
    const[chartType,setChartType] = useState('Bar')
  const emotionsData = [
    { label: "anger", score: 0, count: 0, color: "#ef4444" },       // red
    { label: "anticipation", score: 0, count: 0, color: "#f97316" }, // orange
    { label: "disgust", score: 0, count: 0, color: "#a855f7" },     // purple
    { label: "fear", score: 0, count: 0, color: "#4b5563" },        // gray
    { label: "joy", score: 0, count: 0, color: "#facc15" },         // yellow
    { label: "love", score: 0, count: 0, color: "#ec4899" },        // pink
    { label: "optimism", score: 0, count: 0, color: "#22c55e" },    // green
    { label: "pessimism", score: 0, count: 0, color: "#78350f" },   // brown
    { label: "sadness", score: 0, count: 0, color: "#3b82f6" },     // blue
    { label: "surprise", score: 0, count: 0, color: "#8b5cf6" },    // violet
    { label: "trust", score: 0, count: 0, color: "#14b8a6" },       // teal
  ]
    const tweets = results.tweetsData
    console.log(tweets)
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
        'color':item.color
    }))
    const topEmotions = [...chartData].sort((a,b)=>b.score-a.score).slice(0,3)
    return(
        <div className=" w-full h-40 mt-10">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl text-white font-bold">Emotion Analysis</h1>
                <div className="bg-white rounded-3xl w-30 h-8 flex items-center justify-between px-1 text-sm">
                    <h1
                        onClick={() => setChartType("Bar")}
                        className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                        chartType === "Bar" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >
                        Bar
                    </h1>
                    <h1
                        onClick={() => setChartType("Radial")}
                        className={`cursor-pointer px-3 py-1 rounded-xl transition-colors duration-400 ease-in-out ${
                        chartType === "Radial" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >
                        Radial
                    </h1>
                </div>
            </div>
            <div className="flex  justify-between mt-8 items-center ml-5">
                <div className="w-1/3">
                    <div className="w-full h-full bg-gray-800 rounded-2xl p-5 text-white  flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-2">
                            Top Emotions
                        </h2>
                        
                        <div className="space-y-4">
                            {topEmotions.map(e => (
                            <div
                                key={e.label}
                                className="flex justify-between items-center  rounded-lg px-3 py-2 hover:bg-gray-700 transition"
                            >
                                <div className="flex items-center gap-2">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: e.color }}
                                ></span>
                                <span className="capitalize font-medium">{e.label}</span>
                                </div>
                                <span className="font-semibold text-sm">
                                {(e.score * 100).toFixed(1)}%
                                </span>
                            </div>
                            ))}
                    </div>
</div>
                </div>
                <div className="w-max">
                    {chartType==="Bar"?<EmotionBarChart data={chartData} />:<EmotionRadialChart data={chartData}/>}
                </div>
            </div>
            
            
        </div>
    )
}
export default EmotionAnalysis