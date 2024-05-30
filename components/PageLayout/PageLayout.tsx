import HeroTitle from "components/HeroTitle";
import BlockWrapper from "components/BlockWrapper";

const PageLayout = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      {title && (
        <BlockWrapper yPadding="lg">
          <div className="mt-6">
            <HeroTitle title={title} />
            {description && (
              <p className="mt-10 text-xl !leading-10 text-gray-700 dark:text-white md:text-2xl">
                {description}
              </p>
            )}
          </div>
        </BlockWrapper>
      )}
      <BlockWrapper>{children}</BlockWrapper>
    </div>
  );
};

export default PageLayout;
