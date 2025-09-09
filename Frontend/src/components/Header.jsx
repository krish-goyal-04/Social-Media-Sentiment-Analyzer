import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../hooks/useAuthContext";


const headerItems = [{name:"Home",link:"/"},{name:"Analyze",link:"/analyze"},{name:"History",link:"/history"}]

const Header = () => {
  const navigate = useNavigate()
  const {logOut} = useContext(AuthContext)

  const handleLogOut = async (e)=>{
    e.preventDefault()
    try {
      await logOut()
      console.log("Logged out successfully")
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
}
  return (
    <header className="bg-neutral-900 text-white shadow-2xl">
      <div className="flex justify-between items-center px-8 py-5">
        
        {/* Logo */}
        <div className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent cursor-pointer text-4xl font-bold">
          <Link to="/">TrendPulse</Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-xl font-medium">
            {headerItems.map((item,index)=>(
              <li key={index} className="cursor-pointer  hover:text-indigo-400 transition-colors duration-300"><Link to={item.link}>{item.name}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogOut} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
