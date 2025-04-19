import { storyblokEditable } from "@storyblok/react";
import RichTextRenderer from "components/RichTextRenderer";
import BlockWrapper from "components/BlockWrapper";

const RichText = ({ blok }: { blok: any }) => {
  return (
    <BlockWrapper width="text" noPadding>
      <div
        {...storyblokEditable(blok)}
        key={blok._uid}
        className="prose break-words dark:prose-invert custom-prose"
      >
        <RichTextRenderer richTextContent={blok.content} />
      </div>
    </BlockWrapper>
  );
};

export default RichText;
