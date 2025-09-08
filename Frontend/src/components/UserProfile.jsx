import { useContext } from "react"
import {AuthContext} from "../hooks/useAuthContext"
const UserProfile = ()=>{
    const {user} = useContext(AuthContext)
    console.log(user)
    return(
        <div>
            
        </div>
    )
}
export default UserProfile