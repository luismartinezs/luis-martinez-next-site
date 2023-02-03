import Image from "next/image";
import classNames from "classnames";

import { cloudinaryLoader, getImgUrl } from "lib/image";

const CloudinaryImage = (
  props: Omit<React.ComponentProps<typeof Image>, "src" | "loader"> & {
    src: string;
    className?: string;
  }
) => {
  const { src, alt, className, ...rest } = props;

  return (
    <Image
      className={classNames(
        "h-full w-full object-cover object-center",
        className
      )}
      src={getImgUrl(src)}
      alt={alt}
      loader={cloudinaryLoader}
      {...rest}
    />
  );
};

export default CloudinaryImage;
