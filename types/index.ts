// All shared TypeScript types used across the frontend
// These mirror exactly what the backend sends back

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  token: string;
}

export interface OrderItem {
  menuItem: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "served"
  | "cancelled";

export interface Order {
  _id: string;
  orderNumber: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  notes?: string;
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  isAvailable: boolean;
  lowStockAlert?: boolean;
}

export interface AnalyticsSummary {
  totalOrders: number;
  totalRevenue: number;
  topSellingItems: {
    itemName: string;
    totalQuantity: number;
    totalRevenue: number;
  }[];
  ordersByStatus: {
    _id: string;
    count: number;
  }[];
}

export interface DailyRevenue {
  _id: string; // date string "2024-01-01"
  revenue: number;
  orders: number;
}