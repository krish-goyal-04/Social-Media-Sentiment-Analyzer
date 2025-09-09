import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const SentimentAreaChart = ({ data,formatDate }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="timeLabel" tick={{ fill: "#ccc" }} tickFormatter={formatDate} />
        <YAxis domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} tick={{fill:'#ccc'}} />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="positive" stackId="1" stroke="#4caf50" fill="#4caf50" fillOpacity={0.6} name="Positive" />
        <Area type="monotone" dataKey="neutral" stackId="1" stroke="#999999" fill="#999999" fillOpacity={0.6} name="Neutral" />
        <Area type="monotone" dataKey="negative" stackId="1" stroke="#f44336" fill="#f44336" fillOpacity={0.6} name="Negative" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SentimentAreaChart;
