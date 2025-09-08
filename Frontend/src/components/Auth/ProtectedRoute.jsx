import { useContext } from "react"
import { AuthContext } from "../../hooks/useAuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children})=>{
    const {user,loading} = useContext(AuthContext)

    if(loading) return <p>Loading....</p>

    if(user)return children
    return(
        <Navigate to="/login" />
    )
}
export default ProtectedRoute;