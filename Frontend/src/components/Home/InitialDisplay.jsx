import { motion } from "framer-motion";
import {Button} from "../../components/ui/button"
import { ChartColumnBig } from "lucide-react";
import {Link} from "react-router-dom"

const InitialDisplay = ()=>{
    return(
        <div className="min-h-screen flex flex-col md:flex-row p-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 justify-between" >
            <div className="space-y-6 ml-15">
                <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}}
                transition={{duration:1.2}} className="text-5xl md:text-6xl font-extrabold text-white">
                    Get <span>Real-Time</span> Analysis with <span className="text-indigo-400 font-extrabold">TrendPulse</span>
                </motion.h1>

                <motion.p
                initial={{ opacity: 0,y:20 }}
                animate={{ opacity: 1,y:0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
            >
                Track sentiments, trends, and conversations across social media. 
                Discover what your audience really feels.
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-md text-gray-400 italic"
                >
                Empowering influencers, brands, and analysts to make data-driven decisions.
                </motion.p>
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:0.5,duration:0.5}}
                className="flex space-x-7 mt-8"
                >
                    <Button size="lg" className="rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-indigo-500" variant="default" ><Link to="/analyze">Get Started</Link></Button>
                    <Button size="lg" className="rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-indigo-500" variant="default">Demo</Button>
                    <Button size="lg" className="rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-indigo-500" variant="default">Learn More</Button>
            </motion.div>
            
            </div>
            <div className="mr-15">
                <motion.div
                    initial={{opacity:0,x:50}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:1.2}}
                    className="flex "
                    >
                    <div className="flex items-center justify-center shadow-xl">
                        <ChartColumnBig  className="w-72 h-72 hover:scale-105 text-white transition-transform duration-300 hover:text-indigo-400" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
export default InitialDisplay