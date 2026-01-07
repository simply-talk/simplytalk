"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Modal from "./Modal";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";

// Helper to get today's date
function getTodayDateString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const price_amount = {
  "249": { price: 249, duration: "15 mins" },
  "499": { price: 499, duration: "30 mins" },
};


// Generate available time slots
function generateTimeSlots() {
  return [
    { id: 1, label: "11:00 AM - 11:15 AM", price: 249, duration: "15 mins" },
    { id: 2, label: "11:30 AM - 12:00 PM", price: 499, duration: "30 mins" },
    { id: 3, label: "12:15 PM - 12:30 PM", price: 249, duration: "15 mins" },
    { id: 4, label: "12:45 PM - 1:15 PM", price: 499, duration: "30 mins" },
    { id: 5, label: "1:30 PM - 1:45 PM", price: 249, duration: "15 mins" },
    { id: 6, label: "2:00 PM - 2:30 PM", price: 499, duration: "30 mins" },
    { id: 7, label: "2:45 PM - 3:00 PM", price: 249, duration: "15 mins" },
    { id: 8, label: "3:15 PM - 3:45 PM", price: 499, duration: "30 mins" },
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
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CtaForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState(getTodayDateString());
  const [timeSlot, setTimeSlot] = useState("");
  const [topic, setTopic] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [age, setAge] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState({
    price: 199,
    duration: "15 mins",
  });

  const showTimeSlots = Boolean(date);
  const timeSlots = showTimeSlots ? generateTimeSlots() : [];

  // Fetch booked slots for chosen date
  useEffect(() => {
    if (!date) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    fetchBookedSlots(date)
      .then((slots) => setBookedSlots(slots))
      .finally(() => setLoadingSlots(false));
  }, [date]);

  // Prefill plan from pricing card click (via URL param)
  useEffect(() => {
    if (planParam && price_amount[planParam]) {
      setSelectedPlan(price_amount[planParam]);
    }
  }, [planParam]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handlePayAndBookClick = (e) => {
    e.preventDefault();
    if (!name || !phone || !language || !date || !timeSlot || !topic || !age) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }
    setShowTermsModal(true);
  };

  const handleAcceptTerms = async () => {
    setShowTermsModal(false);
    setAcceptTerms(false);
    setLoadingSubmit(true);

    const selectedSlot = timeSlots.find((slot) => slot.label === timeSlot);
    if (!selectedSlot) {
      toast.error("Invalid time slot.");
      setLoadingSubmit(false);
      return;
    }

    const amount = selectedSlot.price;
    await handlePayment(amount, selectedSlot.duration);
  };

  const handlePayment = async (amount, duration) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load Razorpay. Please try again.");
      setLoadingSubmit(false);
      return;
    }

    let orderData;
    try {
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error);
    } catch (err) {
      toast.error("Could not initiate payment. Please try again.");
      setLoadingSubmit(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SimplyTalk",
      description: `Session Booking - ${duration} (₹${amount})`,
      order_id: orderData.id,
      handler: async function (response) {
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
              amount,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) {
            toast.error(verifyData.error || "Payment verification failed.");
          } else {
            toast.success(`Your ${duration} session is confirmed!`);
            setName("");
            setPhone("");
            setLanguage("");
            setDate(getTodayDateString());
            setTimeSlot("");
            setTopic("");
            setShortDescription("");
            setAge("");
          }
        } catch (err) {
          toast.error("Payment verification failed. Please contact support.");
        } finally {
          setLoadingSubmit(false);
        }
      },
      prefill: { name, contact: phone },
      theme: { color: "#14b8a6" },
      modal: {
        ondismiss: () => setLoadingSubmit(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const getSlotDisplayLabel = (slot) => {
    const isBooked = bookedSlots.includes(slot.label);
    if (isBooked) return `${slot.label} - Booked`;
    return `${slot.label} - ₹${slot.price} (${slot.duration})`;
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

      {/* Terms Modal */}
      <Modal open={showTermsModal} onClose={() => setShowTermsModal(false)} title="Terms and Conditions">
        <div className="max-h-[80vh] min-h-[40vh] overflow-y-auto text-sm text-gray-700 mb-4 space-y-4">
          <p className="text-gray-800 mb-2">
            Disclaimer: SimplyTalk provides supportive listening only. It is not therapy, counseling, or medical advice.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>No sexual, abusive, or religious content is allowed.</li>
            <li>Payments are non-refundable, but one-time reschedule is allowed (24 hrs prior).</li>
            <li>Be on time. Late arrivals reduce session time.</li>
          </ul>
        </div>

        <div className="flex items-start mb-4">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms((v) => !v)}
            className="mr-2"
          />
          <label htmlFor="acceptTerms" className="text-sm">
            I agree to the{" "}
            <a href="/privacy" target="_blank" className="text-teal-600 underline hover:text-teal-800">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/refund-policy" target="_blank" className="text-teal-600 underline hover:text-teal-800">
              Refund/Reschedule Policy
            </a>.
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setShowTermsModal(false)}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 ${!acceptTerms ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!acceptTerms}
            onClick={handleAcceptTerms}
          >
            Accept & Pay
          </button>
        </div>
      </Modal>
    </section>
  );
}
