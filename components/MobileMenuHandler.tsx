import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { setOpen } from "store/menuSlice";

const MobileMenuHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleCloseMenu = () => {
      dispatch(setOpen(false));
    };

    router.events.on("routeChangeStart", handleCloseMenu);
    return () => {
      router.events.off("routeChangeStart", handleCloseMenu);
    };
  }, [dispatch, router.events]);

  return <></>;
};

export default MobileMenuHandler;
