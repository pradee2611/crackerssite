"use client";

import Image from "next/image";
import { inr, PACKING_CHARGE, products, waLink } from "@/lib/site";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

export default function CartDrawer() {
  const { cart, total, count, open, setOpen, setQty, clear } = useCart();
  const { t, name: tr } = useLang();
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ p: products.find((x) => x.id === Number(id))!, qty }))
    .filter((l) => l.p);

  function message() {
    const rows = lines.map(
      (l, i) => `${i + 1}. ${l.p.name}${l.p.variant ? " " + l.p.variant : ""} x ${l.qty} = ${inr(l.p.price * l.qty)}`
    );
    return [
      "Hi Friends Crackers, I would like to pre-order:",
      "",
      ...rows,
      "",
      `Items total: ${inr(total)}`,
      `Packing charge: ${inr(PACKING_CHARGE)}`,
      `Grand total: ${inr(total + PACKING_CHARGE)}`,
      "",
      "Name:",
      "Delivery / Pickup:",
    ].join("\n");
  }

  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Cart">
        <div className="drawer-head">
          <h2>{t("cart.title", { n: count })}</h2>
          <button onClick={() => setOpen(false)} aria-label={t("cart.close")}>✕</button>
        </div>

        {lines.length === 0 ? (
          <p className="empty">{t("cart.empty")}</p>
        ) : (
          <ul className="lines">
            {lines.map(({ p, qty }) => (
              <li key={p.id}>
                <Image src={p.image} alt="" width={56} height={56} />
                <div className="ln-info">
                  <b>{tr(p.name)}</b>
                  {p.variant && <small>{tr(p.variant)}</small>}
                  <span>{t("cart.each", { p: inr(p.price) })}</span>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(p.id, qty - 1)} aria-label={t("qty.dec")}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label={t("qty.inc")}>+</button>
                </div>
                <b className="ln-total">{inr(p.price * qty)}</b>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-foot">
          <div className="total"><span>{t("cart.total")}</span><b>{inr(total)}</b></div>
          <p className="note">{t("notice")}</p>
          <a
            className={`btn wa ${lines.length === 0 ? "disabled" : ""}`}
            href={lines.length ? waLink(message()) : undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cart.send")}
          </a>
          {lines.length > 0 && (
            <button className="link" onClick={clear}>{t("cart.clear")}</button>
          )}
        </div>
      </aside>
    </>
  );
}
