import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import StoryblokPage from "blocks/StoryblokPage";
import Post from "blocks/Post";
import RichText from "blocks/RichText";
import YoutubeVideo from "blocks/YoutubeVideo";
import CloudinaryImage from "blocks/CloudinaryImage";
import HeroTitle from "blocks/HeroTitle";

export function initStoryblok() {
  const components = {
    RichText,
    YoutubeVideo,
    page: StoryblokPage,
    post: Post,
    CloudinaryImage,
    HeroTitle,
  };

  storyblokInit({
    accessToken: process.env.STORYBLOK_API_KEY,
    use: [apiPlugin],
    components,
  });
}

type Version = "draft" | "published";
type Preview = true | null;

const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

export async function getStory({
  slug,
  preview,
}: {
  slug: string;
  preview: null | true;
}) {
  const storyblokApi = getStoryblokApi();
  const version: Version = preview || !isProd ? "draft" : "published";

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version,
  });

  return {
    story: data ? data.story : false,
    key: data ? data.story.id : false,
  };
}

export async function getAllStories({
  preview,
  ...rest
}: {
  preview: Preview;
  [index: string]: any;
}) {
  const storyblokApi = getStoryblokApi();
  const version: Version = preview || !isProd ? "draft" : "published";

  let stories = await storyblokApi.getAll(`cdn/stories`, {
    version,
    ...rest,
  });
  return {
    stories,
  };
}

export async function getAllPosts({ preview }: { preview: Preview }) {
  let { stories } = await getAllStories({
    preview,
    starts_with: `blog/`,
  });
  return { posts: stories };
}

export async function getPost({
  slug,
  preview,
}: {
  slug: string;
  preview: Preview;
}) {
  const _slug = slug.split("blog/").at(-1);
  let { story } = await getStory({
    slug: `blog/${_slug}`,
    preview,
  });
  return { post: story };
}
