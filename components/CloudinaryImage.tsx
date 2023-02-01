import Image from "next/image";

import { cloudinaryLoader, getImgUrl } from "lib/image";

const CloudinaryImage = (
  props: Omit<React.ComponentProps<typeof Image>, "src" | "loader"> & {
    src: string;
  }
) => {
  const { src, alt, ...rest } = props;

  return (
    <Image
      className="object-cover object-center w-full h-full"
      src={getImgUrl(src)}
      alt={alt}
      loader={cloudinaryLoader}
      {...rest}
    />
  );
};

export default CloudinaryImage;
