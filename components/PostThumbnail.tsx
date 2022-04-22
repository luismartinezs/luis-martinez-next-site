import Link from "next/link";

const PostThumbnail = ({ slug, title }) => {
  return (
    <li className="overflow-hidden flex rounded-xl hover:scale-[1.02] border border-primary-200 shadow-md hover:shadow-lg hover:bg-primary-50 transition ease-in-out focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-primary-100 dark:border-primary-500 dark:hover:bg-gray-900 dark:focus-within:ring-primary-300 dark:focus-within:ring-offset-primary-900">
      <Link href={`/blog/${slug}`}>
        <a className="w-full h-full text-primary-500 font-bold tracking-wide text-lg dark:text-primary-100">
          <h1 className="p-4">{title}</h1>
        </a>
      </Link>
    </li>
  );
};

export default PostThumbnail;
