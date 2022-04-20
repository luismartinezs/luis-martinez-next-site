import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import RichText from "components/RichText";
import YoutubeVideo from "components/YoutubeVideo";
import Page from "components/Page";
import { storyblokInit, apiPlugin } from "@storyblok/react";

const components = {
  RichText,
  YoutubeVideo,
  page: Page,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY,
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
