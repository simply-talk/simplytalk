import { supabase } from "../_supabase";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      phone,
      language,
      date,
      timeSlot,
      age,
      shortDescription,
      topic,
      plan_type,
      duration,
      amount,
    } = data;

    // ✅ Step 1: Validate required fields
    if (!name || !phone || !language || !date || !timeSlot || !age || !topic || !amount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Step 2: Check if slot is already booked
    const { data: existing, error: fetchError } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time_slot", timeSlot)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError.message);
      return new Response(JSON.stringify({ error: "Database fetch error" }), { status: 500 });
    }

    if (existing) {
      return new Response(JSON.stringify({ error: "Slot already booked" }), { status: 409 });
    }

    // ✅ Step 3: Insert booking
    const { error: insertError } = await supabase.from("bookings").insert([
      {
        name,
        phone,
        language,
        date,
        time_slot: timeSlot,
        topic,
        short_description: shortDescription,
        age,
        plan_type,
        duration,
        amount,
      },
    ]);

    if (insertError) {
      console.error("❌ Error inserting booking:", insertError.message);
      return new Response(JSON.stringify({ error: "Failed to save booking" }), { status: 500 });
    }

    console.log("✅ Booking saved for", name, "on", date, "at", timeSlot);

    // ✅ Step 4: Respond success
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("💥 Error in /book:", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
}
