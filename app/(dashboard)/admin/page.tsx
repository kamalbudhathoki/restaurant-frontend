"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminPage() {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <p className="text-center text-gray-500 py-10">Loading admin panel...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-3 text-gray-500">
          You do not have permission to view this page. Please return to the dashboard.
        </p>
        <Link href="/orders" className="inline-block mt-6 text-blue-600 hover:underline">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-sm text-gray-500">Manage users, settings, and high-level system controls.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          <p className="mt-2 text-sm text-gray-500">Invite staff and review permissions.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">System Settings</h2>
          <p className="mt-2 text-sm text-gray-500">Configure business policies and notifications.</p>
        </div>
      </div>
    </div>
  );
}
