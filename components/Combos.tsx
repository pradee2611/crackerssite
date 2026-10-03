import { combos, giftBoxes, inr, waLink } from "@/lib/site";

export default function Combos() {
  return (
    <section id="combos" className="section wrap">
      <h2 className="title"><span>Combo offers</span></h2>
      <div className="combos">
        {combos.map((c) => {
          const worth = c.items.reduce((t, i) => t + i.price, 0);
          const msg = `Hi Friends Crackers, I would like to pre-order the ${c.title} (${inr(c.price)}, ${c.free} FREE).

Name:
Delivery / Pickup:`;
          return (
            <article className="combo" key={c.title}>
              <header className="combo-top">
                <h3>{c.title}</h3>
                <b className="combo-price">{inr(c.price)}</b>
                <span className="combo-free">🎁 FREE: {c.free}</span>
              </header>
              <ol className="combo-items">
                {c.items.map((i, n) => (
                  <li key={n}>
                    <span className="ci">{n + 1}</span>
                    <span className="cn">{i.name}</span>
                    {i.qty && <span className="cq">{i.qty}</span>}
                    <span className="cv">{inr(i.price)}</span>
                  </li>
                ))}
              </ol>
              <footer className="combo-foot">
                <span>{c.items.length} items · worth {inr(worth)} · + {c.free} FREE</span>
                <a className="btn wa sm" href={waLink(msg)} target="_blank" rel="noopener noreferrer">Order this combo</a>
              </footer>
            </article>
          );
        })}
      </div>
      <div className="gift">
        <h3>🎁 Gift box available</h3>
        <ul>
          {giftBoxes.map((n) => (
            <li key={n}><b>{n}</b><span>ITEMS</span><small>Gift Box</small></li>
          ))}
        </ul>
        <p>
          Gift boxes available only · <a href={waLink("Hi Friends Crackers, I would like details about gift boxes.")} target="_blank" rel="noopener noreferrer">Contact us for details</a>
        </p>
      </div>
    </section>
  );
}
