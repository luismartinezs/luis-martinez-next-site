import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostThumbnail from "components/PostThumbnail";
import WidthWrapper from "components/WidthWrapper";

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
      <WidthWrapper>
        <h2 className="text-3xl font-semibold text-gray-800">Blog posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
          {posts.map(({ slug, content: { postTitle, featuredImage } }) => (
            <PostThumbnail
              key={slug}
              slug={slug}
              title={postTitle}
              image={featuredImage}
            />
          ))}
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Home;
