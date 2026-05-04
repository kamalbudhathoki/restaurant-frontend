"use client";

import { useState } from "react";
import { useInventory } from "@/hooks/useInventory";
import { useAuth } from "@/context/AuthContext";
import { MenuItem } from "@/types";
import { addMenuItem } from "@/services/inventory.service";
import LowStockAlert from "@/components/inventory/LowStockAlert";
import InventoryTable from "@/components/inventory/InventoryTable";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function InventoryPage() {
  const { items, loading, error, editItem, removeItem, refetch } = useInventory();
  const { isAdmin } = useAuth();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<MenuItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state for add/edit
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    lowStockThreshold: "10",
  });

  const resetForm = () =>
    setForm({ name: "", category: "", price: "", stock: "", lowStockThreshold: "10" });

  const openEdit = (item: MenuItem) => {
    setEditTarget(item);
    setForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      stock: String(item.stock),
      lowStockThreshold: String(item.lowStockThreshold),
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editTarget) {
        await editItem(editTarget._id, {
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          lowStockThreshold: Number(form.lowStockThreshold),
        });
        setEditTarget(null);
      } else {
        await addMenuItem({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          lowStockThreshold: Number(form.lowStockThreshold),
        });
        setShowAddModal(false);
        refetch();
      }
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await removeItem(deleteId);
    setDeleteId(null);
  };

  if (loading) return <p className="text-center text-gray-500 py-10">Loading inventory...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  const ItemForm = (
    <div className="space-y-3 mt-2">
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <Input label="Price ($)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
      <Input label="Low stock threshold" type="number" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: e.target.value })} />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">{items.length} items</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowAddModal(true)}>+ Add Item</Button>
        )}
      </div>

      <LowStockAlert items={items} />
      <InventoryTable items={items} onEdit={openEdit} onDelete={setDeleteId} />

      {/* Add modal */}
      <Modal isOpen={showAddModal} title="Add Menu Item" onConfirm={handleSave} onClose={() => { setShowAddModal(false); resetForm(); }} confirmLabel="Add Item" isLoading={saving}>
        {ItemForm}
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={!!editTarget} title="Edit Menu Item" onConfirm={handleSave} onClose={() => { setEditTarget(null); resetForm(); }} confirmLabel="Save Changes" isLoading={saving}>
        {ItemForm}
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!deleteId} title="Delete Item" confirmLabel="Delete" confirmVariant="danger" onConfirm={handleDelete} onClose={() => setDeleteId(null)}>
        Are you sure you want to delete this item?
      </Modal>
    </div>
  );
}