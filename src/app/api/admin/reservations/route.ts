import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Admin reservations error:", error);
    return NextResponse.json(
      { error: "Chyba serveru", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID a status jsou povinné." }, { status: 400 });
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Admin reservations PATCH error:", error);
    return NextResponse.json(
      { error: "Chyba serveru", detail: String(error) },
      { status: 500 }
    );
  }
}
