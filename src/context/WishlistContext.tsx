"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Product } from "@/types";

interface WishlistContextType {
  wishlist: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lumiere_wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load wishlist from storage", e);
    } finally {
      isInitializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      localStorage.setItem("lumiere_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to persist wishlist to storage", e);
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      return exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some(p => p.id === productId),
    [wishlist]
  );

  const contextValue = useMemo<WishlistContextType>(
    () => ({
      wishlist,
      isInWishlist,
      toggleWishlist,
      count: wishlist.length,
    }),
    [wishlist, isInWishlist, toggleWishlist]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
