"use client";

import { SITE, waLink } from "@/lib/site";
import LangSwitcher from "./LangSwitcher";
import { useLang } from "./LangProvider";

const CONTACT = SITE.phones[0].number; // 63748 17953

export default function ClosedPage() {
  const { t } = useLang();
  return (
    <main className="closed">
      <div className="closed-lang"><LangSwitcher /></div>
      <div className="closed-card">
        <div className="closed-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="" width={44} height={44} />
          <span><i>Friends</i> <em>Crackers</em></span>
        </div>
        <p className="closed-ta">{SITE.tamil}</p>
        <h1>{t("closed.title")}</h1>
        <p className="closed-msg">{t("closed.msg")}</p>
        <p className="closed-sub">{t("closed.contact")}</p>
        <a className="closed-num" href={`tel:+91${CONTACT.replace(/\s/g, "")}`}>{CONTACT}</a>
        <div className="closed-actions">
          <a className="btn" href={`tel:+91${CONTACT.replace(/\s/g, "")}`}>{t("closed.call")}</a>
          <a className="btn wa" href={waLink("Hi Friends Crackers, I would like to enquire.")} target="_blank" rel="noopener noreferrer">{t("closed.wa")}</a>
        </div>
        <p className="closed-thanks">{t("closed.thanks")}</p>
      </div>
    </main>
  );
}
