// import Image from "next/image";
// import { CloudinaryImageProps } from "types/types";

const CloudinaryImage = ({
  src,
  // width,
  // height,
  // loading = "lazy",
  alt = "",
  // layout = "responsive",
}) => {
  const hostUrl = `https://res.cloudinary.com/dicyllvry/image/upload/q_100/luis-martinez`;

  return (
    <img src={`${hostUrl}/${src}`} alt={alt} className="max-w-full h-auto object-fit" />
    // <Image
    //   className="object-center object-cover w-full h-full"
    //   src={`${hostUrl}/${src}`}
    //   alt={alt}
    //   width={width}
    //   height={height}
    //   layout={layout}
    //   quality={10}
    //   loading={loading}
    // />
  );
};

export default CloudinaryImage;
