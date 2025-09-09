import { collection,getDocs,getDoc, doc } from "firebase/firestore"
import { db } from "../lib/firebase"

export const FetchAllData = async (userId)=>{
    const ref = collection(db, "Users", userId, "AnalysisResults")
    const snapshot = await getDocs(ref)
    return snapshot
}

export const FetchCollectionData = async (userId,collnId)=>{
    const ref = doc(db,"Users",userId,"AnalysisResults",collnId)
    const snapshot = await getDoc(ref)
    return snapshot
}

export const getUserDetails = async (userId)=>{
    const ref = doc(db,"Users",userId)
    const snapshot = await getDoc(ref)
    return snapshot
}