import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactMessage } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Jméno, email a zpráva jsou povinné." },
        { status: 400 }
      );
    }

    // Ulozit do databaze
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Odeslat email
    try {
      await sendContactMessage({ name, email, subject, message });
    } catch (emailError) {
      console.error("Chyba pri odesilani emailu:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chyba kontaktniho formulare:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
