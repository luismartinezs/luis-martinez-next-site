import Link from "next/link";
import CloudinaryImage from "components/CloudinaryImage";

const PostThumbnail = ({ slug, title, image }) => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition ease-in-out hover:text-primary-500 text-gray-700 hover:border-primary-500 hover:shadow-xl">
      <Link href={`/blog/${slug}`}>
        <a className="w-full h-full">
          <CloudinaryImage width={650} height={340} alt={title} src={image} />
          <h1 className="p-4">{title}</h1>
        </a>
      </Link>
    </div>
  );
};

export default PostThumbnail;
