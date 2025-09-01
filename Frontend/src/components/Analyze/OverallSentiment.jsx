import { useState } from "react";
import {Button} from "../ui/button"
import OverallSentimentChart from "./OverallSentimentChart";

const demoSentiment = [
  { label: "positive", confidence: 0.92 },
  { label: "negative", confidence: 0.65 },
  { label: "neutral",  confidence: 0.88 },
  { label: "positive", confidence: 0.75 },
  { label: "negative", confidence: 0.80 },
  { label: "positive", confidence: 0.60 },
  { label: "neutral",  confidence: 0.70 },
  { label: "positive", confidence: 0.95 },
  { label: "negative", confidence: 0.55 },
  { label: "neutral",  confidence: 0.90 },
];

const COLORS = {
  positive: "#10b981",
  negative: "#f43f5e",
  neutral: "#6366f1"
};

const OverallSentiment = ()=>{

    const [chartType,setChartType] = useState('Bar')

    let pos = {score:0,count:0}
    let neg = {score:0,count:0}
    let neut = {score:0,count:0}

    demoSentiment.forEach((item)=>{
        if(item.label === 'positive'){
            pos.score+=item.confidence;
            pos.count++;
        }
        else if(item.label === 'negative'){
            neg.score+=item.confidence;
            neg.count++;
        }
        else if(item.label === 'neutral'){
            neut.score+=item.confidence;
            neut.count++;
        }
    })

    let total = pos.count+neg.count+neut.count

    const posAvg = (pos.score/pos.count).toFixed(2)
    const negAvg = (neg.score/neg.count).toFixed(2)
    const neutAvg = (neut.score/neut.count).toFixed(2)

    const sentimentIndex = ((pos.score-neg.score)/(pos.score+neg.score+neut.score)).toFixed(2)
    const data = [
    { name: "Positive", value: (pos.count / total) * 100 },
    { name: "Negative", value: (neg.count / total) * 100 },
    { name: "Neutral", value: (neut.count / total) * 100 },
   ];

    const dominantSentiment = data.reduce((a,b)=>(a.value>b.value?a:b))

    return(
        <div className="p-4 mt-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-7xl mx-auto">
            <div className="flex-1 space-y-2">
                <h1 className="text-4xl text-white font-bold">Overall Sentiment</h1>
                <h2 className="text-5xl text-white font-bold mb-10" style={{color:COLORS[dominantSentiment.name.toLowerCase()]}}>
                    {dominantSentiment.name.charAt(0).toUpperCase()+dominantSentiment.name.slice(1)}
                </h2>
                <div className="bg-white rounded-3xl w-25 h-8 flex items-center justify-between px-1 text-sm">
                    <h1
                        onClick={() => setChartType("Bar")}
                        className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                        chartType === "Bar" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >
                        Bar
                    </h1>
                    <h1
                        onClick={() => setChartType("Pie")}
                        className={`cursor-pointer px-3 py-1 rounded-xl transition-colors duration-400 ease-in-out ${
                        chartType === "Pie" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >
                        Pie
                    </h1>
                </div>
            </div>
            <div className="flex-[2] h-80 p-4 ">
                <OverallSentimentChart COLORS={COLORS} data={data} chart={chartType} />
            </div>
        </div>
    )
}
export default OverallSentiment