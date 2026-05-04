"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/types";
import {
  fetchAllItems,
  updateMenuItem,
  deleteMenuItem,
} from "@/services/inventory.service";

export function useInventory() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchAllItems();
      setItems(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load inventory";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const editItem = async (
    id: string,
    data: Partial<MenuItem>
  ) => {
    try {
      const updated = await updateMenuItem(id, data);
      setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update item";
      setError(message);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete item";
      setError(message);
    }
  };

  // Count how many items are low on stock
  const lowStockCount = items.filter((i) => i.lowStockAlert).length;

  return { items, loading, error, editItem, removeItem, lowStockCount, refetch: loadItems };
}