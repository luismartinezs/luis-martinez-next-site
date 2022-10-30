import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownContent = ({ frontmatter, content }) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <div className="prose dark:prose-invert custom-prose mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </>
  );
};

export default MarkdownContent;
