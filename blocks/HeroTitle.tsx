import Image from "next/image";

import BlockWrapper from "components/BlockWrapper";
import PostMetadata from "components/PostMetadata";
import { HeroTitle as HeroTitleComponent } from "components/HeroTitle";
import { cloudinaryLoader, getImgUrl } from "lib/image";
import { useState } from "react";
import WidthWrapper from "components/WidthWrapper";

const HeroTitle = ({
  blok,
  postTitle,
  createdAt,
  isPost = false,
  featuredImage,
}: {
  blok?: any;
  postTitle?: string;
  createdAt?: string;
  isPost?: boolean;
  featuredImage?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <BlockWrapper>
      <HeroTitleComponent title={blok?.title || postTitle} />
      {isPost && (
        <>
          <PostMetadata createdAt={createdAt} />
          {featuredImage && blok.showFeaturedImage && !imgError && (
            <div className="container relative aspect-3/2">
              <Image
                src={getImgUrl(featuredImage, "w_1200")}
                className="absolute h-full w-full object-cover object-center"
                alt=""
                fill
                loader={cloudinaryLoader}
                onError={() => setImgError(true)}
                priority
              />
            </div>
          )}
        </>
      )}
    </BlockWrapper>
  );
};

export default HeroTitle;
