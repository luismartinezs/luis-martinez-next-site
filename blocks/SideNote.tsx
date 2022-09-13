import { storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";
import RichTextRenderer from "components/RichTextRenderer";
import IconInformationCircle from "~icons/heroicons-outline/information-circle.jsx";
import IconExclamationCircle from "~icons/heroicons-outline/exclamation-circle.jsx";

const SideNote = ({ blok }) => {
  const { type }: { type: "note" | "warning" } = blok;

  const _type = type || "note";

  const iconClass = "h-7 w-7";

  const classBase = {
    block: "border-l-2 rounded-r pl-8 pr-4 py-1 relative",
    icon: "rounded-full bg-white dark:bg-gray-800 max-w-min p-1 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  };

  const classMap = {
    note: {
      block: "bg-primary-100 dark:bg-gray-700 border-primary-500",
      icon: "text-primary-500",
    },
    warning: {
      block: "bg-yellow-100 dark:bg-gray-700 border-yellow-500",
      icon: "text-yellow-500",
    }
  };

  const getIcon = () => {
    switch (_type) {
      case "note":
        return <IconInformationCircle className={iconClass} />;
      case "warning":
        return <IconExclamationCircle className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <BlockWrapper width="text">
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <div className={`${classBase.block} ${classMap[_type].block}`}>
          <span className={`${classBase.icon} ${classMap[_type].icon}`}>
            {getIcon()}
          </span>
          <RichTextRenderer richTextContent={blok.content} />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default SideNote;
