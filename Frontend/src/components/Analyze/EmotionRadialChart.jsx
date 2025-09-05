import { Cell, LabelList, Legend, RadialBar, RadialBarChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'


const EmotionRadialChart = ({data})=>{
    data.sort((a,b)=>b.score-a.score)
    return(
        <ChartContainer
          config={{}}
          className="w-full h-[400px] font-bold"
        >
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={50}
            outerRadius={200}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                labelKey="label" 
                nameKey="score"
                formatter={(value,name,entry)=>`${entry.payload.label.charAt(0).toUpperCase()+entry.payload.label.slice(1)} : ${(value*100).toFixed(1)}%`}
                className="text-sm font-medium"
                />}
            />
            <RadialBar dataKey="score" background clockwise cornerRadius={8}>
                {data.map((item,index)=>(
                    <Cell key={index} fill={item.color} />
                ))}
              <LabelList
                position="insideStart"
                dataKey="label"
                className="fill-black capitalize"
                fontSize={11}
              />
            </RadialBar>
            
          </RadialBarChart>
        </ChartContainer>
    )
}
export default EmotionRadialChart