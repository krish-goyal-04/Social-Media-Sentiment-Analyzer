import { useContext } from "react"
import {AuthContext} from "../hooks/useAuthContext"
import { motion } from "framer-motion";
const features = [
        {

            title: "Real-time Analysis",
            description: "Get instant insights from social media conversations"
        },
        {

            title: "Audience Insights",
            description: "Understand your audience's emotions and preferences"
        },
        {

            title: "AI-Powered",
            description: "Advanced machine learning for accurate sentiment detection"
        }
    ];
const UserProfile = ()=>{
    const {user} = useContext(AuthContext)
    const userId = user.uid

    return(
        {/*<div className="flex justify-center p-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-2xl"
            >
                <div className="container mx-auto px-6 py-16 ">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose <span className="text-indigo-400">TrendPulse</span>?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Powerful features designed to give you the insights you need to succeed
                        </p>
                    </div>

                    <div className="grid  grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.6 + index * 0.1 }}
                                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="bg-indigo-500/20 rounded-xl p-3 w-fit mb-4">
                                       
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>*/}
    )
}
export default UserProfile