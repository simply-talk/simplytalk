import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // Validation
    if (!amount || amount <= 0) {
      console.error("Invalid amount:", amount);
      return new Response(JSON.stringify({ error: "Valid amount required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Check environment variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay credentials");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Ensure integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    console.log("Order created:", order.id);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return new Response(
      JSON.stringify({ 
        error: err.message,
        details: err.error?.description || "Failed to create order"
      }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}