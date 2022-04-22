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

const version: Version =
  process.env.NODE_ENV === "production" ? "published" : "draft";

export async function getStory({ slug }: { slug: string }) {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version,
  });
  return {
    story: data ? data.story : false,
    key: data ? data.story.id : false,
  };
}

export async function getAllStories(options) {
  const storyblokApi = getStoryblokApi();
  let stories = await storyblokApi.getAll(`cdn/stories`, options);
  return {
    stories,
  };
}

export async function getAllPosts() {
  let { stories } = await getAllStories({
    version,
    starts_with: `blog/`,
  });
  return { posts: stories };
}

export async function getPost({ slug }: { slug: string }) {
  let { story } = await getStory({
    slug: `blog/${slug}`,
    version,
  });
  return { post: story };
}
