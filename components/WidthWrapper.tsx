import { PropsWithChildren } from "react";

import type { BlockWidth } from "types/types";

type WidthWrapperProps = PropsWithChildren<{
  width?: BlockWidth;
  hasWidth?: boolean;
  noPadding?: boolean;
}>;

const WidthWrapper = ({
  width = "block",
  hasWidth = true,
  noPadding = false,
  children,
}: WidthWrapperProps) => {
  const baseClass = "h-full mx-auto width-wrapper";
  const widthClass = () => {
    let _widthClass = "";

    if (hasWidth) {
      const widthMap = {
        text: "max-w-prose",
        block: "max-w-5xl",
        button: "max-w-sm sm:max-w-max",
      };

      _widthClass = widthMap[width];
      if (!noPadding) {
        const paddingMap = {
          text: "px-4 sm:px-6 md:px-0",
          block: "px-4 sm:px-6 lg:px-8 xl:px-0",
          button: "",
        };

        _widthClass += ` ${paddingMap[width]}`;
      }
    }

    return _widthClass;
  };
  const classes = `${baseClass} ${widthClass()}`;

  return <div className={classes}>{children}</div>;
};

export default WidthWrapper;
