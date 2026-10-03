"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="header">
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="Friends Crackers home">
          <span className="brand-mk">MK</span>
          <span>
            <b>FRIENDS</b> <i>CRACKERS</i>
            <small>{SITE.tamil}</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#shop">Shop</Link>
          <Link href="/#combos">Combos</Link>
          <Link href="/price-list">Price list</Link>
          <Link href="/#offers">Offers</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          🛒 Cart <span className="badge">{count}</span>
        </button>
      </div>
    </header>
  );
}
