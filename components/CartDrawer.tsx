"use client";

import Image from "next/image";
import { inr, products, SITE, waLink } from "@/lib/site";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { cart, total, count, open, setOpen, setQty, clear } = useCart();
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
      `Total: ${inr(total)} (before packing charges)`,
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
          <h2>Your order ({count})</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart">✕</button>
        </div>

        {lines.length === 0 ? (
          <p className="empty">Your cart is empty. Add crackers from the shop and send your order on WhatsApp.</p>
        ) : (
          <ul className="lines">
            {lines.map(({ p, qty }) => (
              <li key={p.id}>
                <Image src={p.image} alt="" width={56} height={56} />
                <div className="ln-info">
                  <b>{p.name}</b>
                  {p.variant && <small>{p.variant}</small>}
                  <span>{inr(p.price)} each</span>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase">+</button>
                </div>
                <b className="ln-total">{inr(p.price * qty)}</b>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-foot">
          <div className="total"><span>Total</span><b>{inr(total)}</b></div>
          <p className="note">{SITE.notice}</p>
          <a
            className={`btn wa ${lines.length === 0 ? "disabled" : ""}`}
            href={lines.length ? waLink(message()) : undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send order on WhatsApp
          </a>
          {lines.length > 0 && (
            <button className="link" onClick={clear}>Clear cart</button>
          )}
        </div>
      </aside>
    </>
  );
}
