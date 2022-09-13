import React, { type FC } from "react";

import IconMenu from "~icons/heroicons-solid/menu";
import IconX from "~icons/heroicons-solid/x";
import { selectIsMenuOpen, setOpen } from "store/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import OutsideAlerter from "components/OutsideAlerter";

const CollapsibleMenu: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isOpen = useSelector(selectIsMenuOpen);
  const dispatch = useDispatch();

  return (
    <OutsideAlerter onClickOutside={() => dispatch(setOpen(false))}>
      <div className="relative">
        <button
          onClick={() => dispatch(setOpen(!isOpen))}
          className="ml-2 mr-6"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? (
            <IconX className="h-8 w-8" />
          ) : (
            <IconMenu className="h-8 w-8" />
          )}
        </button>
        <nav
          className={`z-20 absolute bg-white dark:bg-gray-800 py-10 pr-16 pl-10 shadow-xl shadow-primary-500/20 rounded-md top-12 ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-8 text-xl">{children}</ul>
        </nav>
      </div>
    </OutsideAlerter>
  );
};

export default CollapsibleMenu;
