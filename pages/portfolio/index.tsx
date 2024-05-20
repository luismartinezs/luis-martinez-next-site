import Head from "next/head";

import CloudinaryImage from "components/CloudinaryImage";
import PortfolioItem, { type IPortfolioItem } from "components/PortfolioItem";
import PageLayout from "components/PageLayout";

const commonImgProps = {
  width: 500,
  height: 300,
};

const portfolioItems: Array<IPortfolioItem> = [
  {
    id: "5",
    image: (
      <CloudinaryImage
        src="eldenhub-screenshot_wsye0y"
        alt="Elden Hub Screenshot"
        priority
        {...commonImgProps}
      />
    ),
    title: "EldenHub",
    description: (
      <>
        <p>
          EldenHub (or Elden Ring Checklists) is a Next.js app that provides
          checklists for the videogame Elden Ring. It uses the browser storage
          to save user data and the app is fully responsive.
        </p>
        <p className="mt-2">
          The tech stack behind this app is Next.js, React and TailwindCSS. The
          app is hosted on Vercel and the source code is available on GitHub.
        </p>
      </>
    ),
    url: "https://eldenringbuilds.vercel.app/",
    githubUrl: "https://github.com/luismartinezs/elden-ring-builds-checklist",
    imageSide: "right",
  },
  {
    id: "4",
    image: (
      <CloudinaryImage
        src="ai-cook-screenshot_svufq9"
        alt="AI Cook Screenshot"
        priority
        {...commonImgProps}
      />
    ),
    title: "AI Cook",
    description: (
      <>
        <p>
          AI Cook is an app that provides AI-generated food recipes tailored to
          available ingredients, kitchen tools, and dietary preferences, its aim
          is to trivialize mundane meal planning.
        </p>
        <p className="mt-2">
          Built with Next.js and the T3 stack, AI Cook demonstrates the power of
          modern web development frameworks and technologies in creating a
          seamless experience, as well, it showcases the potential of AI in
          everyday tasks.
        </p>
      </>
    ),
    url: "https://ai-cook.webdevluis.com/",
    imageSide: "left",
  },
  {
    id: "3",
    image: (
      <CloudinaryImage
        src="weather-wardrobe-wizard-app_n2dhmm"
        alt="Weather Wardrobe Wizard Screenshot"
        priority
        {...commonImgProps}
      />
    ),
    title: "Weather Wardrobe Wizard",
    description: (
      <>
        <p>
          Weather forecasts and clothing suggestions based on user selected
          location. Built with NextJS/React, this PWA features a mobile-friendly
          UI and real-time data from the Open Weather API. The app supports
          multi-language, Stripe payments and Firebase for real-time updates,
          AI-enriched user experience and real-time error tracking with Sentry.
        </p>
      </>
    ),
    url: "https://weather-wardrobe-wizard.netlify.app/",
    githubUrl: "https://github.com/luismartinezs/weather-wardrobe-wizard",
    imageSide: "right",
    portfolioPath: "/portfolio/weather",
  },
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
