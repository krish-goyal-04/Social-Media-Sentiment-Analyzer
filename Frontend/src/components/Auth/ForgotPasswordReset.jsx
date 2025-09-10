import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { doesEmailExist } from "../../hooks/useEmailAccess"
import { motion } from "framer-motion"
const ForgotPasswordReset = ()=>{
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [error,setError] = useState(null)
    const [localLoading,setLocalLoading] = useState(false)
    const [message,setMessage] = useState(null)
    const {user,forgotPassword} = useContext(AuthContext)
    
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[user,navigate])

    const handleReset = async(e)=>{
        e.preventDefault()
        setLocalLoading(true)
        setError(null)
        if(!email){
            setError("Please provide email")
            setLocalLoading(false)
            return
        }
        try{
            const exists = await doesEmailExist(email)
            if (!exists) {
            setError("Email does not exist!")
            return  
            }
            await forgotPassword(email)
            setMessage("Password reset email has been sent to your email (check spam folder if not in inbox).\n Redirecting...")
            setTimeout(()=>{
                setMessage(null)
                navigate("/login")
            },6000)
            setEmail('')
            console.log('Reset email sent')
            
        }
        catch(err) {
            switch (err.code) {
                case "auth/invalid-email":
                setError("Invalid email format.")
                break
                case "auth/user-not-found":
                setError("No account found with this email.")
                break
                case "auth/network-request-failed":
                setError("Network error. Please check your internet.")
                break
                default:
                setError("Something went wrong. Please try again.")
            }
        }
        finally{
            setLocalLoading(false)
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
            <motion.form 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg border border-gray-800"
                onSubmit={handleReset}
                >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white">Reset Password</h1>
                    <p className="text-gray-400 mt-2">Enter your email to reset password</p>
                </div>
                {error && (
                    <p className="bg-red-900 bg-opacity-75 rounded-md text-white p-2 text-sm text-center mb-5">{error}</p>
                )}
                {message && (
                    <p className="bg-gray-300 bg-opacity-75 rounded-md text-black p-2 text-sm text-center mb-5">{message}</p>
                )}
                <div className="space-y-5">
                    <Input 
                    type="email"
                    placeholder="Email"
                    className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value.trim())
                        if(error) setError(null)
                    }}
                    disabled={localLoading}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Button
                    type="submit"
                    variant="default"
                    className="w-[60%] mt-8 py-3 rounded-xl bg-blue-600 font-semibold text-lg hover:bg-blue-700 transition-all"
                    disabled={localLoading}
                >
                        {localLoading?(
                            <p className="flex items-center ">Sending <Loader2 className="ml-2 animate-spin" size={24}/></p>
                        ):<p>Next</p>}
                        
                </Button>
                </div>
            </motion.form>
        </div>
    )
}
export default ForgotPasswordReset