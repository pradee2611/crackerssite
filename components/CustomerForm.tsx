"use client";

import { useRef, useState } from "react";
import { lookupPincode } from "@/lib/pincode";
import { STATES } from "@/lib/site";
import { useCustomer } from "./CustomerProvider";
import { useLang } from "./LangProvider";

export default function CustomerForm({ idPrefix }: { idPrefix: string }) {
  const { customer, ready, setField } = useCustomer();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "missing" | "error">("idle");
  const [areas, setAreas] = useState<string[]>([]);
  const abort = useRef<AbortController | null>(null);
  const { t } = useLang();
  async function onPincode(value: string) {
    const pin = value.replace(/\D/g, "").slice(0, 6);
    setField("pincode", pin);
    abort.current?.abort();
    if (pin.length < 6) {
      setStatus("idle");
      setAreas([]);
      return;
    }
    const ctl = new AbortController();
    abort.current = ctl;
    setStatus("loading");
    // values from the previous pincode no longer apply
    setField("district", "");
    setField("city", "");
    setAreas([]);
    try {
      const info = await lookupPincode(pin, ctl.signal);
      if (ctl.signal.aborted) return;
      if (!info) {
        setStatus("missing");
        setAreas([]);
        return;
      }
      setField("state", info.state);
      setField("district", info.district);
      setField("city", info.areas.length === 1 ? info.areas[0] : info.district);
      setAreas(info.areas);
      setStatus("ok");
    } catch {
      if (!ctl.signal.aborted) setStatus("error");
    }
  }
  const id = (k: string) => `${idPrefix}-${k}`;
  return (
    <form className="cust" onSubmit={(e) => e.preventDefault()} autoComplete="on">
      <h3>{t("cust.title")}</h3>
      <label htmlFor={id("name")}>{t("cust.name")} *</label>
      <input id={id("name")} name="name" autoComplete="name" required value={customer.name} onChange={(e) => setField("name", e.target.value)} />
      <label htmlFor={id("phone")}>{t("cust.phone")} *</label>
      <input id={id("phone")} name="tel" type="tel" inputMode="tel" autoComplete="tel" required maxLength={15} value={customer.phone} onChange={(e) => setField("phone", e.target.value)} />
      <label htmlFor={id("address")}>{t("cust.address")} *</label>
      <textarea id={id("address")} name="address" rows={2} autoComplete="street-address" required value={customer.address} onChange={(e) => setField("address", e.target.value)} />
      <label htmlFor={id("pin")}>{t("cust.pin")} *</label>
      <input id={id("pin")} name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" required value={customer.pincode} onChange={(e) => onPincode(e.target.value)} />
      {status !== "idle" && <p className={`cust-status ${status}`}>{t(`cust.pin.${status}`)}</p>}
      <div className="cust-row2">
        <div>
          <label htmlFor={id("state")}>{t("cust.state")} *</label>
          <select id={id("state")} name="state" required autoComplete="address-level1" value={customer.state} onChange={(e) => setField("state", e.target.value)}>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("district")}>{t("cust.district")} *</label>
          <input id={id("district")} name="district" required value={customer.district} onChange={(e) => setField("district", e.target.value)} />
        </div>
      </div>
      <label htmlFor={id("city")}>{t("cust.city")} *</label>
      <input id={id("city")} name="city" autoComplete="address-level2" required value={customer.city} onChange={(e) => setField("city", e.target.value)} />
      {areas.length > 1 && (
        <div className="cust-areas" role="group" aria-label={t("cust.areas")}>
          <span>{t("cust.areas")}</span>
          {areas.map((a) => (
            <button type="button" key={a} className={`chip ${customer.city === a ? "on" : ""}`} onMouseDown={(e) => e.preventDefault()} onClick={() => setField("city", a)}>{a}</button>
          ))}
        </div>
      )}
      {!ready && <p className="cust-need">{t("cust.need")}</p>}
    </form>
  );
}
