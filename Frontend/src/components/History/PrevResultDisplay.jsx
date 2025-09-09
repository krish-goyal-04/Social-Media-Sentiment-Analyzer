import { useContext, useEffect, useState } from "react";
import { FetchCollectionData } from "../../hooks/useFetchData";
import { AuthContext } from "../../hooks/useAuthContext";
import { useParams, Link } from "react-router-dom";
import Dashboard from "../Analyze/Dashboard";
import { motion } from "framer-motion";
import { ArrowLeft, History, Loader2, AlertCircle } from "lucide-react";

const PrevResultDisplay = ()=>{
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [data,setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                setLoading(true)
                setError(null)
                const snapshot = await FetchCollectionData(user.uid,id)
                console.log(snapshot)
                if(snapshot.exists()){
                    setData(snapshot.data())
                } else {
                    setError("Analysis not found")
                }
            } catch (err) {
                console.error("Error fetching data:", err)
                setError("Failed to load analysis")
            } finally {
                setLoading(false)
            }
        }
        if(user && id) {
            fetchData()
        }
    },[user,id])
    
    console.log(data)
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
            {/* Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/history"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-sm font-medium">Back to History</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-600"></div>
                            <div className="flex items-center space-x-2">
                                <History className="w-5 h-5 text-indigo-400" />
                                <span className="text-white font-medium">Previous Analysis</span>
                            </div>
                        </div>
                        
                        {data && (
                            <div className="text-sm text-gray-400">
                                Topic: <span className="text-white font-medium">{data.input_keyword}</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center py-20"
                        >
                            <div className="text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" />
                                <p className="text-gray-300">Loading analysis results...</p>
                            </div>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center py-20"
                        >
                            <div className="text-center max-w-md">
                                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Analysis Not Found</h3>
                                <p className="text-gray-300 mb-6">{error}</p>
                                <Link to="/history">
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                                        Back to History
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : data ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Dashboard results={data} />
                        </motion.div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default PrevResultDisplay