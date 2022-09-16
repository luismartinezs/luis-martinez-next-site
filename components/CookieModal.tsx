import { useState, useEffect } from "react";
import InfoIcon from "components/InfoIcon";
import Link from "next/link";

const defaultMessage = (
  <p>
    We use cookies to provide our services and for analytics and marketing. To
    find out more about our use of cookies, please see our{" "}
    <Link href="/privacy-policy" passHref={true}>
      <a>Privacy Policy</a>
    </Link>
    . By continuing to browse our website, you agree to our use of cookies.
  </p>
);

const CookieModal = ({
  message = defaultMessage,
  acceptLabel = "Accept",
  denyLabel = "Deny",
}) => {
  const [open, setOpen] = useState(true);

  const getGdpr = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("GDPR:accepted");
    }
    return null;
  };

  useEffect(() => {
    if (!getGdpr()) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      setOpen(false);
      localStorage.setItem("GDPR:accepted", "true");
    }
  };

  const deny = () => {
    if (typeof window !== "undefined") {
      setOpen(false);
      localStorage.setItem("GDPR:accepted", "false");
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="z-50 fixed bottom-0 bg-primary-500 text-white w-full">
      <div className="p-4">
        <div className="flex justify-center items-center space-y-2 flex-col lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex justify-center items-center space-x-2">
            <div className="h-8 w-8 min-w-[30px]">
              <InfoIcon />
            </div>
            <div className="flex-grow">
              <div>{message}</div>
            </div>
          </div>
          <div className="flex-shrink flex justify-end">
            <button
              className="
                py-1
                px-3
                rounded
                text-gray-200
                bg-gray-900
                hover:bg-gray-800
              "
              onClick={accept}
            >
              {acceptLabel}
            </button>
            <button className="py-1 px-3 hover:text-primary-100" onClick={deny}>
              {denyLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
