// components/Seo.js
import Head from 'next/head';

export default function Seo({
  title = 'SimplyTalk | Confidential Emotional Support Calls Online',
  description = 'Affordable online listener service. Talk with a non-judgmental, multilingual listener at SimplyTalk. Book your free 5-minute call today.',
  keywords = 'online listener service, confidential talking service, emotional support call, non-judgmental conversation, affordable listener online',
  url = 'https://simplytalk.in',
  image = '/Logo.png',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SimplyTalk" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yourhandle" />
      <meta name="twitter:creator" content="@yourhandle" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Tags */}
      <meta name="author" content="SimplyTalk" />
      <meta name="language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="index, follow" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="SimplyTalk" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="application-name" content="SimplyTalk" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="web" />
      <meta name="target" content="all" />
      <meta name="google" content="notranslate" />
    </Head>
  );
}
