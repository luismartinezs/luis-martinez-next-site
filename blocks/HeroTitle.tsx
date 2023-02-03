import BlockWrapper from "components/BlockWrapper";
import PostMetadata from "components/PostMetadata";
import { HeroTitle as HeroTitleComponent } from "components/HeroTitle";

const HeroTitle = ({
  blok,
  postTitle,
  createdAt,
  isPost = false,
}: {
  blok?: any;
  postTitle?: string;
  createdAt?: string;
  isPost?: boolean;
}) => {
  return (
    <BlockWrapper>
      <HeroTitleComponent title={blok?.title || postTitle} />
      {isPost && <PostMetadata createdAt={createdAt} />}
    </BlockWrapper>
  );
};

export default HeroTitle;
