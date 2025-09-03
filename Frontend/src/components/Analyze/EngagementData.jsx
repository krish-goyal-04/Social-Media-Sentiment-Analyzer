import EnagagementCard from "./EngagementCards"
import { Heart, Repeat2, View, Info } from "lucide-react";
import ToolTipComponent from "./ToolTipComponent";

const EngagementData = ({results})=>{
    const tweets = results.tweetsData
    let count = 0
    let likes = 0
    let shares = 0
    let views = 0
    tweets.forEach((t)=>{
        count++;
        likes+=t.likeCount;
        shares+=t.retweetCount;
        views+=t.viewCount
    })
    const avgLikes = Math.round(likes/count)
    const avgShares =  Math.round(shares/count)
    const avgViews =  Math.round(views/count)

    const items = [
        {avgLabel:"Avg Likes",icon:Heart,color:"text-pink-500",avgData:avgLikes,totalData:likes,totalLabel:"Total Likes"},
        {avgLabel:"Avg Shares",icon:Repeat2,color:"text-green-500",avgData:avgShares,totalData:shares,totalLabel:"Total Shares"},
        {avgLabel:"Avg Views",icon:View,color:"text-blue-400",avgData:avgViews,totalData:views,totalLabel:"Total Views"},
    ]

    return(
        <div className="mt-50 p-4">
            <h1 className="text-4xl text-white font-bold">Engagement Metrics <ToolTipComponent text={`Based on ${count} Tweets`} /></h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
                {items.map((item,ind)=> <EnagagementCard key={ind} {...item}/>)}
            </div>
        </div>
        
    )
}
export default EngagementData