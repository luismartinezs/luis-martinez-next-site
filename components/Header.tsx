import Link from "next/link";
import CssLogo from "components/CssLogo";
import { useRouter } from "next/router";
import ThemeSwitch from "components/ThemeSwitch/ThemeSwitch";

const Header = () => {
  const router = useRouter();
  const baseLinkClass = "text-gray-700 hover:underline hover:text-primary-500 dark:text-white dark:hover:text-primary-200";
  const activeLinkClass = (href: string) =>
    router.asPath === href ? "underline" : "";
  const links = [
    {
      href: "/",
      label: "Home",
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

  return (
    <div className="w-full bg-white border-b-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition duration-300">
      <header className="p-4 flex items-center justify-between container mx-auto">
        <Link href="/" passHref={true}>
          <a>
            <CssLogo />
          </a>
        </Link>
        <nav className="flex justify-end space-x-8">
          {links.map(({ href, label }) => {
            return (
              <Link key={href} href={href} passHref={true}>
                <a className={`${activeLinkClass(href)} ${baseLinkClass}`}>
                  {label}
                </a>
              </Link>
            );
          })}
          <ThemeSwitch />
        </nav>
      </header>
    </div>
  );
};

export default Header;
