import type { BlockWidth } from "types/types";
import WidthWrapper from "./WidthWrapper";
import SectionWrapper from "./SectionWrapper";
import type { PropsWithChildren } from "types/types";

type BlockWrapperProps = {
  width?: BlockWidth;
  noPadding?: boolean;
  yPadding?: "sm" | "md" | "lg" | "xl";
};

const BlockWrapper: React.FC<PropsWithChildren & BlockWrapperProps> = ({
  children,
  width = "block",
  noPadding = false,
  yPadding = "md",
}) => {
  return (
    <SectionWrapper noPadding={noPadding} size={yPadding}>
      <WidthWrapper width={width}>{children}</WidthWrapper>
    </SectionWrapper>
  );
};

export default BlockWrapper;
