import { SITE, LOCATION, waLink } from "@/lib/site";
import { T } from "./LangProvider";

export default function Footer() {
  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap contact-row">
          <div className="contact-info">
            <h2><T k="contact.title" /></h2>
            <p className="addr">📍 <T k="contact.address" /></p>
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
            <div className="cta">
              <a className="btn wa" href={waLink("Hi Friends Crackers, I have a question.")} target="_blank" rel="noopener noreferrer">
                <T k="contact.chat" />
              </a>
              <a className="btn" href={LOCATION.directions} target="_blank" rel="noopener noreferrer">
                📍 <T k="contact.directions" />
              </a>
            </div>
          </div>
          <div className="map">
            <iframe
              src={LOCATION.embed}
              title="Friends Crackers location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <p><T k="footer.copy" vars={{ name: SITE.name, group: SITE.group }} /> · <T k="notice" /></p>
          <p className="safe"><T k="footer.safe" /></p>
        </div>
      </footer>
    </>
  );
}
