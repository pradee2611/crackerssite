import { STATES } from "@/lib/site";

export type PincodeInfo = { state: string; district: string; areas: string[] };

type PostOffice = { Name?: string; District?: string; State?: string };

/** Match the API's state spelling ("Jammu & Kashmir", "TAMIL NADU") to our dropdown list. */
function matchState(raw: string): string | null {
  const norm = (x: string) => x.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();
  const n = norm(raw);
  return STATES.find((s) => norm(s) === n) ?? STATES.find((s) => norm(s).startsWith(n) || n.startsWith(norm(s))) ?? null;
}

/** Look up an Indian 6-digit pincode (free India Post data via api.postalpincode.in). Returns null if not found or offline. */
export async function lookupPincode(pin: string, signal?: AbortSignal): Promise<PincodeInfo | null> {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { signal });
  if (!res.ok) throw new Error("pincode lookup failed");
  const data = (await res.json()) as { Status?: string; PostOffice?: PostOffice[] | null }[];
  const offices = data?.[0]?.Status === "Success" ? data[0].PostOffice ?? [] : [];
  const first = offices.find((o) => o.District && o.State);
  if (!first) return null;
  const state = matchState(first.State!);
  if (!state) return null;
  const areas = Array.from(new Set(offices.map((o) => (o.Name ?? "").trim()).filter(Boolean)));
  return { state, district: first.District!.trim(), areas };
}
