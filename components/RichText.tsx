import { storyblokEditable } from "@storyblok/react";
import RichTextRenderer from "components/RichTextRenderer";

const RichText = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <RichTextRenderer richTextContent={blok.content} />
    </div>
  );
};

export default RichText;
