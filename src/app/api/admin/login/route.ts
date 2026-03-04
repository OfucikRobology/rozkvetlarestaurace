import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { error: "Nesprávné heslo." },
        { status: 401 }
      );
    }

    const token = await sign({ role: "admin" });

    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hodin
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chyba pri prihlaseni:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
