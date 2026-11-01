"use client";

import { giftBoxes, inr, waLink } from "@/lib/site";
import { useLang } from "./LangProvider";

export default function GiftBoxes() {
  const { t } = useLang();
  return (
    <section id="gift" className="section wrap">
      <h2 className="title"><span>{t("gift.title")}</span></h2>
      <div className="gift">
        <ul>
          {giftBoxes.map((g) => (
            <li key={g.items}>
              <a
                href={waLink(`Hi Friends Crackers, I would like the ${g.items} items gift box (${inr(g.price)}). Please share the details.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>{g.items}</b>
                <span>{t("gift.items")}</span>
                <small>{t("gift.box")}</small>
                <strong>{inr(g.price)}</strong>
              </a>
            </li>
          ))}
        </ul>
        <p>
          {t("gift.only")}{" "}
          <a href={waLink("Hi Friends Crackers, I would like details about gift boxes.")} target="_blank" rel="noopener noreferrer">{t("gift.contact")}</a>
        </p>
      </div>
    </section>
  );
}
