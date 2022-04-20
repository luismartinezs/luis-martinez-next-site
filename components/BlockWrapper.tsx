import type { BlockWidth } from "types/types";
import WidthWrapper from "./WidthWrapper";
import type { PropsWithChildren } from "types/types";

type BlockWrapperProps = {
  width?: BlockWidth;
};

const BlockWrapper: React.FC<PropsWithChildren & BlockWrapperProps> = ({
  children,
  width = "block",
}) => {
  return <WidthWrapper width={width}>{children}</WidthWrapper>;
};

export default BlockWrapper;
