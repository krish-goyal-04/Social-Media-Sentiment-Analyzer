import {XAxis,YAxis,Tooltip,Bar,BarChart,PieChart,Pie,Cell,Legend,ResponsiveContainer} from "recharts"


const OverallSentimentChart = ({data,chart,COLORS})=>{
    return(
        <div className="w-full h-70 flex justify-center">
            <ResponsiveContainer width="100%" height="100%" className="">
                {chart==="Bar"?(
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" stroke="#fff">
                            {data.map((entry,index)=>(<Cell key={index} fill={COLORS[entry.name.toLowerCase()]} />))}
                        </Bar>

                    </BarChart> 
                ):(
                    <PieChart >
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                            dataKey="value"
                        >
                            {data.map((entry,index)=>(
                                <Cell key={index} fill={COLORS[entry.name.toLowerCase()]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
        
    )
}
export default OverallSentimentChart