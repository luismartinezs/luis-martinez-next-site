import PostThumbnail from "components/PostThumbnail";
import BlockWrapper from "components/BlockWrapper";

const PostsGrid = ({ posts }) => {
  return (
    <BlockWrapper>
      <h2 className="text-3xl font-semibold text-gray-800">Blog posts</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
        {posts.map(({ slug, content: { postTitle, featuredImage } }) => (
          <PostThumbnail
            key={slug}
            slug={slug}
            title={postTitle}
            image={featuredImage}
          />
        ))}
      </ul>
    </BlockWrapper>
  );
};

export default PostsGrid;
