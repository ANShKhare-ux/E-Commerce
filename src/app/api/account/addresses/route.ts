import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: addresses, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      // In development fallback
      return NextResponse.json({ success: true, addresses: [] });
    }

    return NextResponse.json({ success: true, addresses: addresses || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch addresses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      is_default,
    } = body;

    if (!full_name || !phone || !address_line1 || !city || !state || !pincode) {
      return NextResponse.json({ error: "All required address fields must be filled." }, { status: 400 });
    }

    // Validate Indian PIN code (6 digits)
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      return NextResponse.json({ error: "Please enter a valid 6-digit Indian PIN code." }, { status: 400 });
    }

    // If marked default, unset previous default
    if (is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { data: address, error } = await supabase
      .from("addresses")
      .insert({
        user_id: user.id,
        full_name: full_name.trim(),
        phone: phone.trim(),
        address_line1: address_line1.trim(),
        address_line2: address_line2?.trim() || null,
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        is_default: Boolean(is_default),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, address });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save address" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("id");

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    // Delete address matching user_id strictly (Row Level Security also enforces this)
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Address deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete address" }, { status: 500 });
  }
}

