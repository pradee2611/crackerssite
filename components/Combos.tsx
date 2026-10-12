"use client";

import { combos, customerLines, giftBoxes, inr, PACKING_CHARGE, waLink } from "@/lib/site";
import CustomerForm from "./CustomerForm";
import { useCustomer } from "./CustomerProvider";
import { useLang } from "./LangProvider";

export default function Combos() {
  const { t, name: tr } = useLang();
  const { customer, ready } = useCustomer();
  return (
    <section id="combos" className="section wrap">
      <h2 className="title"><span>{t("combo.title")}</span></h2>
      <div className="combo-cust"><CustomerForm idPrefix="combo" /></div>
      <div className="combos">
        {combos.map((c) => {
          // The WhatsApp message stays in English so the shop can read every order.
          const msg = [
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
                <a className={`btn wa sm ${ready ? "" : "disabled"}`} href={ready ? waLink(msg) : undefined} target="_blank" rel="noopener noreferrer">{t("combo.order")}</a>
              </footer>
            </article>
          );
        })}
      </div>
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
