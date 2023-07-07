import { PropsWithChildren } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import TopBand from "components/TopBand";
import CookieModal from "components/CookieModal";
import ClientOnly from "components/ClientOnly";
import StickyTop from "components/StickyTop";
import FloatPill from "components/FloatPill";
import Link from "next/link";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV as string;
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

const Layout = ({ children }: PropsWithChildren) => {
  const cookieMessage = (
    <p>
      I use cookies for Google Analytics. By clicking on <i>Accept</i>, you
      consent to this. To find out more about my use of cookies, please see the{" "}
      <Link
        href="/privacy-policy"
        className="text-primary-100 underline hover:text-primary-200"
      >
        Privacy Policy
      </Link>
    </p>
  );

  return (
    <div className="flex h-screen flex-col justify-between overflow-x-hidden transition duration-300 dark:bg-gray-800 dark:text-white">
      <ClientOnly>
        {!isProd && <FloatPill label={appEnv} />}
        <CookieModal
          message={cookieMessage}
          acceptLabel="ACCEPT"
          denyLabel="DENY"
        />
      </ClientOnly>
      <div className="relative">
        <StickyTop>
          <TopBand />
          <Header />
        </StickyTop>
        <main className="mx-auto w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
