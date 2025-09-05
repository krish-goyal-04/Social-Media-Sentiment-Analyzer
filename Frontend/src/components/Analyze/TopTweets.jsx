import { useState } from "react"
import TweetDisplay from "./TweetDisplay"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const filterItems = ['likes','shares','views','replies']

const TopTweets = ({results})=>{
    let tweets = results.tweetsData
    const chartData = tweets.map((item)=>({
        ...item,
        likes:item.likeCount,
        shares:item.retweetCount,
        replies:item.replyCount+item.quoteCount,
        views:item.viewCount
    }))
    console.log(chartData)
    const [filter,setFilter] = useState('likes')
    return(
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl text-white font-bold er">Top Posts</h1>
                <div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px] text-white">
                            <SelectValue placeholder="Select Metric" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="">
                                <SelectLabel>Sort by</SelectLabel>
                                {filterItems.map((item)=>(<SelectItem value={item} key={item}>{item.charAt(0).toUpperCase()+item.slice(1)}</SelectItem>))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <TweetDisplay data={chartData} filter={filter}/>
        </div>
    )
}
export default TopTweets