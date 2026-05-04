"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div /> {/* spacer */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          Welcome, <span className="font-medium text-gray-800">{user?.name}</span>
        </span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize font-medium">
          {user?.role}
        </span>
      </div>
    </header>
  );
}