"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { EMPTY_CUSTOMER, customerReady, type Customer } from "@/lib/site";

type Ctx = { customer: Customer; ready: boolean; setField: (k: keyof Customer, v: string) => void };

const CustomerCtx = createContext<Ctx | null>(null);
const KEY = "friends-crackers-customer-v1";

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setCustomer({ ...EMPTY_CUSTOMER, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(customer));
    } catch {}
  }, [customer, loaded]);

  const setField = useCallback((k: keyof Customer, v: string) => setCustomer((c) => ({ ...c, [k]: v })), []);

  const value = useMemo<Ctx>(() => ({ customer, ready: customerReady(customer), setField }), [customer, setField]);
  return <CustomerCtx.Provider value={value}>{children}</CustomerCtx.Provider>;
}

export function useCustomer() {
  const c = useContext(CustomerCtx);
  if (!c) throw new Error("useCustomer must be used inside CustomerProvider");
  return c;
}
