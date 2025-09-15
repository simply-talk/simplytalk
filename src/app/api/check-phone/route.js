import { NextResponse } from "next/server";
import { supabase } from "../_supabase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("phone")
    .eq("phone", phone)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: "Failed to check phone number" }, { status: 500 });
  }
  console.log("Phone data: ", data);
  const exists = data.length > 0;

  return NextResponse.json({ exists });
}
