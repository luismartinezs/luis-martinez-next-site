import { PropsWithChildren } from "react";
import IconMenu from "~icons/heroicons-solid/menu";
import IconX from "~icons/heroicons-solid/x";
import { useDispatch, useSelector } from "react-redux";

import { selectIsMenuOpen, setOpen } from "store/menuSlice";
import OutsideAlerter from "components/OutsideAlerter";

const CollapsibleMenu = ({ children }: PropsWithChildren) => {
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
          className={`absolute top-12 z-20 rounded-md bg-white py-10 pl-10 pr-16 shadow-xl shadow-primary-500/20 dark:bg-gray-800 ${
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
