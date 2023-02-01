import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";

import { getAllPosts, getPost } from "lib/storyblok";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getAllPosts({
    preview: true,
    excluding_fields:
      "_uid, tags, title, createdAt, postTitle, description, socialImage, featuredImage",
  });

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { preview } = ctx;
  const { slug } = ctx.params as IParams;
  const _preview = process.env.APP_ENV === "local" || !!preview;
  const { post } = await getPost({ slug, preview: _preview });

  return {
    props: {
      preview: preview || null,
      post,
    },
  };
};

const PostPage = ({ post = {} }) => {
  const [url, setUrl] = useState("https://www.luis-martinez.net");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const postData = useStoryblokState<any>(post);
  if (!post || !postData?.content) {
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
};

export default PostPage;
