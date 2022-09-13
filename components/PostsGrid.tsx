import PostThumbnail from "components/PostThumbnail";
import BlockWrapper from "components/BlockWrapper";

const PostsGrid = ({ posts }) => {
  const sortedPosts = posts.sort((a, b) => {
    return b.content.createdAt < a.content.createdAt
      ? -1
      : b.content.createdAt > a.content.createdAt
      ? 1
      : 0;
  });
  return (
    <BlockWrapper>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Blog posts</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
        {sortedPosts.map(({ slug, content: { postTitle, featuredImage, createdAt } }) => (
          <PostThumbnail
            key={slug}
            slug={slug}
            title={postTitle}
            image={featuredImage}
            createdAt={createdAt}
          />
        ))}
      </ul>
    </BlockWrapper>
  );
};

export default PostsGrid;
