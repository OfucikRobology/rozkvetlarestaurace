import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 40) + "...",
      hasDirectUrl: !!process.env.DIRECT_URL,
      nodeEnv: process.env.NODE_ENV,
    },
  };

  try {
    // Test zakladniho pripojeni
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
    results.dbConnection = { success: true, result: dbTest };
  } catch (error) {
    results.dbConnection = { success: false, error: String(error) };
  }

  try {
    // Test count na jednoduche tabulce
    const count = await prisma.reservation.count();
    results.reservationCount = { success: true, count };
  } catch (error) {
    results.reservationCount = { success: false, error: String(error) };
  }

  try {
    const count = await prisma.contactMessage.count();
    results.messageCount = { success: true, count };
  } catch (error) {
    results.messageCount = { success: false, error: String(error) };
  }

  return NextResponse.json(results);
}
