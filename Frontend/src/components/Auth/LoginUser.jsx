import { useContext, useEffect, useState } from "react"
import {Input} from "../ui/input"
import {Button} from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import {auth} from "../../lib/firebase"
import { AuthContext } from "../../hooks/useAuthContext"
import { Loader2 } from "lucide-react"
const LoginUser = ()=>{
    const {user,logInUser} = useContext(AuthContext)
    const [error,setError] = useState('')
    const [localLoading,setLocalLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const formItems = [
        {type:"email",placeholder:"Email",value:email,onChange:setEmail},
        {type:"password",placeholder:"Password",value:password,onChange:setPassword},
    ]

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user,navigate])

    console.log("user:" ,user)
    console.log("auth",auth)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLocalLoading(true)
        setError(null)
        if(!email || !password){
            setError("Please enter both Email and Password!")
            setLocalLoading(false)
            return
        }
        try {
            await logInUser(email, password);
            setEmail("");
            setPassword("");
            console.log("Logged in:",auth.currentUser);
            navigate('/')
        } catch (err) {
            switch (err.code) {
            case "auth/invalid-email":
                setError("Invalid email format");
                break;
            case "auth/user-disabled":
                setError("This user has been disabled");
                break;
            case "auth/user-not-found":
                setError("User not found. Please register first");
                break;
            case "auth/wrong-password":
                setError("Incorrect password. Try again");
                break;
            default:
                setError("Login failed. Please try again");
            }
        } finally{
            setLocalLoading(false)
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
            <form 
                className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg border border-gray-800"
                onSubmit={handleLogin}
                >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white">Login</h1>
                    <p className="text-gray-400 mt-2">Welcome! Login to continue</p>
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
                <div className="flex items-center justify-center">
                    <Button
                    type="submit"
                    variant="default"
                    className="w-[60%] mt-8 py-3 rounded-xl bg-blue-600 font-semibold text-lg hover:bg-blue-700 transition-all"
                >
                        {localLoading?(
                            <p className="flex items-center ">Logging In <Loader2 className="ml-2 animate-spin" size={24}/></p>
                        ):<p>Login</p>}
                        
                </Button>
                </div>
                <p className="text-center text-gray-400 mt-6 text-sm">
                    Don't have an account ?{"   "}
                    <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
                
            </form>
        </div>
    )
}
export default LoginUser