"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
  const { count, setOpen } = useCart();
  const { t } = useLang();
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
        <nav className="nav" aria-label={t("nav.aria")}>
          <Link href="/#shop">{t("nav.shop")}</Link>
          <Link href="/#combos">{t("nav.combos")}</Link>
          <Link href="/price-list">{t("nav.price")}</Link>
          <Link href="/#contact">{t("nav.contact")}</Link>
        </nav>
        <LangSwitcher />
        <button className="cart-btn" onClick={() => setOpen(true)} aria-label={t("cart.open", { n: count })}>
          🛒 {t("cart.btn")} <span className="badge">{count}</span>
        </button>
      </div>
    </header>
  );
}
