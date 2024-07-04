// adds vertical padding to a section
import { cn } from "lib/util";
import { PropsWithChildren } from "react";

const baseClass = "section-wrapper";
const sizeMap = {
  sm: "py-2 md:py-4",
  md: "py-4 md:py-6",
  lg: "py-6 md:py-10",
  xl: "py-10 md:py-16",
  "2xl": "py-16 md:py-20",
  "3xl": "py-16 md:py-24",
  "4xl": "py-16 md:py-32",
  "5xl": "py-16 md:py-40",
  "6xl": "py-16 md:py-48",
  "7xl": "py-16 md:py-56",
};

export type YPaddingSizes = keyof typeof sizeMap;

const SectionWrapper = ({
  children,
  noPadding = false,
  size = "md",
  className,
}: PropsWithChildren<{
  noPadding?: boolean;
  size?: keyof typeof sizeMap;
  className?: string;
}>) => {
  return (
    <div className={cn(baseClass, noPadding ? "" : sizeMap[size], className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
