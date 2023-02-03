import HeroTitle from "components/HeroTitle";
import BlockWrapper from "components/BlockWrapper";

const PageLayout = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      <BlockWrapper yPadding="lg">
        <div className=" mt-6 ">
          <HeroTitle title={title} />
        </div>
      </BlockWrapper>
      <BlockWrapper>{children}</BlockWrapper>
    </div>
  );
};

export default PageLayout;
