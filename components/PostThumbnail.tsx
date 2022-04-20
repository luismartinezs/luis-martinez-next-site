import Link from "next/link";
import CloudinaryImage from "components/CloudinaryImage";

const PostThumbnail = ({ slug, title, image }) => {
  return (
    <div
      className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <Link href={`/blog/${slug}`}>
        <a>
          <CloudinaryImage
            width={650}
            height={340}
            alt={title}
            src={image}
          />
          <h1 className="p-4">{title}</h1>
        </a>
      </Link>
    </div>
  );
};

export default PostThumbnail