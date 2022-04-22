// Source: https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
import { SitemapStream, streamToPromise } from "sitemap";
import { getAllPosts } from "lib/storyblok";

const makeSitemap = async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    const pageSlugs = ["/", "/about", "/resume"];
    const pageOptions = {
      changefreq: "daily",
      priority: 0.9,
    };

    pageSlugs.forEach((slug) => {
      smStream.write({
        url: slug,
        ...pageOptions,
      });
    });

    // List of posts
    const posts = await getAllPosts();

    // Create each URL row
    if (posts && posts.length) {
      posts.forEach((post) => {
        smStream.write({
          url: `/blog/${post.slug}`,
          ...pageOptions,
        });
      });
    }

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};

export default makeSitemap;
