import { supabase } from "../_supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return new Response(JSON.stringify({ error: "Missing date parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("time_slot")
    .eq("date", date);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const bookedSlots = data.map((b) => b.time_slot);

  return new Response(JSON.stringify({ bookedSlots }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
