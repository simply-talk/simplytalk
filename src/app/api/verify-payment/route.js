import { supabase } from "../_supabase";
import crypto from "crypto";

export async function POST(request) {
  try {
    console.log("🔄 Payment verification started");

    const data = await request.json();
    console.log("📦 Received data:", data);

    const {
      name,
      phone,
      language,
      date,
      timeSlot,
      topic,
      shortDescription,
      age,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = data;

    // Basic input validation
    if (
      !name || !phone || !date || !timeSlot ||
      !razorpay_order_id || !razorpay_payment_id || !razorpay_signature
    ) {
      console.error("❌ Missing required fields");
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Environment variable check
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("❌ RAZORPAY_KEY_SECRET is not defined");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Verify signature
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("❌ Signature mismatch", {
        expected: generated_signature,
        received: razorpay_signature,
      });
      return new Response(JSON.stringify({ error: "Invalid payment signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("✅ Signature verified");

    // 2. Check if slot already booked
    const { data: existing, error: fetchError } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time_slot", timeSlot)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Error checking slot:", fetchError.message);
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existing) {
      console.warn("⚠️ Slot already booked");
      return new Response(JSON.stringify({ error: "Slot already booked" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Save booking
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert([
        {
          name,
          phone,
          language,
          date,
          time_slot: timeSlot,
          topic,
          short_description: shortDescription,
          age,
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) {
      console.error("❌ Error saving booking:", insertError.message);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 4. Save payment info
    const { error: paymentError } = await supabase.from("payments").insert([
      {
        booking_id: booking.id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        currency: "INR",
        status: "paid",
      },
    ]);

    if (paymentError) {
      console.error("❌ Error saving payment:", paymentError.message);
      return new Response(JSON.stringify({ error: paymentError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("✅ Booking & payment saved");
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("🔥 Uncaught error in /verify-payment:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
