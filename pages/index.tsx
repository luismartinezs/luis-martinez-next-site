import type { NextPage } from "next";
import Head from "next/head";
import { useStoryblokState } from "@storyblok/react";
import { getAllPosts } from "lib/storyblok";
import PostsGrid from "components/PostsGrid";
import HeroSection from "components/HeroSection";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticProps({ preview = null }) {
  const { posts } = await getAllPosts({
    preview: process.env.APP_ENV === "local" || !!preview,
  });

  // Fetch local MDX posts from content/blog
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const mdxFiles = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  const localPosts = mdxFiles.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);
    return {
      slug,
      content: {
        postTitle: frontmatter.title || frontmatter.postTitle || null,
        featuredImage: frontmatter.featuredImage || frontmatter.image || null,
        createdAt: frontmatter.date || frontmatter.createdAt || null,
      },
    };
  });
  const allPosts = [...posts, ...localPosts];

  return {
    props: {
      posts: allPosts,
      preview,
    },
    revalidate: 60,
  };
}

const Home: NextPage<{ posts: any[] }> = ({ posts = [] }) => {
  const postsData = useStoryblokState<any[]>(posts);

  if (!posts.length || !postsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Luis Martinez - Web Developer</title>
        <meta name="description" content="Luis Martinez - Web Developer" />
      </Head>
      <HeroSection />
      <PostsGrid posts={postsData} />
      <div className="mt-12"></div>
    </div>
  );
};

export default Home;
