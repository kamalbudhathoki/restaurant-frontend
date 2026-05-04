import { MenuItem } from "@/types";

interface LowStockAlertProps {
  items: MenuItem[];
}

export default function LowStockAlert({ items }: LowStockAlertProps) {
  const lowStockItems = items.filter((i) => i.lowStockAlert);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <p className="text-sm font-semibold text-red-700 mb-2">
        ⚠ Low Stock Alert — {lowStockItems.length} item(s) need restocking
      </p>
      <ul className="space-y-1">
        {lowStockItems.map((item) => (
          <li key={item._id} className="text-sm text-red-600">
            {item.name} — only{" "}
            <span className="font-bold">{item.stock}</span> left (threshold:{" "}
            {item.lowStockThreshold})
          </li>
        ))}
      </ul>
    </div>
  );
}