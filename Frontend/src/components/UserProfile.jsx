import { useContext, useEffect, useState } from "react"
import {AuthContext} from "../hooks/useAuthContext"
import { motion } from "framer-motion";
import { getUserDetails } from "../hooks/useFetchData";
import { User, Mail, UserCheck, Calendar } from "lucide-react";

const UserProfile = ()=>{
    const {user} = useContext(AuthContext)
    const [data,setData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        if(!user)return
        const fetchUserData = async()=>{
            try {
                setLoading(true)
                const snapshot = await getUserDetails(user.uid)
                console.log(snapshot)
                if(snapshot.exists()){
                    setData(snapshot.data())
                }
            } catch (error) {
                console.error("Error fetching user data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUserData()
    },[user])
    
    console.log(data)
    
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex justify-center px-4 sm:px-6 py-8 sm:py-12">
            <div className="w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-gray-700/50 p-6 sm:p-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                    User Profile
                                </h1>
                                <p className="text-gray-300 mt-1">Manage your account information</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                <span className="ml-3 text-gray-300">Loading profile...</span>
                            </div>
                        ) : data === null ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-center py-12"
                            >
                                <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-300 text-lg">No profile information available</p>
                                <p className="text-gray-400 text-sm mt-2">Complete your profile to get started</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Profile Information Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email Card */}
                                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-indigo-500/30 transition-colors duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">Email Address</h3>
                                        </div>
                                        <p className="text-gray-300 text-sm break-all">{data.email}</p>
                                    </div>

                                    {/* Name Card */}
                                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-purple-500/30 transition-colors duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <UserCheck className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">Full Name</h3>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                            {data.firstName} {data.lastName}
                                        </p>
                                    </div>
                                </div>

                                {/* Account Details */}
                                <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-green-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">Account Details</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">User ID:</span>
                                            <p className="text-gray-300 font-mono text-xs break-all">{user.uid}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Account Status:</span>
                                            <p className="text-green-400 font-medium">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
export default UserProfile