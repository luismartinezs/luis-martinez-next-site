import { getAllPosts, getPost } from "lib/storyblok";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import Head from "next/head";
import WidthWrapper from "components/WidthWrapper";

export async function getStaticPaths(): Promise<{
  paths: { params: { slug: string } }[];
  fallback: true | false | "blocking";
}> {
  const { posts } = await getAllPosts();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { post } = await getPost({ slug });

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function PostPage({ post }) {
  const postData = post ? useStoryblokState(post) : null;
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{postData.content.title}</title>
        <meta name="description" content={postData.content.description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <article className="prose dark:prose-invert custom-prose">
        <StoryblokComponent blok={postData.content} />
      </article>
    </>
  );
}
