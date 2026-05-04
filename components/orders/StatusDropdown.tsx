"use client";

import { OrderStatus } from "@/types";

interface StatusDropdownProps {
  currentStatus: OrderStatus;
  orderId: string;
  onStatusChange: (id: string, status: OrderStatus) => void;
}

const statuses: OrderStatus[] = [
  "pending",
  "preparing",
  "ready",
  "served",
  "cancelled",
];

export default function StatusDropdown({
  currentStatus,
  orderId,
  onStatusChange,
}: StatusDropdownProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) =>
        onStatusChange(orderId, e.target.value as OrderStatus)
      }
      className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white capitalize"
    >
      {statuses.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}