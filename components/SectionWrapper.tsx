// adds vertical padding to a section
import { PropsWithChildren } from "react";

const baseClass = "section-wrapper";
const sizeMap = {
  sm: "py-4",
  md: "py-6",
  lg: "py-10",
  xl: "py-16",
  "2xl": "py-20",
  "3xl": "py-24",
  "4xl": "py-32",
  "5xl": "py-40",
  "6xl": "py-48",
  "7xl": "py-56",
};

export type YPaddingSizes = keyof typeof sizeMap;

const SectionWrapper = ({
  children,
  noPadding = false,
  size = "md",
}: PropsWithChildren<{
  noPadding?: boolean;
  size?: keyof typeof sizeMap;
}>) => {
  const classes = `${baseClass} ${noPadding ? "" : sizeMap[size]}`;

  return <div className={classes}>{children}</div>;
};

export default SectionWrapper;
