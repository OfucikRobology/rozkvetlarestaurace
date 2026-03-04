import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEventInquiry } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, date, guests, message } = body;

    if (!name || !email || !phone || !eventType || !date || !guests) {
      return NextResponse.json(
        { error: "Všechna povinná pole musí být vyplněna." },
        { status: 400 }
      );
    }

    // Ulozit do databaze
    await prisma.eventInquiry.create({
      data: {
        name,
        email,
        phone,
        eventType,
        date: new Date(date),
        guests: parseInt(guests),
        message: message || null,
      },
    });

    // Odeslat email
    try {
      await sendEventInquiry({
        name,
        email,
        phone,
        eventType,
        date,
        guests: parseInt(guests),
        message,
      });
    } catch (emailError) {
      console.error("Chyba pri odesilani emailu:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chyba pri vytvareni poptavky:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
