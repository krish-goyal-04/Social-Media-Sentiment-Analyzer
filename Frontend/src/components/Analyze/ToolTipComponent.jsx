import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ToolTipComponent = ({text})=>{
    return(
        <Tooltip>
            <TooltipTrigger>
                <Info 
                size={16} 
                className="text-gray-500 hover:text-white cursor-pointer" 
                />
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-sm">{text}</p>
            </TooltipContent>
        </Tooltip>
    )
}
export default ToolTipComponent