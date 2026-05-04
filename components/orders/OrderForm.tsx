"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/types";
import { fetchAllItems } from "@/services/inventory.service";
import { createOrder } from "@/services/order.service";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    { menuItemId: string; quantity: number; name: string; price: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load available menu items when the form mounts
  useEffect(() => {
    fetchAllItems().then((items) =>
      setMenuItems(items.filter((i) => i.isAvailable))
    );
  }, []);

  const addItem = (item: MenuItem) => {
    // If already in the list, increment quantity
    const exists = selectedItems.find((s) => s.menuItemId === item._id);
    if (exists) {
      setSelectedItems((prev) =>
        prev.map((s) =>
          s.menuItemId === item._id
            ? { ...s, quantity: s.quantity + 1 }
            : s
        )
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { menuItemId: item._id, quantity: 1, name: item.name, price: item.price },
      ]);
    }
  };

  const removeItem = (menuItemId: string) => {
    setSelectedItems((prev) => prev.filter((s) => s.menuItemId !== menuItemId));
  };

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    if (!tableNumber || selectedItems.length === 0) {
      setError("Please enter a table number and add at least one item.");
      return;
    }
    try {
      setLoading(true);
      await createOrder({
        tableNumber: Number(tableNumber),
        items: selectedItems.map(({ menuItemId, quantity }) => ({
          menuItemId,
          quantity,
        })),
        notes,
      });
      router.push("/orders");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create order";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Menu items to pick from */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Menu Items
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => (
            <button
              key={item._id}
              onClick={() => addItem(item)}
              className="p-3 rounded-xl border border-gray-200 text-left hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <p className="font-medium text-sm text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                ${item.price.toFixed(2)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Order summary */}
      <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-gray-800">Order Summary</h2>

        <Input
          label="Table Number"
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="e.g. 5"
          min={1}
        />

        {selectedItems.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Click items from the menu to add them
          </p>
        ) : (
          <ul className="space-y-2">
            {selectedItems.map((item) => (
              <li
                key={item.menuItemId}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.menuItemId)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-800">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <Input
          label="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Allergies, special requests..."
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleSubmit} isLoading={loading} size="lg">
          Place Order
        </Button>
      </div>
    </div>
  );
}