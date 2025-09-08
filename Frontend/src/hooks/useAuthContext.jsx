import {signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth"
import {auth} from "../lib/firebase"
import { useEffect,useState,useContext, createContext } from "react"

export const AuthContext = createContext(null)

const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = async (email,password)=>{
        setLoading(true)
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password)
            setUser(response.user)
            setLoading(false)
            return response
        }
        catch(error){
            setLoading(false)
            throw error
        }
    }

    const logInUser =async  (email,password)=>{
        setLoading(true)
        try{
            const response = await signInWithEmailAndPassword(auth,email,password)
            setUser(response.user)
            setLoading(false)
            return response
        }
        catch(error){
            setLoading(false)
            throw error
        }
    }

    const logOut = async ()=>{
        setLoading(true)
        try{
            const response = await signOut(auth)
            setLoading(false)
            return response
        }
        catch(error){
            setLoading(false)
            throw error
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const authValue = {
        createUser,logInUser,logOut,loading,user
    }

    return(
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider