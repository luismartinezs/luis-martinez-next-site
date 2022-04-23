import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import { initStoryblok } from "lib/storyblok";
import { GTM_ID, pageview } from "lib/gtm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import ThemeProvider from "store/Theme";

initStoryblok();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [gdpr, setGdpr] = useState(null);

  useEffect(() => {
    setGdpr(localStorage.getItem("GDPR:accepted"));
  }, []);

  const getGtmScript = () => {
    if (process.env.NODE_ENV !== "production") {
      return <></>;
    }
    if (typeof gdpr !== "undefined" && gdpr === "true") {
      return (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `,
          }}
        />
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

  return (
    <>
      {getGtmScript()}
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
