import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(reservations);
}

export async function PATCH(req: NextRequest) {
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
}
