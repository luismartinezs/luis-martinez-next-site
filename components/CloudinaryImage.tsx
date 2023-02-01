import Image from "next/image";
// import { CloudinaryImageProps } from "types/types";

import { getImgUrl } from "lib/image";

const CloudinaryImage = (
  props: Omit<React.ComponentProps<typeof Image>, "src"> & {
    src: string;
  }
) => {
  const { src, alt, ...rest } = props;

  return (
    <Image
      className="object-cover object-center w-full h-full"
      src={getImgUrl(src)}
      alt={alt}
      {...rest}
    />
  );
};

export default CloudinaryImage;
