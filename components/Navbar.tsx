// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // Cek apakah user sedang login setiap kali route berubah
  useEffect(() => {
    const token = getCookie("access_token");
    setIsAuth(!!token);
  }, [pathname]);

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setIsAuth(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MyApp
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              Beranda
            </Link>

            {isAuth && (
              <Link
                href="/profile"
                className={`${pathname === "/profile" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
              >
                Profile Saya
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 text-sm">
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition shadow-sm"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-600 hover:text-blue-600 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
          >
            Beranda
          </Link>

          {isAuth && (
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
            >
              Profile Saya
            </Link>
          )}

          <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
            {isAuth ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-center bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md font-medium"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-blue-600 text-white px-3 py-2 rounded-md font-medium hover:bg-blue-700"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
