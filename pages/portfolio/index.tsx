import HeroTitle from "blocks/HeroTitle";
import BlockWrapper from "components/BlockWrapper";
import CloudinaryImage from "components/CloudinaryImage";
import PortfolioItem from "components/PortfolioItem";

const portfolioItems: Array<{
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
  picture: JSX.Element;
}> = [
  {
    picture: (
      <CloudinaryImage
        src="rotations-screenshot_glpinw"
        alt="Rotations Project Screenshot"
      />
    ),
    title: "Rotations React Web App",
    description:
      "A web app that allows you to create and manage rotations for your team. Built with React, Next.js, TypeScript, Tailwind CSS, and Firebase.",
    url: "https://rotations.vercel.app/",
  },
];

const PortfolioPage = () => {
  return (
    <div>
      <div className="prose dark:prose-invert custom-prose">
        <HeroTitle postTitle="Explore my portfolio" />
      </div>
      <BlockWrapper>
        {portfolioItems.map((item, index) => (
          <PortfolioItem
            key={index}
            picture={item.picture}
            title={item.title}
            description={item.description}
            url={item.url}
            githubUrl={item.githubUrl || ""}
          />
        ))}
      </BlockWrapper>
    </div>
  );
};

export default PortfolioPage;
