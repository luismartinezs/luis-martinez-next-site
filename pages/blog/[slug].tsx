import { getAllPosts, getPost } from "lib/storyblok";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import Head from "next/head";

export async function getStaticPaths(): Promise<{
  paths: { params: { slug: string } }[];
  fallback: true | false | "blocking";
}> {
  const { posts } = await getAllPosts({ preview: true });

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  const { post } = await getPost({ slug, preview });

  return {
    props: {
      preview,
      post,
    },
  };
}

export default function PostPage({ post }) {
  const postData = useStoryblokState(post);
  if (!postData?.content) {
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
