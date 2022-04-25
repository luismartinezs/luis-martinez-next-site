import Header from "components/Header";
import Footer from "components/Footer";
import TopBand from "components/TopBand";
import type { PropsWithChildren } from "types/types";
import CookieModal from "components/CookieModal";
import ClientOnly from "components/ClientOnly";
import StickyTop from "components/StickyTop";
import FloatPill from "components/FloatPill";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV

const Layout: React.FC<Required<PropsWithChildren>> = ({ children }) => {
  const cookieMessage = (
    <p>
      I use cookies for Google Analytics. By clicking on <i>Accept</i>, you
      consent to this.
    </p>
  );

  return (
    <div className="flex flex-col justify-between h-screen overflow-x-hidden dark:bg-gray-800 dark:text-white transition duration-300">
      <ClientOnly>
        <FloatPill label={appEnv} />
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
        <main className="w-full mx-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
