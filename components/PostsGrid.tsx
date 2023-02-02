import BlockWrapper from "components/BlockWrapper";
import Card from "components/Card";

const PostsGrid = ({ posts }) => {
  const sortedPosts: any[] = posts.sort((a, b) => {
    return b.content.createdAt < a.content.createdAt
      ? -1
      : b.content.createdAt > a.content.createdAt
      ? 1
      : 0;
  });
  return (
    <BlockWrapper>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Blog posts
      </h2>
      <ul className="grid w-full grid-flow-row grid-cols-1 gap-12 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map(
          ({ slug, content: { postTitle, featuredImage, createdAt } }, idx) => (
            <li key={slug} className="flex justify-center">
              <Card
                imgProps={{
                  priority: idx < 3,
                }}
                imgUrl={featuredImage}
                title={postTitle}
                footer={createdAt}
                href={`/blog/${slug}`}
              />
            </li>
          )
        )}
      </ul>
    </BlockWrapper>
  );
};

export default PostsGrid;
