import React, { useId, useState } from "react";

interface SimpleListProps {
  label: string;
  items: string[];
  maxItems?: number;
  isToggleable?: boolean;
}

function ToggleLabel({ label }: { label: string }) {
  return (
    <span className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500">
      {label}
    </span>
  );
}

export default function SimpleList({
  label,
  items,
  maxItems = 5,
  isToggleable,
}: SimpleListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldToggle = isToggleable && items.length > maxItems;
  const id = useId();

  const displayedItems = isExpanded ? items : items.slice(0, maxItems);

  return (
    <div className="mt-2 text-gray-500 dark:text-gray-400">
      <span className="text-gray-500 dark:text-gray-400">{label}:</span>{" "}
      <span className="text-gray-600 dark:text-gray-300" id={id}>
        {displayedItems.join(", ")}
        {!isExpanded && shouldToggle && "..."}
      </span>
      {shouldToggle && (
        <button
          aria-controls={id}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 focus:outline-none"
        >
          <ToggleLabel label={isExpanded ? "Show less" : "Show more"} />
        </button>
      )}
    </div>
  );
}
