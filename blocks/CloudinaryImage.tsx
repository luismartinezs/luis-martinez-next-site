import { storyblokEditable } from "@storyblok/react";
import BlockWrapper from "components/BlockWrapper";
import Image from "next/image";

const CloudinaryImage = ({ blok }) => {
  let { src, alt, width, height } = blok;
  width = Number(width);
  height = Number(height);
  const hostUrl = `https://res.cloudinary.com/dicyllvry/image/upload/q_100/luis-martinez`;
  return (
    <BlockWrapper width="text">
      <div
        {...storyblokEditable(blok)}
        key={blok._uid}
        style={{ position: "relative", width: "100%", height: "500px" }}
      >
        <Image
          className="object-center object-cover w-full h-full"
          src={`${hostUrl}/${src}`}
          alt={alt}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </BlockWrapper>
  );
};

export default CloudinaryImage;
