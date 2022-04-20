import Image from "next/image";
import { CloudinaryImageProps } from "types/types";

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  width,
  height,
  loading = "lazy",
  alt = "",
  layout = "responsive",
}) => {
  const hostUrl = `https://res.cloudinary.com/dicyllvry/image/upload/q_100,w_${width},h_${height}/luis-martinez`;

  return (
    <Image
      className="object-center object-cover w-full h-full"
      src={`${hostUrl}/${src}`}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      quality={10}
      loading={loading}
    />
  );
};

export default CloudinaryImage;
