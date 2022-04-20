import Header from "components/Header";
import Footer from "components/Footer";
import type { PropsWithChildren } from "types/types";

const Layout: React.FC<Required<PropsWithChildren>> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <div className="flex h-1">
          <div className="flex-1 h-full bg-primary-500" />
          <div className="flex-1 h-full bg-secondary-500" />
        </div>
        <Header />
        <main className="w-full mx-auto mt-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
