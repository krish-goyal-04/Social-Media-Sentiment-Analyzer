import {Heart,View,Repeat2} from "lucide-react"
const formatNumber = (num)=>{
    if(num>=1000000) return (num/1000000).toFixed(1)+"M";
    if(num>=1000) return(num/1000).toFixed(1)+"K"
    return num
}
const EngagementCard = ({ avgLabel, icon:Icon, color, avgData, totalData,totalLabel }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center ">
      <Icon className={`${color} mb-4`} size={40} />
      <div className="grid grid-cols-2 gap-20 mb-2">
        <div className="flex flex-col items-center">
        <h3 className="text-white text-xl font-bold mb-2">{formatNumber(avgData)}</h3>
        <p className="text-gray-400 text-sm">{avgLabel}</p>
        
      </div>
      <div className="flex flex-col items-center" >
        <h3 className="text-white text-xl font-bold mb-2">{formatNumber(totalData)}</h3>
        <p className="text-gray-400 text-sm">{totalLabel}</p>
      </div>
      </div>
    </div>
  );
};

export default EngagementCard;
