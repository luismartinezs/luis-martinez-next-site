import Document, { Html, Head, Main, NextScript } from "next/document";
import { GTM_ID } from "lib/gtm";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter;DM+Serif+Display&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <noscript>
            <iframe
              title="GTM"
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
