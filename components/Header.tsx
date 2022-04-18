import Link from "next/link";
import CssLogo from "components/CssLogo";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const baseLinkClass = "text-gray-700 hover:underline hover:text-primary-500";
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
    <header className="container flex items-center justify-between p-4 mx-auto">
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
      </nav>
    </header>
  );
};

export default Header;
