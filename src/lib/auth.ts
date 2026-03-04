import { cookies } from "next/headers";

const SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret-change-me";

// Jednoduchy JWT-like token (pro produkci pouzijte jose knihovnu)
export async function sign(payload: Record<string, unknown>): Promise<string> {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 86400000 });
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  const sig = Buffer.from(signature).toString("base64url");
  const encoded = Buffer.from(data).toString("base64url");
  return `${encoded}.${sig}`;
}

export async function verify(
  token: string
): Promise<Record<string, unknown> | null> {
  try {
    const [encoded, sig] = token.split(".");
    if (!encoded || !sig) return null;

    const data = Buffer.from(encoded, "base64url").toString();
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      Buffer.from(sig, "base64url"),
      encoder.encode(data)
    );

    if (!valid) return null;

    const payload = JSON.parse(data);
    if (payload.exp && payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return false;
  const payload = await verify(token);
  return payload?.role === "admin";
}
