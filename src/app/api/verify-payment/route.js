import { supabase } from "../_supabase";
import crypto from "crypto";

export async function POST(request) {
  try {
    console.log("🔄 Payment verification started");

    const data = await request.json();
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

    if (
      !name || !phone || !date || !timeSlot ||
      !razorpay_order_id || !razorpay_payment_id || !razorpay_signature
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), { status: 500 });
    }

    // ✅ Step 1: Verify signature
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: "Invalid payment signature" }), { status: 400 });
    }

    console.log("✅ Signature verified");

    // ✅ Step 2: Prevent double booking of same slot
    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("date", date)
      .eq("time_slot", timeSlot)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: "Slot already booked" }), { status: 409 });
    }

    // ✅ Step 3: Determine plan details
    const planType = amount === 199 ? "15-min" : amount === 299 ? "30-min" : "custom";
    const duration = amount === 199 ? "15 mins" : amount === 299 ? "30 mins" : "";

    // ✅ Step 4: Insert booking
    const { data: booking, error: bookingError } = await supabase
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
          plan_type: planType,
          duration,
          amount,
        },
      ])
      .select()
      .maybeSingle();

    if (bookingError) {
      console.error("❌ Error saving booking:", bookingError.message);
      return new Response(JSON.stringify({ error: bookingError.message }), { status: 500 });
    }

    // ✅ Step 5: Insert payment
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
      return new Response(JSON.stringify({ error: paymentError.message }), { status: 500 });
    }

    console.log("✅ Booking & payment saved");
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("🔥 verify-payment error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
