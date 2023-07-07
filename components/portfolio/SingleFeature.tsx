import CloudinaryImage from "components/CloudinaryImage";

const SingleFeature = () => {
  return (
    <div className="overflow-hidden bg-white bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="order-2 overflow-hidden  rounded-xl lg:order-1">
            <CloudinaryImage
              src="weather-app-ai-suggestions_pcomtc"
              alt="Weather Wardrobe Wizard screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
          <div className="order-1 lg:order-2 lg:pl-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                Unlock the Future of Wardrobe Planning with AI
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                AI-Powered Packing Suggestions, Just For You
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our premium service integrates OpenAI, offering you custom
                packing suggestions based on location and weather forecasts
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Let AI take your weather readiness to the next level
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
