const HeroTitle = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="m-0 font-display text-4xl font-semibold !leading-snug tracking-wide text-gray-600 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h1>
    </>
  );
};

export default HeroTitle;
