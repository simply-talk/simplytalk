import Link from "next/link";


export default function PrivacyPolicy() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At SimplyTalk, your privacy is important to us. We are committed to keeping your personal information secure and confidential.  
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We only collect the minimal information required to process your booking and provide support (such as your name, contact details, and payment info).
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <p className="mb-4">
        Your data will never be sold or shared with third parties, except where required by law or to process payments securely.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-6">
        You may contact us anytime at <a href="mailto:support@simplytalk.in" className="text-teal-600 underline">support@simplytalk.in</a> to request deletion or review of your data.
      </p>

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
