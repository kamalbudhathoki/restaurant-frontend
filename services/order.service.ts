import api from "@/lib/axios";
import { Order, OrderStatus } from "@/types";

// Shape of data when creating a new order
interface CreateOrderData {
  tableNumber: number;
  items: { menuItemId: string; quantity: number }[];
  notes?: string;
}

export const fetchAllOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders");
  return response.data;
};

export const fetchOrderById = async (id: string): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await api.post<Order>("/orders", data);
  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order> => {
  const response = await api.put<Order>(`/orders/${id}/status`, { status });
  return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await api.delete(`/orders/${id}`);
};