import Link from "next/link";
import CssLogo from "components/CssLogo";

const Header = () => {
  return (
    <header className="container flex items-center justify-between p-4 mx-auto">
      <Link href="/" passHref={true}>
        <CssLogo />
      </Link>
      <nav className="flex justify-end space-x-8">
        <Link href="/" passHref={true}>
          <span className="text-gray-700 link link-primary">Home</span>
        </Link>
        <Link href="/about" passHref={true}>
          <span className="text-gray-700 link link-primary">About</span>
        </Link>
        <Link href="/resume" passHref={true}>
          <span className="text-gray-700 link link-primary">Resume</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
