import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { menuItems } from "@/data/menu";

// Auto-seed: pokud DB je prazdna, naimportuje staticke data
async function seedIfEmpty() {
  const count = await prisma.menuItemDB.count();
  if (count > 0) return;

  const categoryOrder: Record<string, number> = {
    appetizers: 0,
    soups: 100,
    mainCourses: 200,
    desserts: 300,
    drinks: 400,
  };

  await prisma.menuItemDB.createMany({
    data: menuItems.map((item, idx) => ({
      nameCs: item.name.cs,
      nameUk: item.name.uk,
      descCs: item.description.cs,
      descUk: item.description.uk,
      price: item.price,
      category: item.category,
      allergens: item.allergens?.join(",") || null,
      sortOrder: (categoryOrder[item.category] || 0) + idx,
      visible: true,
    })),
  });
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await seedIfEmpty();

  const items = await prisma.menuItemDB.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const item = await prisma.menuItemDB.create({
    data: {
      nameCs: data.nameCs,
      nameUk: data.nameUk,
      descCs: data.descCs,
      descUk: data.descUk,
      price: Number(data.price),
      category: data.category,
      allergens: data.allergens || null,
      sortOrder: data.sortOrder || 0,
      visible: true,
    },
  });

  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...data } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Prevest price na cislo pokud je zadano
  if (data.price !== undefined) {
    data.price = Number(data.price);
  }

  const item = await prisma.menuItemDB.update({
    where: { id },
    data,
  });

  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.menuItemDB.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
