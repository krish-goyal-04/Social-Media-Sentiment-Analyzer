import EnagagementCard from "./EngagementCards"
import { Heart, Repeat2, View, Info, MessageSquareReply } from "lucide-react";
import ToolTipComponent from "./ToolTipComponent";
import {parse,format,startOfHour} from 'date-fns'
import EngagementChart from "./EngagementChart";
import { useState } from "react";

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
    console.log(engagementData)
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
        <div className="mt-50 p-4 ">
            <h1 className="text-4xl text-white font-bold text-center">Engagement Metrics <ToolTipComponent text={`Based on ${count} Tweets`} /></h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6 p-6">
                {items.map((item,ind)=> <EnagagementCard key={ind} {...item}/>)}
            </div>
            <div className="flex justify-between">
                <div className="flex">
                    <h3 className="text-2xl text-white font-semibold mr-10" >Charts</h3>
                    <div className="bg-white rounded-3xl w-25 h-8 flex items-center justify-between px-1 text-sm">
                        <h1
                            onClick={()=>{setShowChart('Yes'); setChartCategory('Likes')}}
                            className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                                showChart === "Yes" ? "bg-gray-800 text-white" : "text-black"
                            }`}
                        >Yes</h1>
                        <h1
                            onClick={()=>setShowChart('No')}
                            className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                                showChart === "No" ? "bg-gray-800 text-white" : "text-black"
                            }`}
                        >No</h1>
                    </div>
                </div>
                <div >
                    {showChart==="Yes" && (
                        <div className="bg-white rounded-3xl w-70 h-8 flex items-center justify-between px-1 text-sm">
                        {chartItems.map((item,ind)=>(<h1
                            key={ind}
                            onClick={()=>{setChartCategory(`${item}`)}}
                            className={`cursor-pointer px-3 py-1  rounded-xl transition-colors duration-400 ease-in-out ${
                                chartCategory === `${item}` ? "bg-gray-800 text-white" : "text-black"
                            }`}
                        >{item}</h1>))}
                    </div>)

                    }
                </div>
            </div>
            <div>
                {showChart === "Yes" && (
                    <>
                    <h1 className="text-3xl text-white font-semibold mb-6 mt-10">
                        {chartCategory} Over Time
                    </h1>
                    <EngagementChart
                        dataKey={chartCategory}
                        data={Object.values(engagementData).sort((a,b)=>a.time - b.time)}
                        />
                    </>
                    
                )}
            </div>
            <div>
                <h1 className="text-3xl text-white font-semibold mb-6 mt-10">Engagement Over Time</h1>
                <EngagementChart dataKey={"engagement"} data={Object.values(engagementData)} />
            </div>
        </div>
        
    )
}
export default EngagementData