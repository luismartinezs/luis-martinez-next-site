import { SbBlokData, storyblokEditable } from "@storyblok/react";
import Image from "next/image";

import BlockWrapper from "components/BlockWrapper";
import { cloudinaryLoader, getImgUrl } from "lib/image";

const CloudinaryImage = ({
  blok,
  ...rest
}: {
  blok: SbBlokData;
  rest: Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "loader">;
}) => {
  let { src, alt } = blok;
  return (
    <BlockWrapper width="text" noPadding>
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <Image
          className="h-auto max-w-full"
          src={getImgUrl(src as string)}
          alt={alt as string}
          loader={cloudinaryLoader}
          width={731}
          height={412}
          {...rest}
        />
      </div>
    </BlockWrapper>
  );
};

export default CloudinaryImage;
