import CloudinaryImage from "components/CloudinaryImage";

const HeroTitle = ({ blok, featuredImage, postTitle }) => {
  const _title = blok.title || postTitle;
  const _imgSrc = blok.bgImageSrc || featuredImage;

  return (
    <div className="rounded-xl relative flex items-center overflow-hidden w-full h-[25rem]">
      <div className="absolute overflow-hidden min-h-full">
        <div className="z-10 bg-gradient-to-t from-gray-900 to-transparent absolute inset-0"></div>
        <CloudinaryImage src={_imgSrc} alt="" />
      </div>
      <h1 className="absolute bottom-0 z-10 text-white px-10 pb-6 tracking-wide leading-tight mb-0 text-7xl">
        {_title}
      </h1>
    </div>
  );
};

export default HeroTitle;
