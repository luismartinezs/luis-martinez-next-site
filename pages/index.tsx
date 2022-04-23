import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostsGrid from "components/PostsGrid";

export async function getStaticProps() {
  const { posts } = await getAllPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

const Home: NextPage = ({ posts }) => {
  posts = useStoryblokState(posts);

  if (!posts) {
    return <div>No posts</div>;
  }

  return (
    <div>
      <Head>
        <title>Luis Martinez - Web Developer</title>
        <meta name="description" content="Luis Martinez - Web Developer" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PostsGrid posts={posts} />
    </div>
  );
};

export default Home;
