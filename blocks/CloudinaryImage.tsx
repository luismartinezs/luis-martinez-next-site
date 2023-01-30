import { SbBlokData, storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";

import { getImgUrl } from "lib/image";
// TODO having trouble with making image responsive with next/image!
// import Image from "next/image";

const CloudinaryImage = ({ blok }: { blok: SbBlokData }) => {
  let { src, alt } = blok;
  return (
    <BlockWrapper width="text" noPadding>
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <img src={getImgUrl(src)} alt={alt} className="h-auto max-w-full" />
        {/* <Image
          src={`${hostUrl}/${src}`}
          alt={alt}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
          className="h-auto max-w-full"
        /> */}
      </div>
    </BlockWrapper>
  );
};

export default CloudinaryImage;
