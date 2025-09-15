import { supabase } from "../_supabase";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data)
    const { name, phone, language, date, timeSlot, age, shortDescription, topic } = data;

    if (!name || !phone || !language || !date || !timeSlot || !age || !topic) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if slot is already booked
    const { data: existing, error: fetchError } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time_slot", timeSlot)
      .maybeSingle();

    if (fetchError) {
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existing) {
      return new Response(JSON.stringify({ error: "Slot already booked" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert booking
    const { error: insertError } = await supabase.from("bookings").insert([
      { name, phone, language, date, time_slot: timeSlot, topic, short_description:shortDescription, age },
    ]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}