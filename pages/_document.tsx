import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {process.env.NODE_ENV === "production" && (
            <script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id="dc5efb05-dee7-403c-af5a-3282a839bf04"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
