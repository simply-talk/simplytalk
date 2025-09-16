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

function generateTimeSlots() {
  return [
    { id: 1, label: "11:05 AM - 11:30 AM", type: "paid" },
    { id: 2, label: "11:45 AM - 11:50 AM", type: "free" },
    { id: 3, label: "12:30 PM - 12:55 PM", type: "paid" },
    { id: 4, label: "1:10 PM - 1:15 PM", type: "free" },
    { id: 5, label: "2:00 PM - 2:25 PM", type: "paid" },
    { id: 6, label: "2:40 PM - 2:45 PM", type: "free" },
    { id: 7, label: "3:30 PM - 3:55 PM", type: "paid" },
    { id: 8, label: "4:25 PM - 4:30 PM", type: "free" },
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

  const handlePayment = async () => {
    console.log("=== PAYMENT PROCESS STARTED ===");

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
        body: JSON.stringify({ amount: 1 }),
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


    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SimplyTalk",
      description: "Session Booking",
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
            toast.success('Paid Slot Confirmed!');
            setName("");
            setPhone("");
            setLanguage("");
            setDate("");
            setTimeSlot("");
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

    // Prevent returning users from booking free slots
    if (selectedSlot.type === "free" && userStatus === "existing") {
      toast.error("You have already booked a session before. Free slots are not available for you.");
      return;
    }

    setShowTermsModal(true);
  };

  const handleAcceptTerms = async () => {
    setShowTermsModal(false);
    setAcceptTerms(false);
    setLoadingSubmit(true);

    const selectedSlot = timeSlots.find((slot) => slot.label === timeSlot);
    if (selectedSlot?.type === "paid") {
      await handlePayment();
    } else {
      try {
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, language, date, timeSlot, topic, shortDescription, age }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message || "Booking failed");
        } else {
          setSubmitted(true);
          toast.success('Free Slot Confirmed');
          setName("");
          setPhone("");
          setLanguage("");
          setDate("");
          setTimeSlot("");
          fetchBookedSlots(date).then((slots) => setBookedSlots(slots));
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoadingSubmit(false);
      }
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
            />
          </div>
        </div>
      </div>

      <Modal
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms and Conditions"
      >
        <div className="max-h-60 overflow-y-auto text-sm text-gray-700 mb-4">
          <p>
            Please read and accept our Terms and Conditions before proceeding with your booking.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li className="font-semibold text-red-600">
              Any pornable, sexual, or religious content during the call will lead to immediate call hanging and possible ban.
            </li>
            <li>All bookings are non-refundable once payment is made.</li>
            <li>Rescheduling is allowed up to 24 hours before your slot.</li>
            <li>Be on time for your session. Late arrivals may reduce your session time.</li>
            <li>Your data is handled securely and confidentially.</li>
            <li>For any issues, contact our support team.</li>
          </ul>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms((v) => !v)}
            className="mr-2"
          />
          <label htmlFor="acceptTerms" className="text-sm">
            I have read and accept the Terms and Conditions.
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => setShowTermsModal(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 ${!acceptTerms ? "opacity-50 cursor-not-allowed" : ""
              }`}
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