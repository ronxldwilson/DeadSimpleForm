"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useLogout } from '@/utils/useLogout'

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/analytics",
    label: "Anlytics",
    icon: FileText,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = useLogout();
  return (
    <>
      {/* Hamburger always visible at top left, but hidden when menu is open */}
      {!open && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded bg-zinc-900 text-zinc-100 shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}
      {/* Overlay Sidebar (drawer style) */}
      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div className="flex items-center justify-between px-4 py-5 border-b border-zinc-800 relative">
              <span className="text-lg font-bold text-white tracking-tight">DeadSimpleForm</span>
              <button
                className="p-2 rounded hover:bg-zinc-800 text-zinc-400"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-2 mt-4">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg mx-2 transition-colors text-sm font-medium
                      ${active ? "bg-zinc-800 text-blue-400" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                    `}
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center">
                      <Icon size={20} />
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={logout}
              className="flex items-center w-full gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
            >
              <span className="flex-shrink-0 flex items-center justify-center">
                <LogOut size={20} />
              </span>
              <span>Logout</span>
            </button>

          </aside>
        </div>
      )}
    </>
  );
}
