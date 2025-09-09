import { useContext, useEffect, useState } from "react";
import { FetchCollectionData } from "../../hooks/useFetchData";
import { AuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import Dashboard from "../Analyze/Dashboard";

const PrevResultDisplay = ()=>{
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [data,setData] = useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            const snapshot = await FetchCollectionData(user.uid,id)
            console.log(snapshot)
            if(snapshot.exists()){
                setData(snapshot.data())
            }
        }
        fetchData()
    },[user,id])
    console.log(data)
    return(
        <div className="p-30">
            {data && 
            <Dashboard results={data} />}
        </div>
    )
    
}
export default PrevResultDisplay