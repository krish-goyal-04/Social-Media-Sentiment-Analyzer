import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const SentimentLineChart = ({data,formatDate})=>{
    return(
        <ResponsiveContainer width="100%" height={400} >
            <LineChart width={600} height={400} data={data}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
                <XAxis dataKey="timeLabel" tick={{ fill: "#ccc" }} tickFormatter={formatDate} />
                <YAxis domain={[0,1]} ticks={[0,0.5,1]} tick={{fill:'#ccc'}} />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="positive" stroke="#4caf50"  name="Positive" />
                <Line type="monotone" dataKey="neutral" stroke="#999999"  name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke="#f44336"  name="Negative" />              
            </LineChart>
        </ResponsiveContainer>
    )
}
export default SentimentLineChart