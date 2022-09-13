import { FC } from "react";

import Link from "next/link";

const PostThumbnail: FC<{ slug: string; title: string; createdAt: string }> = ({
  slug,
  title,
  createdAt,
}) => {
  return (
    <li className="overflow-hidden flex rounded-xl hover:scale-[1.02] border border-primary-200 shadow-md hover:shadow-lg hover:bg-primary-50 transition ease-in-out focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-primary-100 dark:border-primary-500 dark:hover:bg-gray-900 dark:focus-within:ring-primary-300 dark:focus-within:ring-offset-primary-900">
      <Link href={`/blog/${slug}`}>
        <a className="w-full h-full flex flex-col p-4 space-y-4 justify-between">
          <h1 className="text-primary-500 dark:text-primary-100 font-bold tracking-wide text-lg">
            {title}
          </h1>
          <time
            dateTime={createdAt}
            className="text-gray-500 dark:text-gray-400 text-sm font-light self-end"
          >
            {createdAt}
          </time>
        </a>
      </Link>
    </li>
  );
};

export default PostThumbnail;
