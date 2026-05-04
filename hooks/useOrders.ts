"use client";

import { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/types";
import {
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "@/services/order.service";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load orders";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (id: string, status: OrderStatus) => {
    try {
      const updated = await updateOrderStatus(id, status);
      // Update the order in local state without re-fetching
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? updated : o))
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update status";
      setError(message);
    }
  };

  const removeOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete order";
      setError(message);
    }
  };

  return { orders, loading, error, changeStatus, removeOrder, refetch: loadOrders };
}