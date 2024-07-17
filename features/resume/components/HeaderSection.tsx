import CloudinaryImage from "components/CloudinaryImage";

export function HeaderSection({
  fullName,
  jobTitle,
}: {
  fullName: string;
  jobTitle: string;
}) {
  return (
    <div className="mb-6 flex flex-col items-center gap-6 md:flex-row">
      <div className="bl-none order-2 aspect-square min-w-[200px] max-w-[200px] overflow-hidden rounded-lg shadow-lg md:order-1 md:min-w-[150px] md:max-w-[150px] lg:mx-0 lg:max-w-[150px]">
        <CloudinaryImage
          src="luis-martinez-profile_cropped_rvybfc"
          alt="Luis Martinez Profile"
          width="150"
          height="150"
          priority
        />
      </div>
      <div className="order-1 md:order-2">
        <h1 className="mb-4 text-xl font-bold" id="resume">
          Resume
        </h1>
        <h2 className="mb-4 font-display text-4xl font-bold text-gray-700">
          {fullName}
        </h2>
        <p className="text-lg text-gray-700">{jobTitle}</p>
      </div>
    </div>
  );
}
