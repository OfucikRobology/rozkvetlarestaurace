import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menus = await prisma.weeklyMenu.findMany({
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: { weekStart: "desc" },
    take: 10,
  });

  return NextResponse.json(menus);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { weekStart, items } = await req.json();

  // Deaktivovat starsi menu
  await prisma.weeklyMenu.updateMany({
    data: { active: false },
  });

  const menu = await prisma.weeklyMenu.create({
    data: {
      weekStart: new Date(weekStart),
      active: true,
      items: {
        create: items.map(
          (
            item: {
              day: string;
              soup: string;
              mainDish1: string;
              mainDish2?: string;
              price: number;
            },
            index: number
          ) => ({
            day: item.day,
            soup: item.soup,
            mainDish1: item.mainDish1,
            mainDish2: item.mainDish2 || null,
            price: item.price * 100,
            sortOrder: index,
          })
        ),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(menu);
}
