import Image from "next/image";
import WidthWrapper from "components/WidthWrapper";

type FeaturedImageProps = {
  path: string;
  alt?: string;
};

const FeaturedImage = ({ path, alt = "" }: FeaturedImageProps) => {
  return (
    <WidthWrapper width="block" noPadding>
      <Image src={`luis-martinez/${path}`} alt={alt} />
    </WidthWrapper>
  );
};

export default FeaturedImage;
