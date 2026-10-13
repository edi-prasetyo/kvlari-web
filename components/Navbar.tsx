// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

type NavLink = { href: string; label: string };

const mainLinks: NavLink[] = [
  { href: "/", label: "Beranda" },
  { href: "/schedule", label: "Cek Jadwal" },
  { href: "/about-us", label: "Tentang Kami" },
];

const infoLinks: NavLink[] = [
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/term-of-service", label: "Syarat dan Ketentuan" },
  { href: "/delete-account", label: "Hapus Akun" },
];

const accountLinks: NavLink[] = [
  { href: "/profile", label: "Profile Saya" },
  { href: "/history", label: "Riwayat Booking" },
  { href: "/points", label: "Top Up Point" },
  { href: "/transaction", label: "Riwayat Transaksi" },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"info" | "user" | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Cek status login setiap kali route berubah + tutup semua menu
  useEffect(() => {
    const token = getCookie("access_token");
    const name = getCookie("user_name");
    setIsAuth(!!token);
    setUserName(typeof name === "string" ? name : "");
    setAuthChecked(true);
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Efek bayangan saat halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup dropdown saat klik di luar / tekan Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("user_name");
    setIsAuth(false);
    setUserName("");
    setOpenMenu(null);
    setMobileOpen(false);
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const desktopLinkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const mobileLinkClass = (href: string) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-blue-50 text-blue-700"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const dropdownItemClass = (href: string) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive(href)
        ? "bg-blue-50 font-medium text-blue-700"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const initial = (userName.trim()[0] || "A").toUpperCase();

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        ref={menuRef}
        aria-label="Navigasi utama"
      >
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-base font-bold text-white shadow-md shadow-blue-500/30 transition-transform group-hover:scale-105">
            K
          </span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Kvlari
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={desktopLinkClass(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Dropdown informasi */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "info" ? null : "info")}
              aria-expanded={openMenu === "info"}
              aria-haspopup="menu"
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                infoLinks.some((l) => isActive(l.href))
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Informasi
              <Chevron open={openMenu === "info"} />
            </button>

            {openMenu === "info" && (
              <div
                role="menu"
                className="absolute left-0 mt-3 w-60 origin-top-left rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-900/10 ring-1 ring-black/5"
              >
                {infoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className={dropdownItemClass(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-2 md:flex">
          {!authChecked ? (
            <div className="h-10 w-40" aria-hidden />
          ) : !isAuth ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Daftar
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === "user" ? null : "user")}
                aria-expanded={openMenu === "user"}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                  {initial}
                </span>
                <span className="max-w-[120px] truncate text-sm font-medium text-gray-700">
                  {userName || "Akun"}
                </span>
                <Chevron open={openMenu === "user"} />
              </button>

              {openMenu === "user" && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-900/10 ring-1 ring-black/5"
                >
                  <div className="mb-1 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white">
                      {initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {userName || "Akun"}
                      </p>
                      <p className="text-xs text-gray-500">Akun saya</p>
                    </div>
                  </div>

                  {accountLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={dropdownItemClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-gray-100" />
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h10"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu (animasi tinggi via grid rows) */}
      <div
        className={`grid transition-all duration-300 ease-out md:hidden ${
          mobileOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100vh-4rem)] space-y-1 overflow-y-auto border-t border-gray-100 bg-white px-4 pb-5 pt-3">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />
            <p className="px-4 pb-1 pt-2 text-xs font-medium text-gray-400">
              Informasi
            </p>
            {infoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100" />

            {!authChecked ? null : !isAuth ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-colors hover:bg-blue-700"
                >
                  Daftar
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {userName || "Akun"}
                    </p>
                    <p className="text-xs text-gray-500">Akun saya</p>
                  </div>
                </div>

                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={mobileLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
