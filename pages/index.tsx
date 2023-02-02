import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostsGrid from "components/PostsGrid";
import HeroSection from "components/HeroSection";

export async function getStaticProps({ preview = null }) {
  const { posts } = await getAllPosts({
    preview: process.env.APP_ENV === "local" || !!preview,
  });

  return {
    props: {
      posts,
      preview,
    },
    revalidate: 60,
  };
}

const Home: NextPage<{ posts: any[] }> = ({ posts = [] }) => {
  const postsData = useStoryblokState<any[]>(posts);

  if (!posts.length || !postsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Luis Martinez - Web Developer</title>
        <meta name="description" content="Luis Martinez - Web Developer" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <HeroSection />
      <PostsGrid posts={postsData} />
      <div className="mt-12"></div>
    </div>
  );
};

export default Home;
