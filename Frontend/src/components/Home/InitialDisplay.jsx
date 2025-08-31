import { motion } from "framer-motion";
import {Button} from "../../components/ui/button"

const InitialDisplay = ()=>{
    return(
        <div className="min-h-screen flex p-7 bg-gradient-to-br from-gray-900 via-black to-gray-800" >
            <div className="mt-15 mx-20" >
                <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}}
                transition={{duration:1.2}} className="text-4xl md:text-5xl font-extrabold text-white">
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

            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1,duration:1}}
                className="flex space-x-7 mt-8"
                >
                    <Button size="lg" className="rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-indigo-500" variant="default" >Get Started</Button>
                    <Button size="lg" className="rounded-2xl transition-transform duration-300 hover:scale-105 hover:bg-indigo-500" variant="default">Learn More</Button>
            </motion.div>
            </div>
        </div>
    )
}
export default InitialDisplay