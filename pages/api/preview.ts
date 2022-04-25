import { getPost } from "lib/storyblok";

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

  if (/\/blog\/\w/.test(req.query.slug)) {
    const { post } = await getPost({ slug: req.query.slug, preview: true });
    if (!post) {
      return res.status(401).json({ message: "Invalid slug" });
    }
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: `${req.query.slug}` });
  res.end("Preview mode enabled");
}
