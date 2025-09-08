import { useContext, useEffect, useState } from "react"
import {Input} from "../ui/input"
import {Button} from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import {db} from "../../lib/firebase"
import { setDoc,doc } from "firebase/firestore"
import { AuthContext } from "../../hooks/useAuthContext"
import { Loader2 } from "lucide-react"

const RegisterUser = ()=>{
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [localLoading,setLocalLoading] = useState(false)
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const {user,loading,createUser} = useContext(AuthContext)

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user,navigate])

    const formItems = [
        {type:"text",placeholder:"First Name",value:firstName,onChange:setFirstName},
        {type:"text",placeholder:"Last Name",value:lastName,onChange:setLastName},
        {type:"email",placeholder:"Email",value:email,onChange:setEmail},
        {type:"password",placeholder:"Password",value:password,onChange:setPassword},
    ]

    const handleRegister = async (e)=>{
        e.preventDefault()
        setError('')
        setLocalLoading(true)
        if(!email||!password||!firstName||!lastName){
            setLocalLoading(false)
            setError('Provide all details!')
            return
        }
        try{
            const currentUser = await createUser(email,password)
            const newUser = currentUser.user
            
            await setDoc(doc(db,"Users",newUser.uid),{
                email: newUser.email,
                firstName:firstName,
                lastName:lastName
            })
            setEmail('')
            setFirstName('')
            setLastName('')
            setPassword('')
            console.log(newUser)
            console.log('user registered successfully')
            navigate('/')
        }
        catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("This email is already registered. Please login or use another email.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email format. Please enter a valid email.");
                    break;
                case "auth/operation-not-allowed":
                    setError("Email/password sign-in is not enabled. Contact support.");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak. Use at least 6 characters.");
                    break;
                case "auth/network-request-failed":
                    setError("Network error. Check your internet connection.");
                    break;
                case "auth/internal-error":
                    setError("Internal server error. Please try again later.");
                    break;
                default:
                    setError("Registration failed. Please try again.");
            }
        }
            finally{
            setLocalLoading(false)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
            <form 
            className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg border border-gray-800"
            onSubmit={handleRegister}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
                    <p className="text-gray-400 mt-2">Sign up to get started</p>
                </div>
                {error && (
                    <p className="bg-red-900 bg-opacity-75 rounded-md text-white p-2 text-sm text-center mb-5">{error}</p>
                )}
                <div className="space-y-5">
                    {formItems.map((item,ind)=>(
                        <Input 
                        key={ind} 
                        type={`${item.type}`} 
                        placeholder={`${item.placeholder}`} 
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={item.value}
                        onChange={(e)=>item.onChange(e.target.value.trim())}
                        disabled={localLoading}
                        />
                    ))}
                </div>
                    <Button
                    type="submit"
                    variant="default"
                    className="w-full mt-8 py-3 rounded-xl bg-blue-600 font-semibold text-lg hover:bg-blue-700 transition-all"
                >
                        {localLoading?(
                            <p className="flex items-center ">Signing Up <Loader2 className="ml-2 animate-spin" size={24}/></p>
                        ):<p>Sign Up</p>}
                </Button>
                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account ?{"   "}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
                
            </form>
        </div>
    )

}
export default RegisterUser