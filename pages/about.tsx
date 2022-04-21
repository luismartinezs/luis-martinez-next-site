import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

export async function getStaticProps() {
  const fileName = fs.readFileSync("content/about.md", "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  return {
    props: {
      frontmatter,
      content,
    },
  };
}

const AboutPage = ({ frontmatter, content }) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <div className="prose mx-auto">
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </>
  );
};

export default AboutPage;
