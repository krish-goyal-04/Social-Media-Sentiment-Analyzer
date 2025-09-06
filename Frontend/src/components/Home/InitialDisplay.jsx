import { motion } from "framer-motion";
import { Button } from "../../components/ui/button"
import { 
    ChartColumnBig, 
    TrendingUp, 
    Users, 
    Zap, 
    Shield, 
    BarChart3, 
    Heart, 
    MessageSquare,
    ArrowRight,
    Play,
    Star,
    CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom"

const InitialDisplay = () => {
    const features = [
        {
            icon: TrendingUp,
            title: "Real-time Analysis",
            description: "Get instant insights from social media conversations"
        },
        {
            icon: Users,
            title: "Audience Insights",
            description: "Understand your audience's emotions and preferences"
        },
        {
            icon: Zap,
            title: "AI-Powered",
            description: "Advanced machine learning for accurate sentiment detection"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-5">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >

                        {/* Main Heading */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                        >
                            Get <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Real-Time</span> Analysis with <span className="text-indigo-400">TrendPulse</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4"
                        >
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Track sentiments, trends, and conversations across social media. 
                                Discover what your audience really feels with AI-powered insights.
                            </p>
                            <p className="text-gray-400 italic">
                                Empowering influencers, brands, and analysts to make data-driven decisions.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link to="/analyze">
                                <Button 
                                    size="lg" 
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2" size={20} />
                                </Button>
                            </Link>
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="border-white/20 text-black hover:bg-white/10 hover:text-white rounded-2xl px-8 py-4 text-md font-semibold transition-all duration-300 hover:scale-105"
                            >
                                <Play className="mr-2" size={20} />
                                Watch Demo
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Main Visual */}
                        <div className="relative p-3 ml-10">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="bg-gradient-to-br w-[80%] from-indigo-500/20 to-purple-500/20 rounded-3xl p-4 backdrop-blur-sm border border-white/20"
                            >
                                <ChartColumnBig className="w-full h-74 text-indigo-400" />
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute -top-4 right-26  bg-green-500/20 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm z-20"
                            >
                                <TrendingUp className="text-green-400" size={32} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute -bottom-4 -left-4 bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm x-10"
                            >
                                <BarChart3 className="text-blue-400" size={32} />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-2xl"
            >
                <div className="container mx-auto px-6 py-16 ">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose TrendPulse?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Powerful features designed to give you the insights you need to succeed
                        </p>
                    </div>

                    <div className="grid  grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.6 + index * 0.1 }}
                                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="bg-indigo-500/20 rounded-xl p-3 w-fit mb-4">
                                        <Icon className="text-indigo-400" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
export default InitialDisplay