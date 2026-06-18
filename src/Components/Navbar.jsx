"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth সেশন রিড করা
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const userRole = session?.user?.role || "user"; // ডিফল্ট রোল 'user'

  const isActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Better Auth লগআউট মেথড
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  // রোল অনুযায়ী সঠিক ড্যাশবোর্ড পাথ ঠিক করা
  const getDashboardLink = () => {
    if (userRole === "admin") return "/dashboard/admin";
    if (userRole === "writer") return "/dashboard/writer";
    return "/dashboard/user";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* লোগো */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition duration-300"
          >
            Fable
          </Link>

          {/* ডেস্কটপ মেনু */}
          {!isPending && (
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

              {/* লগইন থাকলে ডাইনামিক ড্যাশবোর্ড লিংক */}
              {isLoggedIn && (
                <Link
                  href={getDashboardLink()}
                  className={`text-gray-700 hover:text-indigo-600 transition duration-300 ${
                    isActive("/dashboard")
                      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                      : ""
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {/* প্রোফাইল ড্রপডাউন বা লগইন/রেজিস্ট্রেশন বাটন */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 focus:outline-none cursor-pointer"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-9 h-9 rounded-full border-2 border-indigo-500"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                        {session.user.name
                          ? session.user.name[0].toUpperCase()
                          : "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {session.user.name?.split(" ")[0]}
                    </span>
                  </button>

                  {/* ড্রপডাউন মেনু */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 capitalize font-semibold">
                          {userRole}
                        </p>
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {session.user.name}
                        </p>
                      </div>
                      <Link
                        href={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
          )}

          {/* মোবাইল মেনু বাটন */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isMenuOpen && !isPending && (
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
                href={getDashboardLink()}
                className={`block text-gray-700 hover:text-indigo-600 transition duration-300 ${
                  isActive("/dashboard") ? "text-indigo-600 font-semibold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3 px-1">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500 hover:text-red-600 transition duration-300 cursor-pointer font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-100">
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
