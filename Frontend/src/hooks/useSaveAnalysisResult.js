import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../lib/firebase"

const saveAnalysisResult = async (userId,result,keywords)=>{
    try {
        const resultRef = doc(collection(db,"Users",userId,"AnalysisResults"))
        const data = {
            ...result,
            input_keyword:keywords,
            createdAt:new Date()
        }
        await setDoc(resultRef,data)
        console.log("Data Saved to Database")
    } catch (error) {
        console.error(error)
    }
    
}
export default saveAnalysisResult