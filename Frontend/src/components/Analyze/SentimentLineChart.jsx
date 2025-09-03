import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const SentimentLineChart = ({data})=>{
    return(
        <ResponsiveContainer width="100%" height="100%" >
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="timeLabel" />
                <YAxis domain={[0,1]} ticks={[0,0.5,1]} />
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