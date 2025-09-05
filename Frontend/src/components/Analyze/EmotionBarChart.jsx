import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from "recharts"

const EmotionBarChart = ({data})=>{
    data.sort((a,b)=>b.score-a.score)
    return(
        <div>
            <BarChart
                width={700}
                height={400}
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                <XAxis
                    type="number"
                    tickFormatter={(value)=>`${(value*100).toFixed(0)}%`}
                    stroke="#9CA3AF"
                    tick={{ fill: "#fff", fontSize: 12 }}
                />

                <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fill: "#fff", fontSize: 12, fontWeight: "bold" }}
                    tickFormatter={(value)=>`${value.charAt(0).toUpperCase()+value.slice(1)}`}
                />

                <Tooltip
                    formatter={(value, name, entry) =>
                        [`${(value * 100).toFixed(1)}%`, entry.payload.label]
                    }
                    contentStyle={{ borderRadius: "8px", border: "none", color: "#fff", }}
                />

                <Bar dataKey="score" radius={[6, 6, 6, 6]} barSize={20}>
                    {data.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                    ))}
                </Bar>

            </BarChart>
        </div>
    )
}
export default EmotionBarChart