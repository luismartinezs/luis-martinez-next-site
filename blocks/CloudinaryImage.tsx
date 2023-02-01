import { SbBlokData, storyblokEditable } from "@storyblok/react";
import Image from "next/image";

import BlockWrapper from "components/BlockWrapper";
import { getImgUrl } from "lib/image";

const CloudinaryImage = ({
  blok,
  ...rest
}: {
  blok: SbBlokData;
  rest: Omit<React.ComponentProps<typeof Image>, "src" | "alt">;
}) => {
  let { src, alt } = blok;
  return (
    <BlockWrapper width="text" noPadding>
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <Image
          src={getImgUrl(src as string)}
          alt={alt as string}
          {...rest}
          className="h-auto max-w-full"
        />
      </div>
    </BlockWrapper>
  );
};

export default CloudinaryImage;
