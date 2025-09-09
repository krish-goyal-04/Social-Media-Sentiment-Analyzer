import { useContext, useEffect, useState } from "react"
import {AuthContext} from "../../hooks/useAuthContext"
import { FetchAllData } from "../../hooks/useFetchData"
import {Button} from "../ui/button"
import {motion} from "framer-motion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { History, Search, Calendar, Eye, TrendingUp, Loader2 } from "lucide-react"

const tableHeadItems = ['Topic','Date','Analysis']

const formatDate = (timestamp)=>{
    if(!timestamp)return "-"
    const date = new Date(timestamp.seconds*1000)
    return date.toLocaleString()
}

const DisplayHistory = ()=>{
    const {user} = useContext(AuthContext)
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async ()=>{
            if(!user)return
            try {
                setLoading(true)
                const snapshot = await FetchAllData(user.uid)
                const docs = snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setData(docs)
            } catch (error) {
                console.error("Error fetching history:", error)
            } finally {
                setLoading(false)
            }
        }
       fetchData()
    },[user])
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex justify-center px-4 sm:px-6 py-8 sm:py-12">
            <div className="w-full max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-gray-700/50 p-6 sm:p-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <History className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                    Analysis History
                                </h1>
                                <p className="text-gray-300 mt-1">View your past sentiment analysis results</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                <span className="ml-3 text-gray-300">Loading history...</span>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table className="rounded-xl overflow-hidden">
                                    <TableHeader>
                                        <TableRow className="bg-gray-700/50 border-b border-gray-600/50">
                                            {tableHeadItems.map((item,ind)=>(
                                                <TableHead 
                                                key={ind}
                                                className="font-semibold text-lg py-4 text-white"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        {ind === 0 && <Search className="w-4 h-4" />}
                                                        {ind === 1 && <Calendar className="w-4 h-4" />}
                                                        {ind === 2 && <Eye className="w-4 h-4" />}
                                                        <span>{item}</span>
                                                    </div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.length===0?(
                                            <TableRow>
                                                <TableCell
                                                    colSpan={tableHeadItems.length}
                                                    className="text-center py-12"
                                                >
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="flex flex-col items-center space-y-4"
                                                    >
                                                        <TrendingUp className="w-16 h-16 text-gray-400" />
                                                        <div>
                                                            <p className="text-gray-300 text-lg font-medium">No analysis history yet</p>
                                                            <p className="text-gray-400 text-sm mt-1">Run your first sentiment analysis to get started!</p>
                                                        </div>
                                                        <Link to="/analyze">
                                                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                                                Start Analysis
                                                            </Button>
                                                        </Link>
                                                    </motion.div>
                                                </TableCell>
                                            </TableRow>
                                        ):(data.map((item,index)=>(
                                            <motion.tr
                                                key={item.id}
                                                initial={{opacity:0,y:15}}
                                                animate={{opacity:1,y:0}}
                                                transition={{delay:index*0.1}}
                                                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300"
                                            >
                                                <TableCell className="text-white font-medium py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        <span className="truncate max-w-xs">{item.input_keyword}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-gray-300 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm">{formatDate(item.createdAt)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <Link to={`/history/${item.id}`}>
                                                        <Button
                                                            variant="outline"
                                                            className="bg-transparent border-gray-600 text-gray-300 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center space-x-2"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            <span>View</span>
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </motion.tr>
                                        )))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
export default DisplayHistory