import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(messages);
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, read } = await req.json();

  const message = await prisma.contactMessage.update({
    where: { id },
    data: { read },
  });

  return NextResponse.json(message);
}
