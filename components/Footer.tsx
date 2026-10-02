import { SITE, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap contact-row">
          <div>
            <h2>Visit or call us</h2>
            <p className="addr">📍 {SITE.address}</p>
            <ul className="phones">
              {SITE.phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:+91${p.number.replace(/\s/g, "")}`}>
                    {p.number}
                  </a>
                  {p.label && <span> · {p.label}</span>}
                </li>
              ))}
            </ul>
          </div>
          <a className="btn wa big" href={waLink("Hi Friends Crackers, I have a question.")} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <p>© 2026 {SITE.name} · A unit of {SITE.group} · {SITE.notice}</p>
          <p className="safe">Please buy and use crackers responsibly, follow local rules and timings, and keep children supervised.</p>
        </div>
      </footer>
    </>
  );
}
