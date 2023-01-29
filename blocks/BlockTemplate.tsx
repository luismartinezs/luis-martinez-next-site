import { SbBlokData, storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";

const BlockName = ({ blok }: {blok: SbBlokData}) => {
  return (
    <BlockWrapper width="text">
      <div {...storyblokEditable(blok)} key={blok._uid}>
        {/* handle {blok.content} */}
      </div>
    </BlockWrapper>
  );
};

export default BlockName;
