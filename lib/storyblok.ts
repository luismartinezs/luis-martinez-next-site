import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import StoryblokPage from "components/StoryblokPage";
import RichText from "components/RichText";
import YoutubeVideo from "components/YoutubeVideo";

const siteSlug = "luis-martinez-net";

export function initStoryblok() {
  const components = {
    RichText,
    YoutubeVideo,
    page: StoryblokPage,
  };

  storyblokInit({
    accessToken: process.env.STORYBLOK_API_KEY,
    use: [apiPlugin],
    components,
  });
}

type Version = "draft" | "published";

export async function getStory({
  slug,
  version = "draft",
}: {
  slug: string;
  version?: Version;
}) {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${siteSlug}/${slug}`, {
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

export async function getAllPosts({ version }: { version?: Version } = {}) {
  let _version = version || "draft";
  let { stories } = await getAllStories({
    version: _version,
    starts_with: `${siteSlug}/blog/`,
  });
  return { posts: stories };
}
