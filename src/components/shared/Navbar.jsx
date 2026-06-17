"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition duration-300"
          >
            Fable
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-700 hover:text-indigo-600 transition duration-300 ${
                isActive("/")
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                  : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/browse-ebooks"
              className={`text-gray-700 hover:text-indigo-600 transition duration-300 ${
                isActive("/browse-ebooks")
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                  : ""
              }`}
            >
              Browse Ebooks
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`text-gray-700 hover:text-indigo-600 transition duration-300 ${
                  isActive("/dashboard")
                    ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                    : ""
                }`}
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`text-gray-700 hover:text-indigo-600 transition duration-300 ${
                    isActive("/login") ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              className={`block text-gray-700 hover:text-indigo-600 transition duration-300 ${
                isActive("/") ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/browse-ebooks"
              className={`block text-gray-700 hover:text-indigo-600 transition duration-300 ${
                isActive("/browse-ebooks")
                  ? "text-indigo-600 font-semibold"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Ebooks
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`block text-gray-700 hover:text-indigo-600 transition duration-300 ${
                  isActive("/dashboard") ? "text-indigo-600 font-semibold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-red-500 hover:text-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className={`block text-gray-700 hover:text-indigo-600 transition duration-300 ${
                    isActive("/login") ? "text-indigo-600 font-semibold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
