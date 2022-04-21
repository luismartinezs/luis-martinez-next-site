import { getMarkdownContent } from "lib/markdown";
import MarkdownContent from "components/MarkdownContent";
import BlockWrapper from "components/BlockWrapper";
import HeroTitle from "blocks/HeroTitle";

export async function getStaticProps() {
  return {
    props: getMarkdownContent("content/about.md"),
  };
}

const ResumePage = ({ frontmatter, content }) => {
  return (
    <div>
      <div className="prose custom-prose">
        <HeroTitle postTitle="About me" />
      </div>
      <BlockWrapper>
        <MarkdownContent frontmatter={frontmatter} content={content} />
      </BlockWrapper>
    </div>
  );
};

export default ResumePage;
