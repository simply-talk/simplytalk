import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // ✅ Step 1: Basic validation
    if (!amount || typeof amount !== "number" || amount <= 0) {
      console.error("❌ Invalid amount:", amount);
      return new Response(JSON.stringify({ error: "Valid numeric amount required" }), { status: 400 });
    }

    // ✅ Step 2: Check environment variables
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error("❌ Missing Razorpay credentials");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), { status: 500 });
    }

    // ✅ Step 3: Initialize Razorpay client
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    // ✅ Step 4: Create order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        platform: "SimplyTalk",
        plan_amount: `${amount}`,
        description: amount === 249 ? "15-min session" : amount === 499 ? "30-min session" : "Custom amount",
      },

    });

    console.log("✅ Razorpay order created:", order.id, "| ₹", amount);

    // ✅ Step 5: Return order details
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("💥 Error creating Razorpay order:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to create order",
        details: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ CORS preflight support
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
