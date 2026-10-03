"use client";

import { combos, giftBoxes, inr, waLink } from "@/lib/site";
import { useLang } from "./LangProvider";

export default function Combos() {
  const { t, name: tr } = useLang();
  return (
    <section id="combos" className="section wrap">
      <h2 className="title"><span>{t("combo.title")}</span></h2>
      <div className="combos">
        {combos.map((c) => {
          const worth = c.items.reduce((sum, i) => sum + i.price, 0);
          // The WhatsApp message stays in English so the shop can read every order.
          const msg = `Hi Friends Crackers, I would like to pre-order the ${c.title} (${inr(c.price)}, ${c.free} FREE).\n\nName:\nDelivery / Pickup:`;
          return (
            <article className="combo" key={c.title}>
              <header className="combo-top">
                <h3>{c.title}</h3>
                <b className="combo-price">{inr(c.price)}</b>
                <span className="combo-free">🎁 {t("combo.free", { f: c.free })}</span>
              </header>
              <ol className="combo-items">
                {c.items.map((i, n) => (
                  <li key={n}>
                    <span className="ci">{n + 1}</span>
                    <span className="cn">{tr(i.name)}</span>
                    {i.qty && <span className="cq">{tr(i.qty)}</span>}
                    <span className="cv">{inr(i.price)}</span>
                  </li>
                ))}
              </ol>
              <footer className="combo-foot">
                <span>{t("combo.summary", { n: c.items.length, w: inr(worth), f: c.free })}</span>
                <a className="btn wa sm" href={waLink(msg)} target="_blank" rel="noopener noreferrer">{t("combo.order")}</a>
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
          <a href={waLink("Hi Friends Crackers, I would like details about gift boxes.")} target="_blank" rel="noopener noreferrer">{t("gift.contact")}</a>
        </p>
      </div>
    </section>
  );
}
