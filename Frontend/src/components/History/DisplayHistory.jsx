import { useContext, useEffect, useState } from "react"
import {AuthContext} from "../../hooks/useAuthContext"
import { FetchAllData } from "../../hooks/useFetchData"
import {Button} from "../ui/button"
import Dashboard from "../Analyze/Dashboard"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tableHeadItems = ['Topic','Date','Keywords','Analysis']

const formatDate = (timestamp)=>{
    if(!timestamp)return "-"
    const date = new Date(timestamp.seconds*1000)
    return date.toLocaleString()
}

const DisplayHistory = ()=>{
    const {user} = useContext(AuthContext)
    const [data,setData] = useState([])

    const analysisData = data.map((item)=>({
        tweetsData:item.tweetsData,
        keywords:item.keywords
    }))

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
    
    console.log(data)

    const handleClick = (e)=>{
        <Dashboard results={analysisData} />
    }
    return(
        <div className="flex items-center justify-center p-15 text-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-400  rounded-2xl">
                        {tableHeadItems.map((item,ind)=>(
                            <TableHead 
                            key={ind}
                            className=" font-bold text-2xl"
                            >{item}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item)=>(
                        <TableRow key={item.id}>
                            <TableCell>{item.input_keyword}</TableCell>
                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                            <TableCell>
                                {item.keywords}
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    className="text-black"
                                    onClick={handleClick}
                                    >View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
        </div>
    )
}
export default DisplayHistory