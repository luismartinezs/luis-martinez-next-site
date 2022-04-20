import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CloudinaryImage from "components/CloudinaryImage";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

// export async function getStaticProps() {
//   const files = fs.readdirSync("posts");

//   const posts = files.map((fileName) => {
//     const slug = fileName.replace(".md", "");
//     const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
//     const { data: frontmatter } = matter(readFile);

//     return {
//       slug,
//       frontmatter,
//     };
//   });
//   return {
//     props: {
//       posts,
//     },
//   };
// }

// type Posts = Promise<ReturnType<typeof getStaticProps>>;

// const Home: NextPage = ({ posts }: { posts: Posts }) => {
//   return (
//     <div>
//       <Head>
//         <title>Luis Martinez - Web Developer</title>
//         <meta name="description" content="Luis Martinez - Web Developer" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
//         {posts.map(({ slug, frontmatter }) => (
//           <div
//             key={slug}
//             className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
//           >
//             <Link href={`/blog/${slug}`}>
//               <a>
//                 <CloudinaryImage
//                   width={650}
//                   height={340}
//                   alt={frontmatter.title}
//                   src={frontmatter.featuredImage}
//                 />
//                 <h1 className="p-4">{frontmatter.title}</h1>
//               </a>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export async function getStaticProps() {
  // the slug of the story
  let slug = "luis-martinez-net/blog/from-jobless-to-junior-frontend-developer-in-5-months";

  let params = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, params);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
  };
}

export default function Home({ story }) {
  story = useStoryblokState(story);

  return <StoryblokComponent blok={story.content} />;
}

// export default Home;
