"use client";

import { useEffect, useState } from "react";
import { combos, customerLines, giftBoxes, inr, PACKING_CHARGE, waLink, type Combo } from "@/lib/site";
import CustomerForm from "./CustomerForm";
import { useCustomer } from "./CustomerProvider";
import { useLang } from "./LangProvider";

export default function Combos() {
  const { t, name: tr } = useLang();
  const { customer, ready } = useCustomer();
  const [sel, setSel] = useState<Combo | null>(null);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sel]);

  // The WhatsApp message stays in English so the shop can read every order.
  const message = (c: Combo) =>
    [
      `Hi Friends Crackers, I would like to pre-order the ${c.title} (${inr(c.price)}).`,
      "",
      "Items:",
      ...c.items.map((i, n) => `${n + 1}. ${i.name} x ${i.qty}`),
      `FREE: ${c.free}`,
      "",
      `Combo price: ${inr(c.price)}`,
      `Packing charge: ${inr(PACKING_CHARGE)}`,
      `Grand total: ${inr(c.price + PACKING_CHARGE)}`,
      "",
      ...customerLines(customer),
    ].join("\n");

  return (
    <section id="combos" className="section wrap">
      <h2 className="title"><span>{t("combo.title")}</span></h2>
      <div className="combos">
        {combos.map((c) => {
          return (
            <article className="combo" key={c.title}>
              <header className="combo-top">
                <h3>{tr(c.title)}</h3>
                <b className="combo-price">{inr(c.price)}</b>
                <span className="combo-free">🎁 {t("combo.free", { f: tr(c.free) })}</span>
              </header>
              <ol className="combo-items">
                {c.items.map((i, n) => (
                  <li key={n}>
                    <span className="ci">{n + 1}</span>
                    <span className="cn">{tr(i.name)}</span>
                    <span className="cq">× {tr(i.qty)}</span>
                  </li>
                ))}
              </ol>
              <footer className="combo-foot">
                <span>{t("combo.summary", { n: c.items.length, f: tr(c.free) })}</span>
                <button type="button" className="btn wa sm" onClick={() => setSel(c)}>{t("combo.order")}</button>
              </footer>
            </article>
          );
        })}
      </div>
      {sel && (
        <div className="modal-scrim" onClick={() => setSel(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={tr(sel.title)} onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{tr(sel.title)} · {inr(sel.price)}</h3>
              <button type="button" onClick={() => setSel(null)} aria-label={t("cart.close")}>✕</button>
            </div>
            <div className="modal-body">
              <CustomerForm idPrefix="combo" />
              <div className="modal-foot">
                <div className="total"><span>{t("cart.total")}</span><b>{inr(sel.price)}</b></div>
                <p className="note">{t("notice")}</p>
                <a
                  className={`btn wa ${ready ? "" : "disabled"}`}
                  href={ready ? waLink(message(sel)) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("cart.send")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="gift">
        <h3>🎁 {t("gift.title")}</h3>
        <ul>
          {giftBoxes.map((n) => (
            <li key={n}><b>{n}</b><span>{t("gift.items")}</span><small>{t("gift.box")}</small></li>
          ))}
        </ul>
        <p>
          {t("gift.only")}{" "}
          <a href={waLink(["Hi Friends Crackers, I would like details about gift boxes.", "", ...customerLines(customer)].join("\n"))} target="_blank" rel="noopener noreferrer">{t("gift.contact")}</a>
        </p>
      </div>
    </section>
  );
}
