import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../lib/firebase"

export const saveEmail = async(email)=>{
    try {
        const ref = doc(db,"Emails",email)
        await setDoc(ref,{email})
        console.log("Email saved")
    } catch (error) {
        console.log(error)    
    }
}

export const doesEmailExist = async (email)=>{
    try{
        const ref = doc(db,"Emails",email)
        const snapshot = await getDoc(ref)
        return snapshot.exists()
    }
    catch(err){
        console.log(err)
        return false
    }
}
    