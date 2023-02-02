import PostMetadata from "components/PostMetadata";
import { useRef, useEffect, type FC } from "react";

const HeroTitle: FC<{
  blok?: any;
  postTitle: string;
  createdAt?: string;
  isPost?: boolean;
}> = ({ blok, postTitle, createdAt, isPost = false }) => {
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
          className="absolute inset-x-0 w-screen px-10 py-8 bg-gradient-to-r from-primary-500 to-secondary-500"
          ref={heroRef}
        >
          <h1 className="mx-2 mb-0 text-4xl font-semibold tracking-wide text-white sm:text-5xl lg:text-6xl md:max-w-3xl md:mx-auto font-display">
            {_title}
          </h1>
        </div>
      </div>
      {isPost && <PostMetadata createdAt={createdAt} />}
    </>
  );
};

export default HeroTitle;
