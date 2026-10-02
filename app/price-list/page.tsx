import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "2026 Crackers Price List",
  description: "Download or view the full Friends Crackers 2026 Diwali pre-order price list for Sivakasi crackers in Coimbatore.",
  alternates: { canonical: "/price-list" },
};

export default function PriceList() {
  return (
    <section className="section wrap">
      <h1 className="title"><span>2026 price list</span></h1>
      <p className="note center">{SITE.notice}</p>
      <div className="cta center">
        <a className="btn" href="/price-list.pdf" download>Download PDF (print quality)</a>
        <a className="btn ghost" href="/price-list-mobile.pdf" download>Download PDF (mobile)</a>
      </div>
      <div className="pages">
        {Array.from({ length: 8 }, (_, i) => (
          <Image
            key={i}
            src={`/gallery/page-${i + 1}.jpg`}
            alt={`Price list page ${i + 1}`}
            width={1080}
            height={1528}
            sizes="(max-width: 900px) 100vw, 560px"
            loading={i < 2 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </section>
  );
}
