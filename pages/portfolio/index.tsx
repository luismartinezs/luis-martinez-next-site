import Head from "next/head";

import HeroTitle from "blocks/HeroTitle";
import BlockWrapper from "components/BlockWrapper";
import CloudinaryImage from "components/CloudinaryImage";
import PortfolioItem, { type IPortfolioItem } from "components/PortfolioItem";
import PageLayout from "components/PageLayout";

const commonImgProps = {
  width: 500,
  height: 300,
};

const portfolioItems: Array<IPortfolioItem> = [
  {
    id: "1",
    image: (
      <CloudinaryImage
        src="rotations-screenshot_glpinw"
        alt="Rotations Project Screenshot"
        priority
        {...commonImgProps}
      />
    ),
    title: "Rotations React Web App",
    description: (
      <>
        <p>
          A web app built with React, Firebase, TailwindCSS, and Mantine.dev and
          bootstrapped from my React starter template.
        </p>
        <p className="mt-1">
          The server state was handled with React-Query, and the global client
          state was conducted with Redux Toolkit.
        </p>
        <p className="mt-1">
          It allows the user to schedule habits. For example, the user may
          create a routine titled &quot;water the plants&quot; with a recurrence
          of one day.
        </p>
      </>
    ),
    url: "https://rotations-6f39b.firebaseapp.com/",
    imageSide: "left",
  },
  {
    id: "2",
    image: (
      <CloudinaryImage
        src="athleanx-home-workout-screenshot_qnyazl"
        alt="Athlean-X Home Workout App Screenshot"
        {...commonImgProps}
      />
    ),
    title: "AthleanX Home Workout App",
    description: (
      <>
        <p>Personal project.</p>
        <p className="mt-1">
          A progressive web application for mobile devices that helps with
          workouts at home. The app is a static single-page application
          developed with Vue 2 that behaves like a native mobile app.
        </p>
        <p className="mt-1">
          I designed and created the UI from scratch using Figma and Tailwind
          CSS.
        </p>
      </>
    ),
    url: "https://ahtleanx-home-workout.netlify.app/",
    githubUrl: "https://github.com/luismartinezs/ahtleanx-home-workout-app",
    imageSide: "right",
  },
];

const PortfolioPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Luis Martinez Web Developer</title>
      </Head>
      <PageLayout title="Explore my portfolio">
        <div className="mb-16 flex flex-col gap-16">
          {portfolioItems.map((item) => (
            <PortfolioItem key={item.id} {...item} />
          ))}
        </div>
      </PageLayout>
    </>
  );
};

export default PortfolioPage;
