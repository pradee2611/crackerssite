import Image from "next/image";
import Link from "next/link";
import Catalogue from "@/components/Catalogue";
import Combos from "@/components/Combos";
import { T } from "@/components/LangProvider";
import { products, categories } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-row">
          <div className="hero-copy">
            <span className="pill"><T k="hero.pill" /></span>
            <h1>
              <T k="hero.h1a" /><br />
              <em><T k="hero.h1b" /></em>
            </h1>
            <p>
              <T k="hero.desc" vars={{ n: products.length, c: categories.length }} />
            </p>
            <div className="cta">
              <Link className="btn" href="/#shop"><T k="hero.shop" /></Link>
              <Link className="btn ghost" href="/#combos"><T k="hero.combos" /></Link>
              <a className="btn ghost" href="/price-list.pdf" target="_blank" rel="noopener noreferrer"><T k="hero.download" /></a>
            </div>
            <ul className="trust">
              <li><T k="hero.t1" /></li>
              <li><T k="hero.t2" /></li>
              <li><T k="hero.t3" /></li>
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
        <h2 className="title"><span><T k="how.title" /></span></h2>
        <ol>
          <li><b><T k="how.1t" /></b><span><T k="how.1d" /></span></li>
          <li><b><T k="how.2t" /></b><span><T k="how.2d" /></span></li>
          <li><b><T k="how.3t" /></b><span><T k="how.3d" /></span></li>
        </ol>
        <p className="note center"><T k="notice" /></p>
      </section>
    </>
  );
}
