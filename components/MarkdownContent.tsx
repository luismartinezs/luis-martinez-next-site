import Head from "next/head";
import md from "markdown-it";

const MarkdownContent = ({ frontmatter, content }) => {
  return (
    <>
    <Head>
      <title>{frontmatter.title}</title>
    </Head>
    <div className="prose custom-prose mx-auto">
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  </>
  )
}

export default MarkdownContent