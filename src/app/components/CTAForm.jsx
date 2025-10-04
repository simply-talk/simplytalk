"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Modal from "./Modal";
import { Toaster, toast } from "sonner";

function getTodayDateString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
const price_amount = {
  paid: 199,
  free: 49,
}

function generateTimeSlots() {
  return [
    { id: 1, label: "11:05 AM - 11:25 AM", type: "paid", price: price_amount.paid, duration: "20 mins" },
    { id: 2, label: "11:45 AM - 11:50 AM", type: "starter", price: price_amount.free, duration: "5 mins" },
    { id: 3, label: "12:30 PM - 12:50 PM", type: "paid", price: price_amount.paid, duration: "20 mins" },
    { id: 4, label: "1:10 PM - 1:15 PM", type: "starter", price: price_amount.free, duration: "5 mins" },
    { id: 5, label: "2:00 PM - 2:20 PM", type: "paid", price: price_amount.paid, duration: "20 mins" },
    { id: 6, label: "2:40 PM - 2:45 PM", type: "starter", price: price_amount.free, duration: "5 mins" },
    { id: 7, label: "3:30 PM - 3:50 PM", type: "paid", price: price_amount.paid, duration: "20 mins" },
    { id: 8, label: "4:25 PM - 4:30 PM", type: "starter", price: price_amount.free, duration: "5 mins" },
  ];
}

async function fetchBookedSlots(date) {
  if (!date) return [];
  try {
    const res = await fetch(`/api/booked-slots?date=${date}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.bookedSlots || [];
  } catch {
    return [];
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CtaForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState(getTodayDateString());
  const [timeSlot, setTimeSlot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [topic, setTopic] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [age, setAge] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // New states for phone check
  const [userStatus, setUserStatus] = useState(null); // 'new' | 'existing'
  const [checkingUser, setCheckingUser] = useState(false);

  const showTimeSlots = Boolean(date);
  const timeSlots = showTimeSlots ? generateTimeSlots() : [];

  useEffect(() => {
    if (!date) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    fetchBookedSlots(date).then((slots) => {
      setBookedSlots(slots);
    }).finally(() => setLoadingSlots(false));
  }, [date]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const Dropdown = ({ children, ...props }) => (
    <div className="relative">
      <select
        {...props}
        className={
          "appearance-none w-full rounded-md border px-3 py-2 text-sm md:text-base bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-400 pr-8 " +
          (props.className || "")
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );

  // Check if user is new or existing
  const handleCheckUser = async () => {
    if (phone.length !== 10) return;
    setCheckingUser(true);
    try {
      const res = await fetch(`/api/check-phone?phone=${phone}`);
      const data = await res.json();
      console.log("data:", data);

      setUserStatus(data.exists ? "existing" : "new");
      console.log("userStatus:", userStatus);
    } catch (err) {
      console.error("Error checking phone:", err);
      setUserStatus("new"); // fallback to new on error
    } finally {
      setCheckingUser(false);
    }
  };

  const handlePayment = async (amount) => {
    console.log("=== PAYMENT PROCESS STARTED ===");
    console.log("Payment Amount:", amount);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      console.log("❌ Razorpay script failed to load");
      toast.error("Failed to load payment gateway. Please try again.");
      setLoadingSubmit(false);
      return;
    }
    console.log("✅ Razorpay script loaded");

    let orderData;
    try {
      console.log("🔄 Creating order...");
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // Pass the actual amount
      });

      console.log("📡 Response status:", res.status);
      console.log("📡 Response ok:", res.ok);

      orderData = await res.json();
      console.log("📦 Order Data Received:", orderData);

      if (!res.ok) {
        console.log("❌ Order creation failed:", orderData.error);
        throw new Error(orderData.error || "Order creation failed");
      }
    } catch (err) {
      console.log("💥 Fetch Error:", err);
      toast.error("Could not initiate payment. Please try again.");
      setLoadingSubmit(false);
      return;
    }

    console.log("🔑 Frontend Razorpay Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.log("💰 Order Amount:", orderData.amount);
    console.log("🆔 Order ID:", orderData.id);

    const selectedSlot = timeSlots.find((slot) => slot.label === timeSlot);
    const slotType = selectedSlot?.type || "unknown";

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SimplyTalk",
      description: `Session Booking - ${slotType === 'starter' ? 'Starter (5 mins)' : 'Premium (20 mins)'}`,
      order_id: orderData.id,
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
      handler: async function (response) {
        console.log("🎉 Payment Success Response:", response);
        console.log("📋 Payment Details:", {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature
        });

        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              phone,
              language,
              date,
              timeSlot,
              topic,
              shortDescription,
              age,
              slotType, // Add slot type for backend tracking
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderData.amount,
            }),
          });

          console.log("📡 Verify Response Status:", verifyRes.status);
          console.log("📡 Verify Response OK:", verifyRes.ok);

          const verifyData = await verifyRes.json();
          console.log("📦 Verify Data:", verifyData);
          if (!verifyRes.ok) {
            toast.error(verifyData.error || "Payment verification failed.");
            setSubmitted(false);
          } else {
            setSubmitted(true);
            const message = slotType === 'starter' ? 'Starter Slot (5 mins) Confirmed!' : 'Premium Slot (20 mins) Confirmed!';
            toast.success(message);
            setName("");
            setPhone("");
            setLanguage("");
            setDate("");
            setTimeSlot("");
            setTopic("");
            setShortDescription("");
            setAge("");
            setUserStatus(null);
            fetchBookedSlots(date).then((slots) => setBookedSlots(slots));
          }
        } catch (err) {
          toast.error("Payment verification failed. Please contact support.");
          setSubmitted(false);
        } finally {
          setLoadingSubmit(false);
        }
      },
      prefill: {
        name,
        contact: phone,
      },
      theme: {
        color: "#14b8a6",
      },
      modal: {
        ondismiss: () => {
          setLoadingSubmit(false);
        },
      },
    };
    console.log("⚙️ Razorpay Options:", options);
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayAndBookClick = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    if (!name || !phone || !language || !date || !timeSlot || !topic || !age) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }

    const selectedSlot = timeSlots.find((slot) => slot.label === timeSlot);
    if (!selectedSlot) {
      toast.error("Invalid time slot selected.");
      return;
    }

    // Prevent returning users from booking starter slots
    if (selectedSlot.type === "starter" && userStatus === "existing") {
      toast.error("You have already booked a session before. Starter slots (₹49) are only available for first-time users. Please select a Premium slot (₹2).");
      return;
    }

    setShowTermsModal(true);
  };

  const handleAcceptTerms = async () => {
    setShowTermsModal(false);
    setAcceptTerms(false);
    setLoadingSubmit(true);

    const selectedSlot = timeSlots.find((slot) => slot.label === timeSlot);

    // Both slot types now require payment
    if (selectedSlot) {
      await handlePayment(selectedSlot.price);
    }
  };

  // Helper function to display slot label with price
  const getSlotDisplayLabel = (slot) => {
    const isBooked = bookedSlots.includes(slot.label);
    const isDisabledForExisting = slot.type === "starter" && userStatus === "existing";

    if (isBooked) {
      return `${slot.label} - Booked`;
    } else if (isDisabledForExisting) {
      return `${slot.label} - ₹${slot.price} (${slot.duration}) - First-time users only`;
    } else {
      const slotName = slot.type === "starter" ? "Starter" : "Premium";
      return `${slot.label} - ₹${slot.price} (${slotName} - ${slot.duration})`;
    }
  };

  return (
    <section id="book" className="md:px-15">
      <Toaster richColors position="bottom-center" />
      <div className="container mx-auto">
        <div className="flex flex-col-reverse items-center md:flex-row md:items-end md:justify-between bg-[var(--color-mint)] md:gap-15 rounded-[50px] overflow-hidden px-10 md:px-2">
          <div className="mb-0 md:mr-8">
            <Image src="/CTA.png" width={365} height={364} alt="person on call" />
          </div>
          <div className="flex-1 w-full md:pr-5 md:pb-10">
            <h2 className="judson mb-12 text-center text-3xl md:text-4xl font-bold text-foreground md:text-left mt-10">
              Ready To Feel Heard?
            </h2>
            <Form
              name={name}
              setName={setName}
              phone={phone}
              handlePhoneChange={handlePhoneChange}
              handleCheckUser={handleCheckUser}
              checkingUser={checkingUser}
              userStatus={userStatus}
              language={language}
              setLanguage={setLanguage}
              topic={topic}
              setTopic={setTopic}
              age={age}
              setAge={setAge}
              shortDescription={shortDescription}
              setShortDescription={setShortDescription}
              date={date}
              setDate={setDate}
              timeSlot={timeSlot}
              setTimeSlot={setTimeSlot}
              showTimeSlots={showTimeSlots}
              timeSlots={timeSlots}
              bookedSlots={bookedSlots}
              loadingSlots={loadingSlots}
              loadingSubmit={loadingSubmit}
              handleSubmit={handlePayAndBookClick}
              getSlotDisplayLabel={getSlotDisplayLabel}
            />
          </div>
        </div>
      </div>

      <Modal
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms and Conditions"
      >
        {/* Scrollable Body */}
        <div className="max-h-[80vh] min-h-[40vh] overflow-y-auto text-sm text-gray-700 mb-4 space-y-4">

          {/* Emergency Notice */}
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
            ⚠️ <strong>Emergency Notice:</strong> If you are in crisis or at risk of harm, please call your local emergency number or mental health helpline immediately. SimplyTalk is not a crisis service.
          </div>

          {/* Short Disclaimer */}
          <p className="text-gray-800 mb-2">
            Disclaimer: SimplyTalk provides supportive listening only. It is not therapy, counseling, or medical advice.
          </p>

          {/* Existing rules / TnC (kept exactly as-is) */}
          <p className="mb-2">Before booking, please confirm you understand:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              No pornographic, sexual, abusive, or religious content is allowed.
              Violation will result in immediate call termination and possible ban.
            </li>
            <li>
              Payments are non-refundable, but you may reschedule once (at no extra charge)
              if requested at least 24 hours before your booked time.
            </li>
            <li>
              Be on time. Late arrivals may reduce your session time.
            </li>
            <li>
              Your data is handled securely and confidentially.
            </li>
            <li>
              SimplyTalk is a supportive listening service, not therapy, counseling,
              or medical advice.
            </li>
            <li>
              If you are in crisis, please call your local emergency number or
              mental health helpline immediately.
            </li>
          </ul>
        </div>

        {/* Checkbox (kept exactly as-is) */}
        <div className="flex items-start mb-4">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms((v) => !v)}
            className="mr-2"
          />
          <label htmlFor="acceptTerms" className="text-sm">
            I understand SimplyTalk is not a therapy or medical service, and I agree to the{" "}
            <a href="/privacy" target="_blank" className="text-teal-600 underline hover:text-teal-800">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/refund-policy" target="_blank" className="text-teal-600 underline hover:text-teal-800">
              No Refund/One-Time Reschedule Policy
            </a>.
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => setShowTermsModal(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 ${!acceptTerms ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!acceptTerms}
            onClick={handleAcceptTerms}
          >
            Accept & Book
          </button>
        </div>
      </Modal>


    </section>
  );
}
