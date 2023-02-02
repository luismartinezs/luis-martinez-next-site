import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import CssLogo from "components/CssLogo";
import ThemeSwitch from "components/ThemeSwitch";
import CollapsibleMenu from "components/CollapsibleMenu";

const linksList = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/resume",
    label: "Resume",
  },
];

const Header = () => {
  const router = useRouter();

  const links = linksList.map(({ href, label }) => {
    return (
      <li
        key={href}
        className={classnames(
          "pb-2 -mb-2 border-b-4",
          router.asPath === href
            ? "border-b-4 border-primary-500"
            : "border-transparent hover:border-gray-200"
        )}
      >
        <Link
          href={href}
          className={classnames("text-gray-600 font-semibold dark:text-white")}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <div className="w-full transition duration-300 bg-white border-b-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <header className="container flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="flex items-center">
          <div className="lg:hidden">
            <CollapsibleMenu>
              {links}
              <ThemeSwitch />
            </CollapsibleMenu>
          </div>
          <Link href="/" passHref={true}>
            <CssLogo />
          </Link>
        </div>
        <nav>
          <ul className="items-center justify-end hidden gap-4 text-sm lg:flex md:space-x-8 md:text-base">
            {links}
            <ThemeSwitch />
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
