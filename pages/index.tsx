import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostThumbnail from "components/PostThumbnail";

export async function getStaticProps() {
  const { posts } = await getAllPosts();
  return {
    props: {
      posts,
    },
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {posts.map(({ slug, content: { postTitle, featuredImage } }) => (
          <PostThumbnail
            key={slug}
            slug={slug}
            title={postTitle}
            image={featuredImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
