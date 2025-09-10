import { Button } from "../ui/button"
import { LogOut } from "lucide-react"

const LogOutPopOver = ({setLogoutClicked,handleLogOut})=>{
    return(
        <div className="fixed  flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm min-h-screen w-full"> 
            <div className="w-full max-w-md rounded-2xl border border-gray-700/60 shadow-2xl bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 p-6">
                <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-red-500/15 flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-white text-lg font-semibold">Confirm Logout</h2>
                        <p className="text-gray-300 mt-1 text-sm">Are you sure you want to logout? You can sign in again anytime.</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={()=>setLogoutClicked(false)}
                        className="border-gray-600 text-black hover:bg-gray-700/60 hover:text-gray-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogOut} 
                        variant="destructive"
                        className="gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default LogOutPopOver