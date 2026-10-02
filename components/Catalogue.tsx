"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, inr, products } from "@/lib/site";
import { useCart } from "./CartProvider";

type Sort = "default" | "low" | "high";

export default function Catalogue() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const { cart, add, setQty } = useCart();

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let l = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term || `${p.name} ${p.variant} ${p.category}`.toLowerCase().includes(term))
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, q, sort]);

  return (
    <section id="shop" className="section wrap">
      <h2 className="title"><span>Shop crackers</span></h2>

      <div className="tools">
        <input
          type="search"
          placeholder="Search crackers…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search crackers"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
          <option value="default">Sort: Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <div className="chips" role="tablist" aria-label="Categories">
        {["All", ...categories].map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "chip on" : "chip"} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <p className="count">{list.length} item{list.length === 1 ? "" : "s"}</p>

      {list.length === 0 ? (
        <p className="empty">No crackers match your search.</p>
      ) : (
        <div className="grid">
          {list.map((p, i) => {
            const qty = cart[p.id] ?? 0;
            return (
              <article className="card" key={p.id}>
                <div className="pic">
                  <Image
                    src={p.image}
                    alt={`${p.name} ${p.variant}`.trim()}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw"
                    priority={i < 4}
                  />
                  <span className="no">#{p.id}</span>
                </div>
                <div className="info">
                  <small className="cat">{p.category}</small>
                  <h3>{p.name}</h3>
                  {p.variant && <span className="variant">{p.variant}</span>}
                  <div className="buy">
                    <b className="price">{inr(p.price)}</b>
                    {qty === 0 ? (
                      <button className="btn sm" onClick={() => add(p.id)}>Add</button>
                    ) : (
                      <div className="qty">
                        <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease">−</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
