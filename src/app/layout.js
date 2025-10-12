import { Judson, Montserrat } from "next/font/google";
import "./globals.css";
import Seo from "./components/SEO";
import { Toaster } from "sonner";
import Header  from "./components/Header";
import Footer from "./components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  description:
    "SimplyTalk is your calm conversation line. Speak your heart out with caring listeners. No judgment, just genuine human connection and emotional relief.",
  keywords: [
    "talk to someone online",
    "emotional support India",
    "listener chat service",
    "online talk therapy alternative",
    "safe space to speak",
    "anxiety relief call",
    "empathetic listener online",
    "venting chat platform",
    "mental wellness India",
    "affordable emotional help",
    "talk to a listener",
    "virtual talking service",
    "speak your mind safely",
    "non-judgmental support",
    "online emotional help India",
    "simplytalk support line",
    "stress and overwhelm help",
    "need to talk to someone",
    "human connection online",
    "calm conversation app"
  ],
  openGraph: {
    title: "SimplyTalk",
    description:
      "Your calm conversation call line. Speak freely and find comfort with SimplyTalk’s compassionate listeners.",
    url: "https://simplytalk.in",
    siteName: "SimplyTalk",
    images: [
      "https://simplytalk.in/ogimage.png"
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SimplyTalk",
    description:
      "Your calm conversation call line. Speak freely and find comfort with SimplyTalk’s compassionate listeners.",
    images: ["https://simplytalk.in/ogimage.png"],
    creator:"Team Simplytalk",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/simplytalk.svg" sizes="any" fetchPriority="" />

      
      </head>
      <body
        className={`${judson.variable} ${montserrat.variable} antialiased`}
      >
    
        <Header />
        <main className="flex-grow">{children}</main>
        <Toaster position="top-right" richColors />
        <Footer />
      </body>
         <GoogleAnalytics gaId="G-MG11RVK4E3" />
    </html>
  );
}