import {parse,format,startOfHour} from 'date-fns'
import SentimentLineChart from './SentimentLineChart'
import SentimentAreaChart from './SentimentAreaChart'
import { useState } from 'react'

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
            data[timeLabel] = {timeLabel,positive:0,negative:0,neutral:0,count:0}
        }
        data[timeLabel][sentiment]=confidence;
        data[timeLabel].count++;
    })
    console.log(data)

    const chartData = Object.values(data).map((d)=>({
        timeLabel:d.timeLabel,
        positive:d.positive/d.count,
        negative:d.negative/d.count,
        neutral:d.neutral/d.count
    })).sort((a,b)=>new Date(a.timeLabel)-new Date(b.timeLabel))

    return(
        <div className='p-4 w-full h-80'>
            <div className='flex justify-between mb-8 mr-3'>
                 <h1 className="text-4xl text-white font-bold">Sentiment Over Time</h1>
                <div className="bg-white rounded-3xl w-30 h-8 flex items-center justify-between px-1 text-sm">
                    <h1
                        onClick={()=>setChartType('Area')}
                        className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                            chartType === "Area" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >Area</h1>
                    <h1
                        onClick={()=>setChartType('Line')}
                        className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                            chartType === "Line" ? "bg-gray-800 text-white" : "text-black"
                        }`}
                    >Line</h1>
                </div>
            </div>
           {chartType==='Line'?(<SentimentLineChart data={chartData} />):(<SentimentAreaChart data={chartData} />)}
           
           
        </div>
    )
}
export default SentimentOverTime