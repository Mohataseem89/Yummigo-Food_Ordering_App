import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useActiveStatus from "../utils/useActiveStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeStatus = useActiveStatus();
  const { loggedInuser } = useContext(UserContext);
  // console.log("User Context Data:", loggedInuser);

  //subcribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);
  // console.log("Cart Items:", cartItems);

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="header sticky top-0 z-50 h-20 flex justify-between items-center px-4 lg:px-8 border-b border-gray-700 shadow-lg bg-gray-900/95 backdrop-blur-md transition-all duration-300">
      {/* Logo Section */}
      <div className="logo flex items-center">
        <Link to={"/"}>
{/*           <img
            className="h-12 w-12 lg:h-16 lg:w-16 cursor-pointer rounded-full ring-2 ring-orange-400 hover:ring-orange-500 transition-all duration-300 hover:scale-105"
            src="../src/assets/logo.png"
          
            alt="Yummigo Logo"
          /> */}
        </Link>
        <Link to={"/"}>
          <span className="ml-3 text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent sm:block">
            Yummigo
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-items hidden lg:flex">
        <ul className="flex items-center space-x-1 text-base">
          <li className="flex items-center px-3 py-2 rounded-lg">
            <span className="text-sm font-medium text-gray-300">
              Status:{" "}
              {activeStatus ? (
                <span className="text-green-400 font-semibold">Online 🟢</span>
              ) : (
                <span className="text-red-400 font-semibold">Offline ⚫️</span>
              )}
            </span>
          </li>

          {[
            { to: "/", label: "Home", icon: "🏠" },
            { to: "/about", label: "About", icon: "ℹ️" },
            { to: "/contact", label: "Contact", icon: "📞" },
            { to: "/cart", label: `Cart (${cartItems.length})`, icon: "🛒" },
            { to: "/grocery", label: "Grocery", icon: "🛍️" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center px-4 py-2 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-orange-400 transition-all duration-200 font-medium"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <button
              className="px-6 py-2 ml-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
              onClick={() => {
                setBtnName(btnName === "Login" ? "Logout" : "Login");
              }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
{/*       <h4 className="text-white">User: {loggedInuser}</h4> */}

      {/* Mobile Menu Button */}
      <div className="flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1">
            <div
              className={`w-5 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-300 transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
          <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-xl z-50 lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-center mb-4 p-3 bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-300">
                  Status:{" "}
                  {activeStatus ? (
                    <span className="text-green-400 font-semibold">
                      Online 🟢
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      Offline ⚫️
                    </span>
                  )}
                </span>
              </div>

              <ul className="space-y-2">
                {[
                  { to: "/", label: "Home", icon: "🏠" },
                  { to: "/about", label: "About", icon: "ℹ️" },
                  { to: "/contact", label: "Contact", icon: "📞" },
                  { to: "/cart", label: `Cart (${cartItems.length})`, icon: "🛒" },
                  { to: "/grocery", label: "Grocery", icon: "🛍️" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-orange-400 transition-all duration-200 font-medium"
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg"
                onClick={() => {
                  setBtnName(btnName === "Login" ? "Logout" : "Login");
                  closeMobileMenu();
                }}
              >
                {btnName}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
