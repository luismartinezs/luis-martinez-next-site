import PostMetadata from "components/PostMetadata";
import { useRef, useEffect, type FC } from "react";

const HeroTitle: FC<{ blok?: any; postTitle: string; createdAt: 'string'; isPost?: boolean }> = ({
  blok,
  postTitle,
  createdAt,
  isPost = false
}) => {
  const heroRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (heroRef && heroRef.current && wrapperRef && wrapperRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      wrapperRef.current.style.paddingBottom = `${heroHeight}px`;
    }
  }, [heroRef]);

  const _title = postTitle || blok?.title;

  return (
    <>
      <div ref={wrapperRef}>
        <div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 px-10 py-8 w-screen absolute inset-x-0"
          ref={heroRef}
        >
          <h1 className="mb-0 text-white text-2xl lg:text-4xl tracking-wide leading-tight mx-2 md:max-w-3xl md:mx-auto">
            {_title}
          </h1>
        </div>
      </div>
      {isPost && <PostMetadata createdAt={createdAt} />}
    </>
  );
};

export default HeroTitle;
