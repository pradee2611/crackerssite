"use client";

import { STATES } from "@/lib/site";
import { useCustomer } from "./CustomerProvider";
import { useLang } from "./LangProvider";

export default function CustomerForm({ idPrefix }: { idPrefix: string }) {
  const { customer, ready, setField } = useCustomer();
  const { t } = useLang();
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
      <div className="cust-row">
        <div>
          <label htmlFor={id("city")}>{t("cust.city")} *</label>
          <input id={id("city")} name="city" autoComplete="address-level2" required value={customer.city} onChange={(e) => setField("city", e.target.value)} />
        </div>
        <div>
          <label htmlFor={id("pin")}>{t("cust.pin")} *</label>
          <input id={id("pin")} name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" required value={customer.pincode} onChange={(e) => setField("pincode", e.target.value.replace(/\D/g, ""))} />
        </div>
      </div>
      <label htmlFor={id("state")}>{t("cust.state")} *</label>
      <select id={id("state")} name="state" required autoComplete="address-level1" value={customer.state} onChange={(e) => setField("state", e.target.value)}>
        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {!ready && <p className="cust-need">{t("cust.need")}</p>}
    </form>
  );
}
