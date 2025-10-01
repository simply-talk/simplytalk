import Link from "next/link";

export default function TermsConditions() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Terms & Conditions</h1>
      <p className="mb-4">
        By booking a call with SimplyTalk, you agree to follow the terms outlined below.
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-6">
        <li>No pornographic, abusive, or religious content is permitted. Violations may result in termination of your call and possible ban.</li>
        <li>Payments are non-refundable.</li>
        <li>You may reschedule once (at no extra charge) if requested at least 24 hours before your booking time.</li>
        <li>Late arrivals may shorten your session without refund.</li>
        <li>SimplyTalk is a supportive listening service, not medical or therapeutic advice.</li>
      </ul>

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
