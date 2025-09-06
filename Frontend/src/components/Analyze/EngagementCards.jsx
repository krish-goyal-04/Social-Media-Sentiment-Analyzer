import { Heart, View, Repeat2, MessageSquareReply } from "lucide-react"
import { motion } from "framer-motion"

const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num
}

const EngagementCard = ({ avgLabel, icon: Icon, color, avgData, totalData, totalLabel, index }) => {
    const getGradientClass = (color) => {
        if (color.includes('pink')) return 'from-pink-500/20 to-rose-500/20'
        if (color.includes('green')) return 'from-green-500/20 to-emerald-500/20'
        if (color.includes('blue')) return 'from-blue-500/20 to-cyan-500/20'
        if (color.includes('yellow')) return 'from-yellow-500/20 to-amber-500/20'
        return 'from-gray-500/20 to-slate-500/20'
    }

    const getIconBgClass = (color) => {
        if (color.includes('pink')) return 'bg-pink-500/20'
        if (color.includes('green')) return 'bg-green-500/20'
        if (color.includes('blue')) return 'bg-blue-500/20'
        if (color.includes('yellow')) return 'bg-yellow-500/20'
        return 'bg-gray-500/20'
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden"
        >
            <div className={`bg-gradient-to-br ${getGradientClass(color)} backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className={`${getIconBgClass(color)} rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`${color} group-hover:scale-110 transition-transform duration-300`} size={32} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                        <div className="bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-colors duration-300">
                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                                {formatNumber(avgData)}
                            </h3>
                            <p className="text-gray-300 text-sm font-medium">{avgLabel}</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-colors duration-300">
                            <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                                {formatNumber(totalData)}
                            </h3>
                            <p className="text-gray-300 text-sm font-medium">{totalLabel}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EngagementCard;
