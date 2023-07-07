import { AiFillCheckCircle } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";

type Plan = {
  id: string | number;
  title: string;
  isFree: boolean;
  price?: string;
  recurrence?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  features?: string[];
};

const Plan = ({ plan }: { plan: Plan }) => {
  const {
    title,
    isFree,
    price,
    recurrence,
    description,
    ctaLabel,
    ctaHref,
    features,
  } = plan;
  return (
    <div className="mx-auto max-w-2xl border-t first:border-0 lg:mx-0 lg:flex lg:max-w-none lg:border-t-0 lg:border-l">
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl py-10 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">{title}</p>
            <p className="mt-6 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {isFree ? "Free" : price}
              </span>
              {recurrence && (
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                  / {recurrence}
                </span>
              )}
            </p>
            {ctaHref && (
              <a
                href={ctaHref}
                className="mt-10 block flex w-full items-center justify-center gap-x-2 rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{ctaLabel || "Get access"}</span>
                <BiLinkExternal />
              </a>
            )}
            {description && (
              <p className="mt-8 text-sm font-semibold">{description}</p>
            )}
            <dl className="mt-6 max-w-xl space-y-2 text-sm leading-7 text-gray-600 lg:max-w-none">
              {features &&
                !!features.length &&
                features.map((feature, index) => (
                  <div className="relative pl-9" key={index}>
                    <dt className="inline">
                      <AiFillCheckCircle
                        className="absolute left-1 top-1 h-5 w-5 text-primary-600"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </dt>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
