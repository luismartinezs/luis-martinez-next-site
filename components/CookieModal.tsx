import { useState, useEffect } from "react";
import InfoIcon from "components/InfoIcon";
import Link from "next/link";

const defaultMessage = (
  <p>
    We use cookies to provide our services and for analytics and marketing. To
    find out more about our use of cookies, please see our{" "}
    <Link
      href="/privacy-policy"
      className="underline text-primary-100 hover:text-primary-200"
    >
      Privacy Policy
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
    <div className="fixed bottom-0 z-50 w-full text-white bg-primary-500">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-8 w-8 min-w-[30px]">
              <InfoIcon />
            </div>
            <div className="flex-grow">
              <div>{message}</div>
            </div>
          </div>
          <div className="flex justify-end flex-shrink">
            <button
              className="px-3 py-1 text-gray-200 bg-gray-900 rounded hover:bg-gray-800"
              onClick={accept}
            >
              {acceptLabel}
            </button>
            <button className="px-3 py-1 hover:text-primary-100" onClick={deny}>
              {denyLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
