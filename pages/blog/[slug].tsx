import { getAllPosts, getPost } from "lib/storyblok";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import Head from "next/head";
import WidthWrapper from "components/WidthWrapper";

export async function getStaticPaths(): Promise<{
  paths: { params: { slug: string } }[];
  fallback: true | false | "blocking";
}> {
  const { posts } = await getAllPosts({ version: "draft" });

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { post } = await getPost({ slug, version: "draft" });

  return {
    props: {
      post,
    },
  };
}

export default function PostPage({ post }) {
  post = useStoryblokState(post);
  return (
    <>
      <Head>
        <title>{post.content.title}</title>
        <meta name="description" content={post.content.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="prose custom-prose">
        <WidthWrapper width="text">
          <h1>{post.content.postTitle}</h1>
        </WidthWrapper>
        <StoryblokComponent blok={post.content} />
      </article>
    </>
  );
}
