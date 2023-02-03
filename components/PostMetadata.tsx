import React, { FC } from "react";

import BlockWrapper from "components/BlockWrapper";

const PostMetadata: FC<{ createdAt?: string }> = ({ createdAt }) => {
  return (
    <BlockWrapper yPadding="md">
      {createdAt && (
        <div className="text-right">
          <time
            dateTime={createdAt}
            className="font-light text-gray-600 dark:text-gray-300"
          >
            <span className="text-gray-500 dark:text-gray-400">
              Post published on&nbsp;
            </span>
            {createdAt}
          </time>
        </div>
      )}
    </BlockWrapper>
  );
};

export default PostMetadata;
