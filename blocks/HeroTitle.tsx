import { useRef, useEffect } from "react";

const HeroTitle = ({ blok, postTitle }) => {
  const heroRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (heroRef && heroRef.current && wrapperRef && wrapperRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      wrapperRef.current.style.paddingBottom = `${heroHeight}px`;
    }
  }, [heroRef]);

  const _title = blok?.title || postTitle;

  return (
    <div ref={wrapperRef}>
      <div
        className="bg-gradient-to-r from-primary-500 to-secondary-500 px-10 py-8 w-screen absolute inset-x-0"
        ref={heroRef}
      >
        <h1 className="mb-0 text-white tracking-wide leading-tight mx-2 md:max-w-3xl md:mx-auto">
          {_title}
        </h1>
      </div>
    </div>
  );
};

export default HeroTitle;
