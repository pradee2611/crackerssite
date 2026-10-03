import Image from "next/image";
import Link from "next/link";
import Catalogue from "@/components/Catalogue";
import Combos from "@/components/Combos";
import { products, categories, SITE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-row">
          <div className="hero-copy">
            <span className="pill">2026 PRE-ORDER · DIWALI</span>
            <h1>
              Sivakasi crackers,<br />
              <em>straight to your Diwali.</em>
            </h1>
            <p>
              {products.length} crackers across {categories.length} categories. Wholesale &amp; retail, bulk orders welcome,
              delivery available around Coimbatore.
            </p>
            <div className="cta">
              <Link className="btn" href="/#shop">Shop now</Link>
              <Link className="btn ghost" href="/#combos">Combo offers</Link>
              <a className="btn ghost" href="/price-list.pdf" target="_blank" rel="noopener noreferrer">Download price list</a>
            </div>
            <ul className="trust">
              <li>✔ Best quality</li>
              <li>✔ Wholesale &amp; retail</li>
              <li>✔ Delivery available</li>
            </ul>
          </div>
          <div className="hero-img">
            <Image src="/banner.jpg" alt="Friends Crackers shop banner" width={1400} height={933} priority sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <Catalogue />

      <Combos />


      <section className="section wrap how">
        <h2 className="title"><span>How to order</span></h2>
        <ol>
          <li><b>1. Pick</b><span>Add crackers to your cart from the shop.</span></li>
          <li><b>2. Send</b><span>Tap “Send order on WhatsApp”. Your list is filled in for you.</span></li>
          <li><b>3. Confirm</b><span>We confirm stock, packing and delivery on WhatsApp or call.</span></li>
        </ol>
        <p className="note center">{SITE.notice}</p>
      </section>
    </>
  );
}
