import api from "@/lib/axios";
import { MenuItem } from "@/types";

interface CreateItemData {
  name: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold?: number;
}

export const fetchAllItems = async (): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>("/inventory");
  return response.data;
};

export const fetchLowStockItems = async (): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>("/inventory/low-stock");
  return response.data;
};

export const addMenuItem = async (
  data: CreateItemData
): Promise<MenuItem> => {
  const response = await api.post<MenuItem>("/inventory", data);
  return response.data;
};

export const updateMenuItem = async (
  id: string,
  data: Partial<CreateItemData & { isAvailable: boolean }>
): Promise<MenuItem> => {
  const response = await api.put<MenuItem>(`/inventory/${id}`, data);
  return response.data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await api.delete(`/inventory/${id}`);
};