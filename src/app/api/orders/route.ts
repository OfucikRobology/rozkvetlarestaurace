import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, pickupTime, note, items } = body;

    if (!name || !phone || !pickupTime || !items?.length) {
      return NextResponse.json(
        { error: "Jméno, telefon, čas vyzvednutí a položky jsou povinné." },
        { status: 400 }
      );
    }

    const totalPrice = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Ulozit do databaze
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        email: email || null,
        pickupTime,
        note: note || null,
        totalPrice: totalPrice * 100, // v halerich
        items: {
          create: items.map(
            (item: { name: string; price: number; quantity: number }) => ({
              name: item.name,
              price: item.price * 100,
              quantity: item.quantity,
            })
          ),
        },
      },
    });

    // Odeslat email
    try {
      await sendOrderConfirmation({
        name,
        phone,
        email,
        pickupTime,
        items,
        totalPrice,
      });
    } catch (emailError) {
      console.error("Chyba pri odesilani emailu:", emailError);
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Chyba pri vytvareni objednavky:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
