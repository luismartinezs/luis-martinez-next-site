import { PropsWithChildren } from "react";

import type { BlockWidth } from "types/types";
import WidthWrapper from "./WidthWrapper";
import SectionWrapper, { YPaddingSizes } from "components/SectionWrapper";

type BlockWrapperProps = PropsWithChildren<{
  width?: BlockWidth;
  noPadding?: boolean;
  yPadding?: YPaddingSizes;
}>;

const BlockWrapper = ({
  children,
  width = "block",
  noPadding = false,
  yPadding = "md",
}: BlockWrapperProps) => {
  return (
    <SectionWrapper noPadding={noPadding} size={yPadding}>
      <WidthWrapper width={width}>{children}</WidthWrapper>
    </SectionWrapper>
  );
};

export default BlockWrapper;
