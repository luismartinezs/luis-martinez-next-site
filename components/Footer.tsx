import Link from "next/link";
import IconGithub from "~icons/mdi/github";
import IconTwitter from "~icons/mdi/twitter";
import IconLinkedIn from "~icons/mdi/linkedin";

const Footer = () => {
  return (
    <footer className="body-font relative w-screen bg-gray-200 text-gray-600 transition duration-300 dark:bg-gray-700 dark:text-gray-300">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 py-4 xl:flex-row-reverse xl:items-center xl:justify-between">
        <div className="flex gap-4 text-xl text-gray-900 dark:text-white">
          <Link href="https://github.com/luismartinezs">
            <span className="sr-only">Github profile</span>
            <IconGithub />
          </Link>
          <Link href="https://twitter.com/LuisMartinezSu2">
            <span className="sr-only">Twitter profile</span>
            <IconTwitter />
          </Link>
          <Link href="https://www.linkedin.com/in/luismarsu/">
            <span className="sr-only">LikedIn profile</span>
            <IconLinkedIn />
          </Link>
        </div>
        <div className="mt-2 flex flex-col items-center sm:flex-row">
          <span>
            © 2019-{new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="underline hover:text-primary-500 hover:no-underline dark:hover:text-primary-400"
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
