"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/site";

type Cart = Record<number, number>;

type Ctx = {
  cart: Cart;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  setQty: (id: number, qty: number) => void;
  add: (id: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "friends-crackers-cart-v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, ready]);

  const setQty = useCallback((id: number, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 999);
      return next;
    });
  }, []);

  const add = useCallback((id: number) => setCart((c) => ({ ...c, [id]: Math.min((c[id] ?? 0) + 1, 999) })), []);
  const clear = useCallback(() => setCart({}), []);

  const value = useMemo<Ctx>(() => {
    let count = 0;
    let total = 0;
    for (const [id, q] of Object.entries(cart)) {
      const p = products.find((x) => x.id === Number(id));
      if (!p) continue;
      count += q;
      total += p.price * q;
    }
    return { cart, count, total, open, setOpen, setQty, add, clear };
  }, [cart, open, setQty, add, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
