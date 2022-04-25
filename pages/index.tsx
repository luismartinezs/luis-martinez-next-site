import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostsGrid from "components/PostsGrid";

export async function getStaticProps({ preview = null }) {
  const { posts } = await getAllPosts({ preview });
  return {
    props: {
      posts,
      preview
    },
    revalidate: 60,
  };
}

const Home: NextPage = ({ posts }) => {
  const postsData = useStoryblokState(posts);

  if (!postsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Luis Martinez - Web Developer</title>
        <meta name="description" content="Luis Martinez - Web Developer" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PostsGrid posts={postsData} />
    </div>
  );
};

export default Home;
