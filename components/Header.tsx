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
          "-mb-2 border-b-4 pb-2",
          router.asPath === href
            ? "border-b-4 border-primary-500"
            : "border-transparent hover:border-gray-300 dark:hover:border-gray-500"
        )}
      >
        <Link
          href={href}
          className={classnames("font-semibold text-gray-600 dark:text-white")}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <div className="w-full border-b-2 border-gray-200 bg-white transition duration-300 dark:border-gray-700 dark:bg-gray-800">
      <header className="container mx-auto flex max-w-7xl items-center justify-between p-4">
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
          <ul className="hidden items-center justify-end gap-4 text-sm md:space-x-8 md:text-base lg:flex">
            {links}
            <ThemeSwitch />
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
