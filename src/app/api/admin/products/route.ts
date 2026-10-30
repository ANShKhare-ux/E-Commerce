import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminAuthorization } from "@/lib/auth/admin";

export async function GET() {
  try {
    const products = await db.products.getAll();
    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuthorization(req.headers);
    // In local development sandbox, fallback to admin email if not set
    const adminEmail = auth.email || process.env.ADMIN_EMAIL || "admin@lumiere.in";

    const body = await req.json();
    const {
      name,
      slug,
      brand,
      category_slug,
      collection_slug,
      description,
      fabric_care,
      origin,
      base_price,
      discount_price,
      is_deal,
      images,
      variants,
      is_affiliate,
      affiliate_source_name,
      affiliate_url,
      affiliate_disclosure,
    } = body;

    if (!name || !brand || !category_slug || !description || base_price === undefined) {
      return NextResponse.json(
        { error: "Name, brand, category, description, and base price are required." },
        { status: 400 }
      );
    }

    if (base_price < 0) {
      return NextResponse.json({ error: "Base price cannot be negative." }, { status: 400 });
    }

    if (discount_price !== undefined && discount_price !== null) {
      if (discount_price < 0 || discount_price > base_price) {
        return NextResponse.json(
          { error: "Discount price must be between 0 and base price." },
          { status: 400 }
        );
      }
    }

    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const existingSlug = await db.products.getBySlug(finalSlug);
    if (existingSlug) {
      return NextResponse.json(
        { error: `A product with slug '${finalSlug}' already exists.` },
        { status: 400 }
      );
    }

    // Build variants
    const productVariants = (variants || []).map((v: any, idx: number) => {
      const varId = `var-${Date.now()}-${idx}`;
      return {
        id: varId,
        product_id: "",
        sku: v.sku || `LUM-${brand.slice(0, 3).toUpperCase()}-${finalSlug.slice(0, 4).toUpperCase()}-${v.size}-${idx}`,
        color: v.color || "Standard",
        color_hex: v.color_hex || "#111111",
        size: v.size || "M",
        price: Number(v.price) || Number(discount_price || base_price),
        compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : Number(base_price),
        weight_grams: Number(v.weight_grams) || 500,
        is_active: v.is_active !== false,
      };
    });

    // Default variant if none supplied
    if (productVariants.length === 0) {
      productVariants.push({
        id: `var-${Date.now()}-0`,
        product_id: "",
        sku: `LUM-${finalSlug.slice(0, 8).toUpperCase()}-FS`,
        color: "Classic",
        color_hex: "#111111",
        size: "Free Size",
        price: Number(discount_price || base_price),
        compare_at_price: Number(base_price),
        weight_grams: 500,
        is_active: true,
      });
    }

    // Product Images
    const productImages = (images || []).map((img: any, idx: number) => ({
      id: `img-${Date.now()}-${idx}`,
      product_id: "",
      url: img.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
      alt_text: img.alt_text || `${name} view`,
      display_order: idx + 1,
      is_primary: idx === 0,
    }));

    if (productImages.length === 0) {
      productImages.push({
        id: `img-${Date.now()}-0`,
        product_id: "",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        alt_text: name,
        display_order: 1,
        is_primary: true,
      });
    }

    const created = await db.products.create({
      slug: finalSlug,
      name,
      brand,
      category_slug,
      collection_slug: collection_slug || undefined,
      description,
      fabric_care: fabric_care || "Hand wash or dry clean.",
      origin: origin || "India",
      is_affiliate: Boolean(is_affiliate),
      affiliate_source_name: affiliate_source_name || undefined,
      affiliate_url: affiliate_url || undefined,
      affiliate_disclosure: affiliate_disclosure || undefined,
      base_price: Number(base_price),
      discount_price: discount_price ? Number(discount_price) : undefined,
      is_deal: Boolean(is_deal),
      rating: 0,
      review_count: 0,
      status: "active",
      images: productImages,
      variants: productVariants,
    });

    return NextResponse.json({
      success: true,
      product: created,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
