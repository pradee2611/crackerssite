"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, familyOrder, inr, products, type Product } from "@/lib/site";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

type Sort = "default" | "low" | "high";

export default function Catalogue() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const { cart, add, setQty } = useCart();
  const { t, cat: catLabel, name: tr } = useLang();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term || `${p.name} ${p.variant} ${p.category}`.toLowerCase().includes(term))
    );
  }, [cat, q]);

  // One block per category: heading first, then its crackers. Related items stay side by side.
  const groups = useMemo(() => {
    return categories
      .map((c) => {
        let items: Product[] = list.filter((p) => p.category === c);
        if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
        else if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
        else items = familyOrder(items);
        return { c, items };
      })
      .filter((g) => g.items.length > 0);
  }, [list, sort]);

  return (
    <section id="shop" className="section wrap">
      <h2 className="title"><span>{t("shop.title")}</span></h2>

      <div className="tools">
        <input
          type="search"
          placeholder={t("shop.search")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={t("shop.search")}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label={t("shop.sortAria")}>
          <option value="default">{t("shop.sortFeatured")}</option>
          <option value="low">{t("shop.sortLow")}</option>
          <option value="high">{t("shop.sortHigh")}</option>
        </select>
      </div>

      <div className="chips" role="tablist" aria-label={t("shop.cats")}>
        {["All", ...categories].map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "chip on" : "chip"} onClick={() => setCat(c)}>
            {c === "All" ? t("shop.all") : catLabel(c)}
          </button>
        ))}
      </div>

      <p className="count">{list.length === 1 ? t("shop.item") : t("shop.items", { n: list.length })}</p>

      {list.length === 0 ? (
        <p className="empty">{t("shop.none")}</p>
      ) : (
        groups.map((g, gi) => (
        <div className="cat-block" key={g.c} id={`cat-${gi}`}>
          <h3 className="cat-head">
            <span>{catLabel(g.c)}</span>
            <small>{g.items.length}</small>
          </h3>
        <div className="grid">
          {g.items.map((p, i) => {
            const qty = cart[p.id] ?? 0;
            return (
              <article className="card" key={p.id}>
                <div className="pic">
                  <Image
                    src={p.image}
                    alt={`${tr(p.name)} ${tr(p.variant)}`.trim()}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw"
                    priority={gi === 0 && i < 4}
                  />
                  <span className="no">#{p.id}</span>
                </div>
                <div className="info">
                  <h3>{tr(p.name)}</h3>
                  {p.variant && <span className="variant">{tr(p.variant)}</span>}
                  <div className="buy">
                    <b className="price">{inr(p.price)}</b>
                    {qty === 0 ? (
                      <button className="btn sm" onClick={() => add(p.id)}>{t("shop.add")}</button>
                    ) : (
                      <div className="qty">
                        <button onClick={() => setQty(p.id, qty - 1)} aria-label={t("qty.dec")}>−</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(p.id, qty + 1)} aria-label={t("qty.inc")}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        </div>
        ))
      )}
    </section>
  );
}
