import Link from "next/link";
import IconGithub from "~icons/mdi/github";
import IconTwitter from "~icons/mdi/twitter";

const Footer = () => {
  return (
    <footer className="relative w-screen text-gray-600 transition duration-300 bg-gray-200 body-font dark:text-gray-300 dark:bg-gray-700">
      <div className="container flex flex-col px-5 py-4 mx-auto max-w-7xl xl:flex-row-reverse xl:justify-between xl:items-center">
        <div className="flex gap-4 text-xl text-gray-900 dark:text-white">
          <Link href="https://github.com/luismartinezs">
            <span className="sr-only">Github profile</span>
            <IconGithub />
          </Link>
          <Link href="https://twitter.com/LuisMartinezSu2">
            <span className="sr-only">Twitter profile</span>
            <IconTwitter />
          </Link>
        </div>
        <div className="flex flex-col items-center mt-2 sm:flex-row">
          <span>
            © 2019-{new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="underline hover:no-underline hover:text-primary-500 dark:hover:text-primary-400"
            >
              Luis Martinez Suarez
            </Link>{" "}
            - Built with NextJS, TailwindCSS and StoryblokCMS. Deployed with
            Netlify.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
