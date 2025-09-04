import { parse,format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const chartColors = {
  Likes: "#ec4899",   
  Shares: "#22c55e",  
  Views: "#60a5fa",   
  Replies: "#eab308",
  engagement: "#2196f3" 
};

const EngagementChart = ({data,dataKey})=>{
    const chartData = data.map(item=>({
        ...item,
        Likes:Math.round(item.Likes/item.count),
        Shares:Math.round(item.Shares/item.count),
        Replies:Math.round(item.Replies/item.count),
        Views:Math.round(item.Views/item.count),
        engagement:Math.round(item.engagement/item.count)
    })).sort((a,b)=>a.time-b.time)
    return(
        <ResponsiveContainer width="100%" height={400} >
            <LineChart width={600} height={400} data={chartData}>
                <CartesianGrid stroke="#333" strokeDasharray="4 4"/>
                <XAxis dataKey="modifiedTime" tick={{ fill: "#ccc" }} />
                <YAxis tickFormatter={(t)=>dataKey === "engagement" ? `${t.toFixed(1)}%` : t}/>
                <Tooltip formatter={(t)=>dataKey === "engagement" ? `${t.toFixed(1)}%` : t} />
                <Legend />

                <Line type="monotone" dataKey={`${dataKey}`} stroke={`${chartColors[dataKey]}`} strokeWidth={2}
                    dot={false} name={dataKey==="engagement"?"Engagement Rate":dataKey}/>
                           
            </LineChart>
        </ResponsiveContainer>
    )
}
export default EngagementChart