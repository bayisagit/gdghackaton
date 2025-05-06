import { Link } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { FaSun } from "react-icons/fa";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sleep from "../assets/sleep-mode.png";
import light from "../assets/light-mode.png";
import { useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsServicesOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsUserMenuOpen(false);
    if (isOpen) toggleMenu(); // Close mobile menu if open
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="absolute top-0 left-0 w-full shadow-md z-10 bg-white dark:bg-gray-900 border-b-2 border-cyan-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <img src="/logo.png" className="w-14 h-14" />
          <span className="text-xl font-semibold text-gray-800 dark:text-white">MediHelp+</span>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 dark:text-white focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-gray-600 dark:text-white hover:text-cyan-500">
            Home
          </Link>

          <div className="relative">
            <button
              onClick={toggleServices}
              className="text-gray-600 dark:text-white hover:text-cyan-500 flex items-center space-x-1 focus:outline-none"
            >
              <span>Services</span>
              <FaChevronDown
                className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-md shadow-lg">
                <Link
                  to="/symptom-checker"
                  className="block px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Symptom Checker
                </Link>
                <Link
                  to="/skin-diagnosis"
                  className="block px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Skin Diagnosis
                </Link>
                <Link
                  to="/first-aid"
                  className="block px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  onClick={() => setIsServicesOpen(false)}
                >
                  First Aid
                </Link>
                <Link
                  to="/education"
                  className="block px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Education
                </Link>
              </div>
            )}
          </div>

          <Link to="/find-doctor" className="text-gray-600 dark:text-white hover:text-cyan-500">
            Find Doctor
          </Link>
          <Link to="/find-clinic" className="text-gray-600 dark:text-white hover:text-cyan-500">
            Find Clinic
          </Link>

          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-white hover:text-cyan-500"
          >
            {isDarkMode ? (
              <img src={light} alt="Light Mode" className="w-5 h-5 dark:filter dark:brightness-0 dark:invert" />
            ) : (
              <img src={sleep} alt="Dark Mode" className="w-5 h-5" />
            )}
          </button>

          {localStorage.getItem("token") ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-gray-600 dark:text-white hover:text-cyan-500 rounded-full focus:outline-none"
              >
                <User className="h-6 w-6 cursor-pointer" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-md shadow-lg">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 dark:text-white hover:text-cyan-500">
                Log in
              </Link>
              <Link to="/signup">
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" className="text-gray-600 dark:text-white hover:text-cyan-500" onClick={toggleMenu}>
              Home
            </Link>

            <div className="w-full text-center">
              <button
                onClick={toggleServices}
                className="text-gray-600 dark:text-white hover:text-cyan-500 flex items-center justify-center space-x-1 w-full focus:outline-none"
              >
                <span>Services</span>
                <FaChevronDown
                  className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isServicesOpen && (
                <div className="flex flex-col mt-2 space-y-2">
                  <Link
                    to="/symptom-checker"
                    className="text-gray-600 dark:text-white hover:text-cyan-500 px-4 py-2"
                    onClick={toggleMenu}
                  >
                    Symptom Checker
                  </Link>
                  <Link
                    to="/skin-diagnosis"
                    className="text-gray-600 dark:text-white hover:text-cyan-500 px-4 py-2"
                    onClick={toggleMenu}
                  >
                    Skin Diagnosis
                  </Link>
                  <Link
                    to="/first-aid"
                    className="text-gray-600 dark:text-white hover:text-cyan-500 px-4 py-2"
                    onClick={toggleMenu}
                  >
                    First Aid
                  </Link>
                  <Link
                    to="/education"
                    className="text-gray-600 dark:text-white hover:text-cyan-500 px-4 py-2"
                    onClick={toggleMenu}
                  >
                    Education
                  </Link>
                </div>
              )}
            </div>

            <Link to="/find-doctor" className="text-gray-600 dark:text-white hover:text-cyan-500" onClick={toggleMenu}>
              Find Doctor
            </Link>
            <Link to="/find-clinic" className="text-gray-600 dark:text-white hover:text-cyan-500">
              Find Clinic
            </Link>

            {localStorage.getItem("token") ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="text-gray-600 dark:text-white hover:text-cyan-500 rounded-full focus:outline-none"
                >
                  <User className="h-6 w-6 cursor-pointer" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-md shadow-lg">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        toggleMenu();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-cyan-100 text-gray-600 dark:text-white hover:text-cyan-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-white hover:text-cyan-500" onClick={toggleMenu}>
                  Log in
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
