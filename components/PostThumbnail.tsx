import Link from "next/link";

const PostThumbnail = ({ slug, title }) => {
  return (
    <li className="overflow-hidden flex rounded-xl hover:scale-[1.02] transition ease-in-out bg-gradient-to-r from-primary-500 to-secondary-500 focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-primary-100">
      <Link href={`/blog/${slug}`}>
        <a className="w-full h-full text-white font-bold tracking-wide text-lg">
          <h1 className="p-4">{title}</h1>
        </a>
      </Link>
    </li>
  );
};

export default PostThumbnail;
