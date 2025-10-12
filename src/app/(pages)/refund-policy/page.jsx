import Link from "next/link";
export const metadata = {
  title: "Refund Policy | SimplyTalk",
};
export default function RefundPolicy() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Refund & Reschedule Policy</h1>
      <p className="mb-4">
        At SimplyTalk, we aim to be fair and transparent with our users. Please read our refund and rescheduling policy carefully.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Refunds</h2>
      <p className="mb-4">All payments are final and non-refundable once a booking is confirmed.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Rescheduling</h2>
      <p className="mb-4">
        You may reschedule your session <strong>once</strong> at no extra charge, provided you request it at least 24 hours before your booked time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Missed Sessions</h2>
      <p className="mb-6">If you miss your session or are late, we cannot issue refunds or guarantee full time for your booking.</p>

      {/* Back button */}
      <Link
        href="/"
        className="inline-block mt-6 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        ← Back to Home
      </Link>
    </section>
  );
}
