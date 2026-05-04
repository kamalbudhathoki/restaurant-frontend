"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Orders",    href: "/orders" },
  { label: "Inventory", href: "/inventory" },
  { label: "Analytics", href: "/analytics", adminOnly: true },
  { label: "Admin",     href: "/admin",     adminOnly: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-700">
        <h1 className="text-lg font-bold text-white">RestaurantOS</h1>
        <p className="text-xs text-gray-400 mt-0.5 capitalize">{user?.role}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          // Hide admin-only links from staff
          if (item.adminOnly && !isAdmin) return null;

          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 truncate">{user?.name}</p>
        <button
          onClick={logout}
          className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}