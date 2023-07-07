import CloudinaryImage from "components/CloudinaryImage";
import { TiWeatherSunny } from "react-icons/ti";
import { GiClothes } from "react-icons/gi";
import { MdCrisisAlert } from "react-icons/md";

const features = [
  {
    name: "Real-time Weather Forecasts",
    icon: TiWeatherSunny,
    description:
      "Search for any location and get an 8-day weather forecast with a user-friendly chart showing temperature variations.",
  },
  {
    name: "Clothing Suggestions",
    description:
      "Based on the weather forecast, get suggested clothing items displayed as a list or image grid. You can easily select and deselect items",
    icon: GiClothes,
  },
  {
    name: "Weather Alerts",
    description:
      "Stay informed about extreme weather conditions with timely alerts",
    icon: MdCrisisAlert,
  },
];

const Features = () => {
  return (
    <div className="z-20 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-300">
                Explore a multitude of features designed to cater to your needs
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Cutting-edge features for an enhanced experience
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                A smooth and intuitive user experience. From real-time weather
                forecasting to AI-powered packing suggestions.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    {feature.icon && (
                      <dt className="inline font-semibold text-gray-900 dark:text-white">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-primary-600 dark:text-primary-400"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>
                    )}{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <CloudinaryImage
            src="Screenshot_from_2023-07-07_13-24-46_esba2m"
            alt="Weather Wardrobe Wizard screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
