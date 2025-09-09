import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../hooks/useAuthContext";
import { Menu, X, LogOut, BarChart3, Home, History, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const headerItems = [
  { name: "Home", link: "/", icon: Home },
  { name: "Analyze", link: "/analyze", icon: BarChart3 },
  { name: "History", link: "/history", icon: History }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      console.log("Logged out successfully");
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800/50 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer text-2xl sm:text-3xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-pink-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span>TrendPulse</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {headerItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.link;
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    to={item.link}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        : "text-neutral-300 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop Logout Button */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              onClick={handleLogOut}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
            <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{scale:1.05,y:-1}}
                  className=" bg-white w-10 h-10 flex items-center justify-center text-black rounded-full"
                  >
                    <Link to="/profile"><User size={28}  className=""/></Link>
              </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-neutral-800/50"
            >
              <nav className="py-4 space-y-2">
                {headerItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.link;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                            : "text-neutral-300 hover:text-white hover:bg-neutral-800/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                <motion.button
                  onClick={handleLogOut}
                  className="flex items-center space-x-3 w-full px-4 py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: headerItems.length * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{scale:1.05,y:-1}}
                  className=" bg-white w-10 h-10 flex items-center justify-center ml-5 mt-4 text-black rounded-full"
                  >
                    <Link to="/profile"><User size={28}  className=""/></Link>
              </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
