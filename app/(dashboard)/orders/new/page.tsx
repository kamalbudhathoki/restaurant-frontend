import OrderForm from "@/components/orders/OrderForm";
import Link from "next/link";

export default function NewOrderPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/orders"
          className="text-sm text-blue-600 hover:underline mb-2 inline-block"
        >
          ← Back to Orders
        </Link>
        <h1 className="text-xl font-bold text-gray-900">New Order</h1>
      </div>
      <OrderForm />
    </div>
  );
}