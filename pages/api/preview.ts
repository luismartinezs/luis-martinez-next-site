import { initStoryblok, getPost } from "lib/storyblok";

/**
references:
https://nextjs.org/docs/advanced-features/preview-mode
https://github.com/vercel/next.js/blob/canary/examples/cms-storyblok/pages/api/preview.js
*/

export default async function preview(req, res) {
  if (
    req.query.secret !== process.env.STORYBLOK_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  let post;

  if (/\/blog\//.test(req.query.slug)) {
    initStoryblok();
    const data = await getPost({ slug: req.query.slug, preview: true });
    if (!data || !data.post) {
      return res.status(401).json({ message: "Invalid slug" });
    }
    post = data.post;
  }

  // we're only handling blog posts or the home page, this will have to be extended if more pages get data from storyblok
  const redirectLocation = post?.slug ? `/blog/${post.slug}` : "/";

  res.setPreviewData({});
  res.writeHead(307, { Location: redirectLocation });
  res.end("Preview mode enabled");
}
