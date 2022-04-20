import { storyblokEditable } from "@storyblok/react";
import RichTextRenderer from "components/RichTextRenderer";
import BlockWrapper from "components/BlockWrapper";

const RichText = ({ blok }) => {
  return (
    <BlockWrapper width="text">
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <RichTextRenderer richTextContent={blok.content} />
      </div>
    </BlockWrapper>
  );
};

export default RichText;
