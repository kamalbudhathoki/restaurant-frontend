"use client";

import { Order } from "@/types";
import Badge from "@/components/ui/Badge";
import StatusDropdown from "./StatusDropdown";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { OrderStatus } from "@/types";
import Link from "next/link";

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete?: (id: string) => void;
}

export default function OrderTable({
  orders,
  onStatusChange,
  onDelete,
}: OrderTableProps) {
  const { isAdmin } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Order #</th>
            <th className="px-4 py-3">Table</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created By</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">
                <Link
                  href={`/orders/${order._id}`}
                  className="hover:text-blue-600 hover:underline"
                >
                  {order.orderNumber}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-600">
                Table {order.tableNumber}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {order.items.length} item(s)
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <StatusDropdown
                  currentStatus={order.status}
                  orderId={order._id}
                  onStatusChange={onStatusChange}
                />
              </td>
              <td className="px-4 py-3 text-gray-500">
                {order.createdBy?.name}
              </td>
              <td className="px-4 py-3">
                {isAdmin && onDelete && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(order._id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}