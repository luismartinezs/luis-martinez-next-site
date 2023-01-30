import { FC } from "react";

import Card from "components/Card";

const PostThumbnail: FC<{
  slug: string;
  title: string;
  createdAt: string;
  image: string;
}> = ({ slug, title, createdAt, image }) => {
  return (
    <li>
      <Card
        imgUrl={image}
        title={title}
        footer={createdAt}
        href={`/blog/${slug}`}
      />
    </li>
  );
};

export default PostThumbnail;
