import { OrderStatus } from "@/types";

interface BadgeProps {
  status: OrderStatus;
}

// Maps each order status to a Tailwind color class
const statusStyles: Record<OrderStatus, string> = {
  pending:   "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  ready:     "bg-green-100 text-green-800",
  served:    "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
};

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}