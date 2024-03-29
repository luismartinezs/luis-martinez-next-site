import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { Inter, Lora } from "next/font/google";
import classnames from "classnames";

import Layout from "components/Layout";
import { initStoryblok } from "lib/storyblok";
import { GTM_ID, pageview, gtmVirtualPageView } from "lib/gtm";
import ThemeProvider from "store/Theme";
import { wrapper } from "store/store";
import MobileMenuHandler from "components/MobileMenuHandler";

import "../styles/globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

initStoryblok();

function useGDPRAccepted() {
  const [gdprAccepted, setGdprAccepted] = useState<string | null>(null);

  useEffect(() => {
    const gdprValue = localStorage.getItem("GDPR:accepted");
    setGdprAccepted(gdprValue);
  }, []);

  return gdprAccepted;
}

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter();
  const canonicalUrl = (
    `https://www.webdevluis.com` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];

  const gdpr = useGDPRAccepted();

  const getGAScript = () => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== "production") {
      return <></>;
    }
    if (typeof gdpr !== "undefined" && gdpr === "true") {
      return (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          ></Script>
          <Script id="ga-script" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID});`}
          </Script>
        </>
      );
    }
    return <></>;
  };

  const getGtmScript = () => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== "production") {
      return <></>;
    }
    if (typeof gdpr !== "undefined" && gdpr === "true") {
      return (
        <Script id="gtm" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
        </Script>
      );
    }
    return <></>;
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps, router.pathname]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Luis Martinez - Web Developer</title>
        <meta name="application-name" content="Luis Web" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Luis Web" />
        <meta name="description" content="Luis Martinez - Web Developer" />
        <meta name="keywords" content="Keywords" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5654e1"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="Luis Web" />
        <meta
          name="twitter:description"
          content="Luis Martinez - Web Developer"
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@LuisMartinezSu2" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Luis Web" />
        <meta
          property="og:description"
          content="Luis Martinez - Web Developer"
        />
        <meta property="og:site_name" content="Luis Web" />
        <meta property="og:url" content="https://www.luis-martinez.net" />
        <meta
          property="og:image"
          content="https://www.luis-martinez.net/icons/apple-touch-icon.png"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <div className={classnames(inter.variable, "font-sans", lora.variable)}>
        {getGtmScript()}
        {getGAScript()}
        <Provider store={store}>
          <MobileMenuHandler />
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default MyApp;
