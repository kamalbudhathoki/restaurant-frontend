"use client";

import { MenuItem } from "@/types";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

interface InventoryTableProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export default function InventoryTable({
  items,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const { isAdmin } = useAuth();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Status</th>
            {isAdmin && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">
                {item.name}
              </td>
              <td className="px-4 py-3 text-gray-500">{item.category}</td>
              <td className="px-4 py-3 text-gray-700">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`font-semibold ${
                    item.lowStockAlert ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {item.stock}
                </span>
              </td>
              <td className="px-4 py-3">
                {item.lowStockAlert ? (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                    Low stock
                  </span>
                ) : (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    OK
                  </span>
                )}
              </td>
              {isAdmin && (
                <td className="px-4 py-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}