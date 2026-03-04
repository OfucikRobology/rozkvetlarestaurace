import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendReservationConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, date, time, guests, note } = body;

    // --- Validation ---
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!date || typeof date !== "string") {
      return NextResponse.json(
        { error: "Date is required." },
        { status: 400 }
      );
    }

    if (!time || typeof time !== "string") {
      return NextResponse.json(
        { error: "Time is required." },
        { status: 400 }
      );
    }

    const guestsNum = Number(guests);
    if (!guests || isNaN(guestsNum) || guestsNum < 1 || guestsNum > 150) {
      return NextResponse.json(
        { error: "Number of guests must be between 1 and 150." },
        { status: 400 }
      );
    }

    // Parse the date string (YYYY-MM-DD) into a Date object
    const parsedDate = new Date(date + "T00:00:00");
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format." },
        { status: 400 }
      );
    }

    // --- Save to database ---
    const reservation = await prisma.reservation.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date: parsedDate,
        time: time.trim(),
        guests: guestsNum,
        note: note?.trim() || null,
        status: "pending",
      },
    });

    // --- Send confirmation email (non-blocking) ---
    try {
      await sendReservationConfirmation({
        name: reservation.name,
        email: reservation.email,
        date: date,
        time: reservation.time,
        guests: reservation.guests,
        note: reservation.note ?? undefined,
      });
    } catch (emailError) {
      // Log the error but do not fail the request — the reservation is saved
      console.error("Failed to send reservation confirmation email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        reservation: {
          id: reservation.id,
          name: reservation.name,
          date: date,
          time: reservation.time,
          guests: reservation.guests,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
