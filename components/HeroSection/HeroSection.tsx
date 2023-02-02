import BlockWrapper from "components/BlockWrapper";
import Link from "next/link";

const HeroSection = (): JSX.Element => {
  return (
    <BlockWrapper yPadding="4xl">
      <h2 className="text-lg font-bold tracking-wider text-transparent uppercase md:text-2xl bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-500">
        Hello, my name is Luis
      </h2>
      <h1 className="mt-4 text-5xl font-semibold text-gray-700 md:text-8xl font-display dark:text-gray-100">
        I code websites.
      </h1>
      <p className="mt-10 text-2xl !leading-10 text-gray-700 md:text-3xl dark:text-white">
        I&apos;m a front-end developer and I code web applications. I work for
        Toptal as a freelancer. When I have time I build{" "}
        <Link
          href="/portfolio"
          className="font-bold hover:text-primary-500 dark:hover:text-primary-400"
        >
          personal projects
        </Link>{" "}
        and write articles.
      </p>
    </BlockWrapper>
  );
};

export default HeroSection;
