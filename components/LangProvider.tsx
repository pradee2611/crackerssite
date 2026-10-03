"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CATEGORY, DICT, LANGS, translateName, type Lang } from "@/lib/i18n";

type Vars = Record<string, string | number>;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string, vars?: Vars) => string; cat: (name: string) => string; name: (text: string) => string };

const LangCtx = createContext<Ctx | null>(null);
const KEY = "friends-crackers-lang-v1";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => {
    const t = (key: string, vars?: Vars) => {
      const s = DICT[lang][key] ?? DICT.en[key] ?? key;
      return vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? "")) : s;
    };
    const cat = (name: string) => CATEGORY[lang][name] ?? name;
    const name = (text: string) => translateName(lang, text);
    return { lang, setLang, t, cat, name };
  }, [lang, setLang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used inside LangProvider");
  return c;
}

/** Translated text for use inside server components. */
export function T({ k, vars }: { k: string; vars?: Vars }) {
  return <>{useLang().t(k, vars)}</>;
}
