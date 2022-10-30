import { FC } from "react";

import Link from "next/link";

const PostThumbnail: FC<{ slug: string; title: string; createdAt: string }> = ({
  slug,
  title,
  createdAt,
}) => {
  return (
    <li className="overflow-hidden flex rounded-xl hover:scale-[1.02] border border-primary-200 shadow-md hover:shadow-lg hover:bg-primary-50 transition ease-in-out focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-primary-100 dark:border-primary-500 dark:hover:bg-gray-900 dark:focus-within:ring-primary-300 dark:focus-within:ring-offset-primary-900">
      <Link
        href={`/blog/${slug}`}
        className="flex flex-col justify-between w-full h-full p-4 space-y-4"
      >
        <h1 className="text-lg font-bold tracking-wide text-primary-500 dark:text-primary-100">
          {title}
        </h1>
        <time
          dateTime={createdAt}
          className="self-end text-sm font-light text-gray-500 dark:text-gray-400"
        >
          {createdAt}
        </time>
      </Link>
    </li>
  );
};

export default PostThumbnail;
