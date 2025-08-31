
const headerItems = ["Home","Analyze","My Reports"]

const Header = () => {
  return (
    <header className="bg-neutral-900 text-white shadow-2xl">
      <div className="flex justify-between items-center px-8 py-5">
        
        {/* Logo */}
        <div className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent cursor-pointer text-4xl font-bold">
          TrendPulse
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-xl font-medium">
            {headerItems.map((item,index)=>(
                <li key={index} className="cursor-pointer  hover:text-indigo-400 transition-colors duration-300">{item}</li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
