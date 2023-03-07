import { getMarkdownContent } from "lib/markdown";
import MarkdownContent from "components/MarkdownContent";
import PageLayout from "components/PageLayout";
import CloudinaryImage from "components/CloudinaryImage";

export async function getStaticProps() {
  return {
    props: getMarkdownContent("content/about.md"),
  };
}

const AboutPage = ({
  frontmatter,
  content,
}: ReturnType<typeof getMarkdownContent>) => {
  return (
    <PageLayout title="About Luis Martínez">
      <div className="flex flex-col items-center lg:flex-row">
        <div className="bl-none mx-6 aspect-square min-w-[400px] max-w-[400px] overflow-hidden rounded-3xl shadow-lg lg:mx-0 lg:max-w-[500px] lg:rounded-full">
          <CloudinaryImage
            src="luis-martinez-profile_ka2cec"
            alt="Luis Martinez Profile"
            width="400"
            height="400"
            priority
          />
        </div>
        <p className="custom-prose prose mx-auto pt-12 dark:prose-invert lg:px-12 lg:pt-0">
          I am a web developer with a passion for creating beautiful, accessible
          and functional digital experiences. I have a background in science and
          IT project management, and my diverse skillset allows me to bring a
          unique perspective to web development.
        </p>
      </div>
      <MarkdownContent frontmatter={frontmatter} content={content} />
    </PageLayout>
  );
};

export default AboutPage;
