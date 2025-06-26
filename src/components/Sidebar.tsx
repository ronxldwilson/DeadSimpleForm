"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/submissions",
    label: "Submissions",
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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Collapse/Expand Button - always visible at the top */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-zinc-800 relative">
        <span className={`text-lg font-bold text-white tracking-tight transition-all duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>DeadSimpleForm</span>
        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-zinc-800 text-zinc-400 transition-colors ${collapsed ? "w-12 h-12 flex items-center justify-center" : ""}`}
          style={{ zIndex: 10 }}
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-2 rounded-lg mx-2 transition-colors text-sm font-medium
                ${active ? "bg-zinc-800 text-blue-400" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                ${collapsed ? "justify-center" : "gap-3"}
              `}
            >
              <span className="flex-shrink-0 flex items-center justify-center">
                <Icon size={20} />
              </span>
              <span className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"}`}>{label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Logout Button at the bottom */}
      <form action="/logout" method="post" className="mt-auto mb-4 px-2">
        <button
          type="submit"
          className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800
            ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <span className="flex-shrink-0 flex items-center justify-center">
            <LogOut size={20} />
          </span>
          <span className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${collapsed ? "max-w-0 opacity-0" : "max-w-full opacity-100"}`}>Logout</span>
        </button>
      </form>
    </aside>
  );
} 