import Link from "next/link";
import CssLogo from "components/CssLogo";
import { useRouter } from "next/router";
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
const baseLinkClass =
  "text-gray-700 hover:underline hover:text-primary-500 dark:text-white dark:hover:text-primary-200";

const Header = () => {
  const router = useRouter();
  const activeLinkClass = (href: string) =>
    router.asPath === href ? "underline" : "";

  const links = linksList.map(({ href, label }) => {
    return (
      <li key={href}>
        <Link href={href} passHref={true}>
          <a className={`${activeLinkClass(href)} ${baseLinkClass}`}>{label}</a>
        </Link>
      </li>
    );
  });

  return (
    <div className="w-full bg-white border-b-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition duration-300">
      <header className="p-4 flex items-center justify-between container mx-auto">
        <div className="flex items-center">
          <div className="lg:hidden">
            <CollapsibleMenu>
              {links}
              <ThemeSwitch />
            </CollapsibleMenu>
          </div>
          <Link href="/" passHref={true}>
            <a>
              <CssLogo />
            </a>
          </Link>
        </div>
        <nav>
          <ul className="hidden lg:flex justify-end items-center space-x-6 md:space-x-8 text-sm md:text-base">
            {links}
            <ThemeSwitch />
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
