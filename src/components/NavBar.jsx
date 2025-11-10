
import { useContext,useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import { Sun, Moon, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

 const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition")}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-properties" className={({ isActive }) => (isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition")}>All Properties</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-property" className={({ isActive }) => (isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition")}>Add Property</NavLink>
          </li>
          <li>
            <NavLink to="/my-properties" className={({ isActive }) => (isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition")}>My Properties</NavLink>
          </li>
          <li>
            <NavLink to="/my-ratings" className={({ isActive }) => (isActive ? "text-indigo-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition")}>My Ratings</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl mt-4 transition-all backdrop-blur-md">
      <div className="w-full flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          HomeNest
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">{navLinks}</ul>

        <div className="flex items-center space-x-3">
          {/* Dark Mode */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Auth Buttons */}
          {!user ? (
            <div className="hidden md:flex space-x-2">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition">Signup</Link>
            </div>
          ) : (
            <div className="relative group">
              <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="user" className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-400" />

              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{user.displayName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                  Log out
                </button>
              </div>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-3">
          <ul className="flex flex-col space-y-2 font-medium">{navLinks}</ul>

          {!user ? (
            <div className="flex flex-col space-y-2 mt-4">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-semibold">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-semibold">Signup</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full mt-3 py-2 text-red-500 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition">Log out</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
