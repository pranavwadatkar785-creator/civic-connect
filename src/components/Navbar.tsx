"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Landmark, Menu, PlusCircle, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenReportModal?: () => void;
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Browse Issues", href: "/issues" },
  { name: "Track Status", href: "/track" },
  { name: "About", href: "/about" },
];

export default function Navbar({
  setActiveTab = () => {},
  activeTab = "home",
  onOpenReportModal = () => {},
}: NavbarProps) {
  
  
  //onOpenReportModal = () => {},
  const router = useRouter();

const handleLogout = async () => {
  console.log("Logout clicked");

  try {
    await logout();

    console.log("Logout success");

    router.refresh();

  } catch (error) {
    console.error(
      "Logout failed:",
      error
    );
  }
};
 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleReportClick = () => {
    onOpenReportModal();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-9999 border-b border-slate-200 bg-white transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-md shadow-slate-200/70 backdrop-blur-md"
          : "shadow-sm shadow-slate-100/80"
      }`}
    >
      <nav
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => handleNavClick("Home")}
          className="flex min-w-0 items-center gap-3 rounded-xl py-2 text-left transition-colors duration-200 hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          aria-label="Go to Civic Connect home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#2563EB]">
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-base font-semibold leading-5 text-slate-950">
              Civic Connect
            </span>
            <span className="block truncate text-xs font-medium leading-4 text-slate-500">
              Community Reporting Platform
            </span>
          </span>
        </button>

        <div className="hidden items-center rounded-2xl gap-3 bg-slate-50 p-1 md:flex">
  {navItems.map((item) => {
    const isActive = activeTab === item.name;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none ${
          isActive
            ? "bg-[#bfbfbf] text-[#2563EB] shadow-sm ring-1 ring-slate-200"
            : "text-slate-600 hover:bg-[#a3a2a2] hover:text-slate-950"
        }`}
      >
        {item.name}
      </Link>
    );
  })}
</div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#2563EB]">
                {user?.userId}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-[#2563EB] shadow-sm transition-all duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Signup
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={handleReportClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Report Issue
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 md:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`grid overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
  const isActive = activeTab === item.name;

  return (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setMobileMenuOpen(false)}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200

      ${
        isActive
          ? "bg-blue-50 text-[#2563EB] ring-1 ring-blue-100"
          : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      <span>{item.name}</span>

      {isActive ? (
        <span
          className="h-2 w-2 rounded-full bg-[#2563EB]"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
})}

            <button
              type="button"
              onClick={handleReportClick}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 active:scale-[0.99]"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Report Issue
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {isAuthenticated ? (
                <>
                  <span className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-[#2563EB]">
                    {user?.userId}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-[#2563EB] shadow-sm transition-all duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
