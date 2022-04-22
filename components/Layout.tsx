import Header from "components/Header";
import Footer from "components/Footer";
import TopBand from "components/TopBand";
import type { PropsWithChildren } from "types/types";
import CookieModal from "components/CookieModal";
import ClientOnly from "components/ClientOnly";

const Layout: React.FC<Required<PropsWithChildren>> = ({ children }) => {
  const cookieMessage = (
    <p>
      I use cookies for Google Analytics. By clicking on <i>Accept</i>, you
      consent to this.
    </p>
  );

  return (
    <div className="flex flex-col justify-between h-screen">
      <ClientOnly>
        <CookieModal
          message={cookieMessage}
          acceptLabel="ACCEPT"
          denyLabel="DENY"
        />
      </ClientOnly>
      <div className="relative">
        <div className="sticky top-0 left-0 right-0 z-20">
          <div className="relative">
            <TopBand />
          </div>
          <div className="relative">
            <Header />
          </div>
        </div>
        <main className="w-full mx-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
