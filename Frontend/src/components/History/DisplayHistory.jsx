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

const tableHeadItems = ['Topic','Date','Analysis']

const formatDate = (timestamp)=>{
    if(!timestamp)return "-"
    const date = new Date(timestamp.seconds*1000)
    return date.toLocaleString()
}

const DisplayHistory = ()=>{
    const {user} = useContext(AuthContext)
    const [data,setData] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            if(!user)return
            const snapshot = await FetchAllData(user.uid)
            const docs = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setData(docs)
        }
       fetchData()
    },[user])
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex justify-center px-6 py-12">
            <div className="w-full max-w-7xl bg-gray-800/50 rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">
                    Analysis History
                </h1>
                <Table className="rounded-xl overflow-hidden">
                <TableHeader>
                    <TableRow className="bg-gray-400">
                        {tableHeadItems.map((item,ind)=>(
                            <TableHead 
                            key={ind}
                            className=" font-semibold text-lg  py-4"
                            >{item}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length===0?(
                        <TableRow>
                            <TableCell
                                colSpan={tableHeadItems.length}
                                className="text-center text-gray-200 py-6"
                            >
                                No history yet. Run your first analysis!
                            </TableCell>
                        </TableRow>
                    ):(data.map((item,index)=>(
                        <motion.tr
                            key={item.id}
                            initial={{opacity:0,y:15}}
                            animate={{opacity:100,y:10}}
                            transition={{delay:index*0.5}}
                            className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-300 hover:rounded-lg overflow-hidden"
                        >
                            <TableCell className="text-white font-medium py-4">
                                {item.input_keyword}
                            </TableCell>
                            <TableCell className="text-gray-300">
                                {formatDate(item.createdAt)}
                            </TableCell>
                            <TableCell>
                                <Link to={`/history/${item.id}`}>
                                <Button
                                    variant="outline"
                                    className="text-blackborder-gray-500 hover:bg-gray-600 transition-colors duration-300"
                                >
                                    View
                                </Button>
                                </Link>
                            </TableCell>
                        </motion.tr>
                    )))}
                </TableBody>
                </Table>
            </div>
            
        </div>
    )
}
export default DisplayHistory