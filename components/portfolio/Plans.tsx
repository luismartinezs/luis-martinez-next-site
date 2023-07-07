import Plan from "components/portfolio/Plan";

const plans = [
  {
    id: 0,
    isFree: true,
    title: "Guest User",
    ctaLabel: "Try it out",
    ctaHref: "https://weather-wardrobe-wizard.netlify.app/",
    description: "Enjoy our basic features without any costs",
    features: [
      "Access to current weather forecasts",
      "Clothing suggestions",
      "Metric/Imperial unit toggle",
      "Light/Dark theme option",
      "In-app weather alerts",
      "Persistent browser data",
    ],
  },
  {
    id: 1,
    isFree: true,
    title: "Signed-In User",
    ctaLabel: "Sign in to the app",
    ctaHref: "https://weather-wardrobe-wizard.netlify.app/signin",
    description: "Unlock premium features and save with an annual subscription",
    features: [
      "All Guest features",
      "Cross-device data persistence",
      "Recent locations history (up to 10)",
      "Push notifications for weather alerts",
      "Email, Google, or GitHub sign-in options",
    ],
  },
  {
    id: 2,
    isFree: false,
    price: "€8",
    recurrence: "month",
    title: "Premium User",
    ctaLabel: "See plans",
    ctaHref: "https://weather-wardrobe-wizard.netlify.app/plans",
    description:
      "Experience our full range of features and maximize your weather tracking",
    features: ["All Signed-In features", "AI-powered packing recommendations"],
  },
];

const Plans = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Designed for Every User
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose between Guest, Signed-In, or Premium users and enjoy a range
            of features tailored to your preferences and needs.
          </p>
        </div>
        <div className="mt-16 flex flex-col justify-center gap-4 sm:mt-24 lg:flex-row">
          {plans.map((plan) => (
            <Plan plan={plan} key={plan.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
