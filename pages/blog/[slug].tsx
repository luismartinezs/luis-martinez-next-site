import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import type { NextPage } from "next";
import remarkGfm from 'remark-gfm';

import { getAllPosts, getPost } from "lib/storyblok";

import HeroTitle from "components/HeroTitle";
import BlockWrapper from "components/BlockWrapper";

const mdxComponents = {
  HeroTitle,
  BlockWrapper,
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type LocalProps = {
  isLocal: true;
  frontmatter: Record<string, any>;
  mdxSource: MDXRemoteSerializeResult;
};

type StoryblokProps = { isLocal: false; post: any; preview?: boolean | null };
type PostPageProps = LocalProps | StoryblokProps;

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getAllPosts({
    preview: process.env.APP_ENV === "local",
    excluding_fields:
      "_uid, tags, title, createdAt, postTitle, description, socialImage, featuredImage",
  });

  const postsDirectory = path.join(process.cwd(), "content/blog");
  const mdxFiles = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  const localPaths = mdxFiles.map((filename) => ({
    params: { slug: filename.replace(/\.(md|mdx)$/, "") },
  }));
  const paths = [
    ...posts.map(({ slug }) => ({ params: { slug } })),
    ...localPaths,
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  preview = null,
}) => {
  const { slug } = params as IParams;

  const postsDirectory = path.join(process.cwd(), "content/blog");
  const extensions = [".md", ".mdx"];
  let localFilePath = "";
  for (const ext of extensions) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      localFilePath = fullPath;
      break;
    }
  }
  if (localFilePath) {
    const fileContents = fs.readFileSync(localFilePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm as any],
      },
      parseFrontmatter: false,
    });

    return {
      props: {
        isLocal: true,
        frontmatter,
        mdxSource,
      },
    };
  }

  const _preview = process.env.APP_ENV === "local" || !!preview;
  const { post } = await getPost({ slug, preview: _preview });

  return {
    props: {
      isLocal: false,
      preview: preview,
      post,
    },
    revalidate: 3600,
  };
};

const LocalPostPage: NextPage<LocalProps> = ({ frontmatter, mdxSource }) => (
  <>
    <Head>
      <title>{frontmatter.title || "Blog Post"}</title>
      <meta name="description" content={frontmatter.metadescription || ""} />
    </Head>
    <article className="prose break-words dark:prose-invert custom-prose">
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </article>
  </>
);

const StoryblokPostPage: NextPage<StoryblokProps> = ({ post }) => {
  const [url, setUrl] = useState("https://www.luis-martinez.net");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  const postData = useStoryblokState<any>(post);
  if (!postData?.content) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{postData.content.title}</title>
        <meta name="description" content={postData.content.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={postData.content.title} />
        <meta property="og:description" content={postData.content.description} />
        <meta property="og:image" content={postData.content.socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="webdevluis.com" />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={postData.content.title} />
        <meta name="twitter:description" content={postData.content.description} />
        <meta name="twitter:image" content={postData.content.socialImage} />
      </Head>
      <article>
        <StoryblokComponent blok={postData.content} />
      </article>
    </>
  );
};

const PostPage: NextPage<PostPageProps> = (props) =>
  props.isLocal ? <LocalPostPage {...props} /> : <StoryblokPostPage {...props} />;

export default PostPage;
