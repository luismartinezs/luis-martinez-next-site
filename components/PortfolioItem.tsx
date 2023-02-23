import { type FC } from "react";

export interface IPortfolioItem {
  id: string;
  title: string;
  description: JSX.Element;
  url: string;
  githubUrl?: string;
  image: JSX.Element;
  imageSide: "left" | "right";
}

const PortfolioItem: FC<IPortfolioItem> = ({
  image,
  title,
  description,
  url,
  githubUrl,
  imageSide,
}) => {
  return (
    <div className="rounded-xl bg-primary-50 p-10 shadow-xl shadow-primary-500/20 transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/50 dark:bg-gray-900 dark:shadow-gray-900/20 dark:hover:shadow-gray-900/50">
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0">
        <div
          className={`max-w-fit overflow-hidden rounded-lg shadow-lg shadow-primary-500/30 dark:border-2 dark:border-primary-500 dark:shadow-gray-900/30 lg:w-1/2 ${
            imageSide === "right" ? "lg:order-1 lg:ml-10" : "lg:mr-10"
          }`}
        >
          {image}
        </div>
        <div className="flex flex-col space-y-4 lg:w-1/2 lg:justify-center lg:p-10">
          <div>
            <h2 className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              {title}
            </h2>
          </div>
          <div className="text-lg sm:text-xl">{description}</div>
          <div className="flex space-x-4 text-lg sm:text-xl lg:flex-col lg:space-x-0 lg:space-y-2">
            <div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="link !text-primary-600 dark:!text-primary-400 dark:hover:!text-gray-900"
              >
                See project
              </a>
            </div>
            {githubUrl && (
              <div>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link !text-primary-600 dark:!text-primary-400 dark:hover:!text-gray-900"
                >
                  See code
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
