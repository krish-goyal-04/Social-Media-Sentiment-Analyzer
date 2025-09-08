import { collection,getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"

export const FetchAllData = async (userId)=>{
    const ref = collection(db, "Users", userId, "AnalysisResults")
    const snapshot = await getDocs(ref)
    return snapshot
}