import { Judson, Montserrat } from "next/font/google";
import "./globals.css";
import Seo from "./components/SEO";
import { Toaster } from "sonner";
import Header  from "./components/Header";
import Footer from "./components/Footer";


const judson = Judson({
  variable: "--font-judson",
  subsets:['latin'],
  weight:['400','700']
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets:['latin']
});

export const metadata = {
  title: "SimplyTalk",
  description: "Your Calm Conversation Call Line",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/simplytalk.svg" sizes="any" fetchPriority="" />

        <meta name="title" content="Talk to a Non-Judgmental Listener | SimplyTalk" />
        <meta name="description" content="Need someone to talk to? Book a confidential emotional support call with an online listener today. Multilingual and affordable support." />
        <meta name="keywords" content="simplytalk, talk to someone online, emotional help, online listener, support call, speak your mind, need to talk, someone to talk to, affordable therapy alternative, Indian mental health support, emotional wellness India" />

        <meta name="keywords" content="simplytalk, listener chat service, emotional venting call, talk therapy alternative, talk to someone for anxiety, safe space to speak, empathetic conversation online, non-clinical emotional support, anonymous listener online, virtual talking service, support for stress and overwhelm" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="format-detection" content="telephone=no" />

        <meta property="og:title" content="SimplyTalk | Emotional Support, Not Therapy" />
        <meta property="og:description" content="Speak freely with trained listeners in English, हिंदी, or मराठी. Affordable emotional support calls — no judgment, no diagnosis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://simplytalk.in" />
        <meta property="og:image" content="https://simplytalk.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="SimplyTalk" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourhandle" />
        <meta name="twitter:title" content="SimplyTalk | Affordable Online Emotional Support" />
        <meta name="twitter:description" content="Book your free 5-minute call today. Confidential, multilingual emotional support with a caring online listener." />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="SimplyTalk" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="application-name" content="SimplyTalk" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="SimplyTalk Team" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />

        <link rel="alternate" href="https://simplytalk.in" hrefLang="en-in" />
        <link rel="canonical" href="https://simplytalk.in" />

          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SimplyTalk",
              "url": "https://simplytalk.in",
              "logo": "/Logo.png",
              "description": "Confidential talking service offering emotional support calls in English, Hindi, and Marathi. First 5 minutes are free.",
              "sameAs": [
                "https://twitter.com/yourhandle",
                "https://www.linkedin.com/company/simplytalk"
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is this a therapy service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, SimplyTalk is not a therapy or psychiatry service. We offer emotional support through trained listeners."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does a call cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The first 5-minute call is free. After that, it’s ₹300 for a 25-minute session."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my conversation recorded?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, your call is 100% confidential and not recorded."
                  }
                }
              ]
            })
          }}
        />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Emotional Support Call",
        "provider": {
          "@type": "Organization",
          "name": "SimplyTalk",
          "url": "https://simplytalk.in"
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://simplytalk.in/#book",
            "inLanguage": "en",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "result": {
            "@type": "Reservation",
            "name": "Book a SimplyTalk Call"
          }
        }
      })
    }}
  />
      </head>
      <body
        className={`${judson.variable} ${montserrat.variable} antialiased`}
      >
      <Seo
        title="Talk Freely – Confidential Emotional Support Online | SimplyTalk"
        description="Book affordable emotional support calls with trained listeners. No therapy, just understanding—first 5 minutes free."
        url = 'https://simplytalk.in'
        image = '/simplytalk.png'
      />
        <Header />
        <main className="flex-grow">{children}</main>
        <Toaster position="top-right" richColors />
        <Footer />
      </body>
    </html>
  );
}