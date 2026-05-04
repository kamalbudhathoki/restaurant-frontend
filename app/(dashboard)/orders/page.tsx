"use client";

import Link from "next/link";
import { useOrders } from "@/hooks/useOrders";
import OrderTable from "@/components/orders/OrderTable";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function OrdersPage() {
  const { orders, loading, error, changeStatus, removeOrder } = useOrders();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await removeOrder(deleteId);
    setDeleting(false);
    setDeleteId(null);
  };

  if (loading)
    return <p className="text-center text-gray-500 py-10">Loading orders...</p>;
  if (error)
    return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total orders</p>
        </div>
        <Link href="/orders/new">
          <Button>+ New Order</Button>
        </Link>
      </div>

      <OrderTable
        orders={orders}
        onStatusChange={changeStatus}
        onDelete={(id) => setDeleteId(id)}
      />

      <Modal
        isOpen={!!deleteId}
        title="Delete Order"
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
        isLoading={deleting}
      >
        Are you sure you want to delete this order? This cannot be undone.
      </Modal>
    </div>
  );
}