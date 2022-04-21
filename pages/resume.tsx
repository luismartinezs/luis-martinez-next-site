import { getMarkdownContent } from "lib/markdown";
import MarkdownContent from "components/MarkdownContent";

export async function getStaticProps() {
  return {
    props: getMarkdownContent("content/resume.md"),
  };
}

const ResumePage = ({ frontmatter, content }) => {
  return <MarkdownContent frontmatter={frontmatter} content={content} />;
};

export default ResumePage;
