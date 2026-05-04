"use client";

import { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  confirmLabel?: string;
  confirmVariant?: "primary" | "danger";
  isLoading?: boolean;
}

export default function Modal({
  isOpen,
  title,
  children,
  onConfirm,
  onClose,
  confirmLabel = "Confirm",
  confirmVariant = "primary",
  isLoading = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* Stop click from propagating through the card */}
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
        <div className="text-sm text-gray-600 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}