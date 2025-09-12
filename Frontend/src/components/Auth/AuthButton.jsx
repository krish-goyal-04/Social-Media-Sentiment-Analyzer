import { useState } from "react"
import { Link } from "react-router-dom"
import LogOutPopOver from "./LogoutPopOver"
import { LogOut,LogIn } from "lucide-react"
import { motion } from "framer-motion"

const AuthButton = ({user,handleLogOut})=>{
    const [logoutClicked,setLogoutClicked] = useState(false)
        return user ?(<>
              <motion.button
              onClick={()=>setLogoutClicked(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              disabled={logoutClicked}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </motion.button>
            { logoutClicked && (
              <div className="absolute top-16 left-0 right-0">
                <LogOutPopOver setLogoutClicked={setLogoutClicked} handleLogOut={handleLogOut} />
              </div>)}
            </>):(<>
            <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
              <Link
              to="/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
              </Link>
              </motion.div>
              </>
            )
}
export default AuthButton