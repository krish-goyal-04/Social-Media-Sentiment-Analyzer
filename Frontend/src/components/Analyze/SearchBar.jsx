import {Input} from "../ui/input"
import { Search } from 'lucide-react';
import {Button} from "../ui/button"
import { motion } from "framer-motion";

const SearchBar = ()=>{
    return(
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1}}
            className="flex p-10 space-x-3 items-center ">
            <Input placeholder="Enter a Topic" className="rounded-2xl max-w-lg bg-gray-200  placeholder:text-gray-700 shadow-2xl " />
            <Button className="rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 shadow-2xl hover:scale-110"><Search /></Button>
        </motion.div>
    )
}
export default SearchBar