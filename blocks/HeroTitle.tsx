import BlockWrapper from "components/BlockWrapper";
import PostMetadata from "components/PostMetadata";
import { HeroTitle as HeroTitleComponent } from "components/HeroTitle";

const HeroTitle = ({
  blok,
  title,
  createdAt,
  isPost = false,
}: {
  blok?: any;
  title: string;
  createdAt?: string;
  isPost?: boolean;
}) => {
  return (
    <BlockWrapper>
      <HeroTitleComponent title={title || blok?.title} />
      {isPost && <PostMetadata createdAt={createdAt} />}
    </BlockWrapper>
  );
};

export default HeroTitle;
