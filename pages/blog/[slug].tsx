import { getAllPosts, getPost } from "lib/storyblok";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";

export async function getStaticPaths(): Promise<{
  paths: { params: { slug: string } }[];
  fallback: true | false | "blocking";
}> {
  const { posts } = await getAllPosts({ version: "draft" });

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false, // false or 'blocking'
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
    <div className="prose mx-auto">
      <StoryblokComponent blok={post.content} />
    </div>
  );
}
