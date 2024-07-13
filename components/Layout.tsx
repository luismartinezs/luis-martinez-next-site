import { PropsWithChildren } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import TopBand from "components/TopBand";
import ClientOnly from "components/ClientOnly";
import StickyTop from "components/StickyTop";
import FloatPill from "components/FloatPill";
import SkipToMain from "./SkipToMain";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV as string;
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col justify-between overflow-x-hidden transition duration-300 dark:bg-gray-800 dark:text-white">
      <SkipToMain />
      <ClientOnly>{!isProd && <FloatPill label={appEnv} />}</ClientOnly>
      <div className="relative">
        <StickyTop>
          <TopBand />
          <Header />
        </StickyTop>
        <main className="mx-auto w-full" id="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
