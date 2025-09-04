import { parse,format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const formatDate = (str)=>{
    const date = parse(str, "yyyy-MM-dd HH:mm",new Date())
    return format(date,"d MMM, h a")
}

const EngagementChart = ({data})=>{
    const chartData = data.map(item=>({
        ...item,
        engagement:item.engagement/item.count
    })).sort((a,b)=>a.time-b.time)
    return(
        <ResponsiveContainer width="100%" height={400} >
            <LineChart width={600} height={400} data={chartData}>
                <CartesianGrid stroke="#333" strokeDasharray="4 4"/>
                <XAxis dataKey="timeLabel" tick={{ fill: "#ccc" }} tickFormatter={formatDate} />
                <YAxis tickFormatter={(t)=>`${t}%`}/>
                <Tooltip formatter={(t)=>`${t.toFixed(2)}%`} />
                <Legend />

                <Line type="monotone" dataKey="engagement" stroke="#2196f3" strokeWidth={2}
                    dot={false} name="Engagement Rate" for/>
                           
            </LineChart>
        </ResponsiveContainer>
    )
}
export default EngagementChart