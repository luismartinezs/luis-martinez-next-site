import { SbBlokData, storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";
// TODO having trouble with making image responsive with next/image!
// import Image from "next/image";

const CloudinaryImage = ({ blok }: { blok: SbBlokData }) => {
  let { src, alt } = blok;
  const hostUrl = `https://res.cloudinary.com/dicyllvry/image/upload/q_100/luis-martinez`;
  return (
    <BlockWrapper width="text" noPadding>
      <div {...storyblokEditable(blok)} key={blok._uid}>
        <img
          src={`${hostUrl}/${src}`}
          alt={alt}
          className="h-auto max-w-full"
        />
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
