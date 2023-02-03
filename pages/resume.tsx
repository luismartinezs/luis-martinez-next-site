import { getMarkdownContent } from "lib/markdown";
import MarkdownContent from "components/MarkdownContent";
import BlockWrapper from "components/BlockWrapper";
import HeroTitle from "blocks/HeroTitle";
import PageLayout from "components/PageLayout";

export async function getStaticProps() {
  return {
    props: getMarkdownContent("content/resume.md"),
  };
}

const ResumePage = ({
  frontmatter,
  content,
}: ReturnType<typeof getMarkdownContent>) => {
  return (
    <PageLayout title="Resume">
      <MarkdownContent frontmatter={frontmatter} content={content} />
    </PageLayout>
  );
};

export default ResumePage;
