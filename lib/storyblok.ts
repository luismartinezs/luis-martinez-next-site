import { storyblokInit, apiPlugin, getStoryblokApi, ISbStoriesParams } from "@storyblok/react";
import StoryblokPage from "blocks/StoryblokPage";
import Post from "blocks/Post";
import RichText from "blocks/RichText";
import YoutubeVideo from "blocks/YoutubeVideo";
import CloudinaryImage from "blocks/CloudinaryImage";
import HeroTitle from "blocks/HeroTitle";
import SideNote from "blocks/SideNote";
// new block import here

type Version = "draft" | "published";
type Preview = boolean;

const sbApiKey = process.env.NEXT_PUBLIC_STORYBLOK_API_KEY;

export function initStoryblok() {
  const components = {
    RichText,
    YoutubeVideo,
    page: StoryblokPage,
    post: Post,
    CloudinaryImage,
    HeroTitle,
    SideNote,
    // add new block here
  };

  storyblokInit({
    accessToken: sbApiKey,
    use: [apiPlugin],
    components,
  });
}

export async function getStory({
  slug,
  preview,
}: {
  slug: string;
  preview: Preview;
}) {
  const storyblokApi = getStoryblokApi();
  const version: Version = preview ? "draft" : "published";

  let data;
  try {
    ({ data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
    }));
    return {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    };
  } catch (err) {
    return {
      story: false,
      key: false,
    };
  }
}

export async function getAllStories({
  preview,
  ...params
}: {
  preview: Preview;
} & Omit<ISbStoriesParams, 'version'>) {
  const storyblokApi = getStoryblokApi();
  const version: Version = preview ? "draft" : "published";

  try {
    let stories = await storyblokApi.getAll(`cdn/stories`, {
      version,
      ...params,
    });
    return stories ? { stories } : { stories: [] };
  } catch (err) {
    return {
      stories: [],
    }
  }
}

export async function getAllPosts({ preview, ...params }: { preview: Preview } & Omit<ISbStoriesParams, 'version' | 'starts_with'>) {
  const { excluding_fields } = params
  const baseExcludingFields = "body, socialImage, description"
  let { stories } = await getAllStories({
    preview,
    starts_with: `blog/`,
    excluding_fields: excluding_fields ? `${excluding_fields}, ${baseExcludingFields}` : baseExcludingFields,
    ...params
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
  if (typeof slug !== "string") {
    return {
      post: false,
    };
  }

  const slugParts = slug.split("blog/");

  if (slugParts.length === 0 || !Array.isArray(slugParts)) {
    return {
      post: false,
    };
  }

  const _slug = slugParts[slugParts.length - 1];

  let { story } = await getStory({
    slug: `blog/${_slug}`,
    preview,
  });

  return { post: story };
}
