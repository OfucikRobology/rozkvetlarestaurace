import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { menuItems } from "@/data/menu";

// Verejny endpoint — vraci menu pro stranku /menu
export async function GET() {
  try {
    const count = await prisma.menuItemDB.count();

    // Pokud DB je prazdna, vrat staticka data
    if (count === 0) {
      return NextResponse.json(menuItems);
    }

    // Nacti z DB a transformuj do MenuItem formatu
    const dbItems = await prisma.menuItemDB.findMany({
      where: { visible: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });

    const items = dbItems.map((item) => ({
      id: item.id,
      name: { cs: item.nameCs, uk: item.nameUk },
      description: { cs: item.descCs, uk: item.descUk },
      price: item.price,
      category: item.category,
      allergens: item.allergens
        ? item.allergens.split(",").map(Number)
        : undefined,
    }));

    return NextResponse.json(items);
  } catch {
    // Fallback na staticka data pokud DB selze
    return NextResponse.json(menuItems);
  }
}
