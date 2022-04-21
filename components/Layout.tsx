import Header from "components/Header";
import Footer from "components/Footer";
import TopBand from "components/TopBand";
import type { PropsWithChildren } from "types/types";

const Layout: React.FC<Required<PropsWithChildren>> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
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
