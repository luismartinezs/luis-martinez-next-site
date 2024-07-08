import React, { useId, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface PillListProps {
  items: string[];
  maxItems?: number;
  isToggleable?: boolean;
}

const PillList = ({
  items,
  maxItems = 8,
  isToggleable,
}: PillListProps): JSX.Element => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldToggle = isToggleable && items.length > maxItems;

  const displayedItems =
    shouldToggle && isExpanded ? items : items.slice(0, maxItems);

  return (
    <div className="flex flex-wrap gap-2" id={id}>
      {displayedItems.map((item, index) => (
        <span
          key={index}
          className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          {item}
        </span>
      ))}
      {shouldToggle && (
        <button
          aria-controls={id}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center rounded-full bg-primary-200 px-3 py-1 text-xs font-medium text-primary-900 transition-colors duration-200 hover:bg-primary-500 hover:text-white focus:rounded-full dark:bg-primary-700 dark:text-primary-100 dark:hover:bg-primary-600"
        >
          {isExpanded ? (
            <>
              <MdExpandLess className="mr-1" /> Show Less
            </>
          ) : (
            <>
              <MdExpandMore className="mr-1" /> +{items.length - maxItems} More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default PillList;
