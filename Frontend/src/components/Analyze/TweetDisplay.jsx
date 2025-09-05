import { format, parse } from "date-fns";
import { Heart, Repeat2, View, Info, MessageSquareReply,LinkIcon} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const formatDate = (str)=>{
    const date = parse(str,"EEE MMM dd HH:mm:ss xx yyyy",new Date())
    return format(date, "d MMMM , h a")
}
const formatNumber = (num)=>{
    if(num>=1000000) return (num/1000000).toFixed(1)+"M";
    if(num>=1000) return(num/1000).toFixed(1)+"K"
    return num
}
const engagementIcons = [
    {icon:Heart,metric:"likes",color:"text-pink-500"},
    {icon:Repeat2,metric:"shares",color:"text-green-500"},
    {icon:MessageSquareReply,metric:"replies",color:"text-yellow-500"},
    {icon:View,metric:"views",color:"text-blue-400"},
]

const TweetDisplay = ({data,filter})=>{

    const sortedData = [...data].filter((t)=>t.profanity_flag === false).sort((a,b)=>b[filter]-a[filter])

    const [showMore,setShowMore] = useState(false)

    let count = (showMore==true?10:5)

    if(sortedData.length===0){
        return(
            <div className="text-center text-gray-400 py-6 text-sm italic">
                No Posts available!!
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-3 justify-center ">
            {sortedData.slice(0,count).map((tweet,index)=>(
                <div key={index} className="p-6 rounded-2xl shadow bg-gray-800 border border-gray-700 flex flex-col gap-3 hover:shadow-lg hover:scale-102 transition-transform">
                    <p className="text-white text-base leading-relaxed">{tweet.text}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatDate(tweet.createdAt)}</span>
                        <a
                        href={tweet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:underline"
                        >
                        <LinkIcon className="w-4 h-4" /> View Post
                        </a>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-200">
                        {engagementIcons.map((item,ind)=>(
                            <div className="flex items-center gap-1" key={ind} >
                                <item.icon className={`w-5 h-5 ${item.color}`} /> {formatNumber(tweet[item.metric])}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {sortedData.length > 5 && (
                <div className="flex justify-center mt-2">
                    <Button
                    variant="outline"
                    onClick={() => setShowMore(!showMore)}
                    >
                    {showMore ? "Show Less" : "Show More"}
                    </Button>
                </div>
                )}
        </div>
    )
}
export default TweetDisplay