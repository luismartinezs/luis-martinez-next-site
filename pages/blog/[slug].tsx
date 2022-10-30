import { useEffect, useState } from "react";
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
  const _preview = process.env.APP_ENV === "local" || preview;

  const { post } = await getPost({ slug, preview: _preview });

  return {
    props: {
      preview,
      post,
    },
  };
}

export default function PostPage({ post = null }) {
  const [url, setUrl] = useState("https://www.luis-martinez.net");
  useEffect(() => {
    setUrl(window.location.href);
  });

  const postData = useStoryblokState(post || {});
  if (!postData?.content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        {/* Meta tags generated with https://www.opengraph.xyz/ */}
        <title>{postData.content.title}</title>
        <meta name="description" content={postData.content.description} />
        <link rel="icon" href="/favicon.png" />
        {/* Facebook meta tags */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={postData.content.title} />
        <meta
          property="og:description"
          content={postData.content.description}
        />
        <meta property="og:image" content={postData.content.socialImage} />
        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="luis-martinez.net" />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={postData.content.title} />
        <meta
          name="twitter:description"
          content={postData.content.description}
        />
        <meta name="twitter:image" content={postData.content.socialImage} />
      </Head>
      <article className="prose break-words dark:prose-invert custom-prose">
        <StoryblokComponent blok={postData.content} />
      </article>
    </>
  );
}
