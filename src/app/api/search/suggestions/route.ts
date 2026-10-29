import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        products: [],
        categories: [],
      });
    }

    const allProducts = await db.products.getAll({ search: query });
    const matched = allProducts.slice(0, 6).map((p) => {
      const primaryImage = p.images.find((img) => img.is_primary)?.url || p.images[0]?.url;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        category_slug: p.category_slug,
        base_price: p.base_price,
        discount_price: p.discount_price,
        image_url: primaryImage,
      };
    });

    const categorySet = new Set<string>();
    for (const p of allProducts) {
      if (p.category_slug) {
        categorySet.add(p.category_slug);
      }
    }

    return NextResponse.json({
      success: true,
      products: matched,
      categories: Array.from(categorySet).slice(0, 4),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
