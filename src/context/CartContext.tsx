"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: CartItem) => Promise<{ success: boolean; error?: string }>;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => Promise<{ success: boolean; error?: string }>;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  reservationId?: string;
  reservationExpiresAt?: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [reservationId, setReservationId] = useState<string | undefined>();
  const [reservationExpiresAt, setReservationExpiresAt] = useState<string | undefined>();

  // Initialize unique session ID and load persisted cart
  useEffect(() => {
    let sid = localStorage.getItem("lumiere_session_id");
    if (!sid) {
      sid = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("lumiere_session_id", sid);
    }
    setSessionId(sid);

    try {
      const savedCart = localStorage.getItem("lumiere_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse cart from storage", e);
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lumiere_cart", JSON.stringify(items));
    }
  }, [items]);

  const addItem = async (newItem: CartItem): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Attempt atomic reservation with backend
      const res = await fetch("/api/inventory/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          variantId: newItem.variant_id,
          quantity: newItem.quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Item is currently out of stock." };
      }

      setReservationId(data.reservationId);
      setReservationExpiresAt(data.expiresAt);

      // 2. Add or update item in cart
      setItems(prev => {
        const existingIndex = prev.findIndex(i => i.variant_id === newItem.variant_id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += newItem.quantity;
          return updated;
        }
        return [...prev, newItem];
      });

      setIsOpen(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: "Network error checking variant availability." };
    }
  };

  const removeItem = (variantId: string) => {
    setItems(prev => prev.filter(i => i.variant_id !== variantId));
  };

  const updateQuantity = async (variantId: string, quantity: number): Promise<{ success: boolean; error?: string }> => {
    if (quantity <= 0) {
      removeItem(variantId);
      return { success: true };
    }

    setItems(prev =>
      prev.map(item => (item.variant_id === variantId ? { ...item, quantity } : item))
    );
    return { success: true };
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("lumiere_cart");
    }
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        reservationId,
        reservationExpiresAt,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
