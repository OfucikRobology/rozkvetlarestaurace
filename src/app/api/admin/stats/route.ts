import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalReservations,
    todayReservations,
    pendingOrders,
    unreadMessages,
    totalEvents,
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.reservation.count({
      where: { date: { gte: today } },
    }),
    prisma.order.count({
      where: { status: { in: ["pending", "confirmed"] } },
    }),
    prisma.contactMessage.count({
      where: { read: false },
    }),
    prisma.eventInquiry.count(),
  ]);

  return NextResponse.json({
    totalReservations,
    todayReservations,
    pendingOrders,
    unreadMessages,
    totalEvents,
  });
}
