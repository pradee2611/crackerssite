"use client";

import { LANGS } from "@/lib/i18n";
import { useLang } from "./LangProvider";

export default function LangSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t("lang.label")}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={lang === l.code ? "on" : ""}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          lang={l.code}
          title={l.name}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
