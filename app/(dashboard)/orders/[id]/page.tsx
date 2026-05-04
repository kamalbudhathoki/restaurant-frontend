"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order } from "@/types";
import { fetchOrderById } from "@/services/order.service";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderById(id).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 py-10">Loading...</p>;
  if (!order)
    return <p className="text-center text-red-500 py-10">Order not found.</p>;

  return (
    <div className="max-w-2xl">
      <Link
        href="/orders"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-gray-500">
              Table {order.tableNumber} · {order.createdBy?.name}
            </p>
          </div>
          <Badge status={order.status} />
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="text-xs text-gray-500 uppercase border-b">
              <th className="pb-2 text-left">Item</th>
              <th className="pb-2 text-right">Qty</th>
              <th className="pb-2 text-right">Price</th>
              <th className="pb-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="py-2 text-gray-800">{item.name}</td>
                <td className="py-2 text-right text-gray-500">{item.quantity}</td>
                <td className="py-2 text-right text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-2 text-right font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between font-semibold text-gray-900 border-t pt-3">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>

        {order.notes && (
          <p className="mt-4 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
            Note: {order.notes}
          </p>
        )}
      </div>
    </div>
  );
}