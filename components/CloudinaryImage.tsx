import Image from "next/image";

type CloudinaryImageProps = {
  src: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  alt?: string
};

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  width = 240,
  height = 750,
  loading = "lazy",
  alt = ''
}) => {
  const hostUrl = `https://res.cloudinary.com/dicyllvry/image/upload/q_100,w_${width},h_${height}/luis-martinez`;
  // https://res.cloudinary.com/dicyllvry/image/upload/luis-martinez/galen-crout-fItRJ7AHak8-unsplash_h5yt9m

  return (
    <Image
      className="object-center object-cover w-full h-full"
      src={`${hostUrl}/${src}`}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
      quality={10}
      loading={loading}
    />
  );
};

export default CloudinaryImage;
