import { render } from "storyblok-rich-text-react-renderer";

const RichTextRenderer = ({ richTextContent }) => {
  return <>{render(richTextContent)}</>;
};

export default RichTextRenderer;
