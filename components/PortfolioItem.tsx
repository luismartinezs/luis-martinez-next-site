import { type FC } from "react";
import classnames from "classnames";
import Link from "next/link";

export interface IPortfolioItem {
  id: string;
  title: string;
  description: JSX.Element;
  url: string;
  githubUrl?: string;
  image: JSX.Element;
  imageSide: "left" | "right";
  portfolioPath?: string;
}

const linkClassOverwrite =
  "!text-primary-600 hover:!text-white dark:!text-primary-400 dark:hover:!text-gray-900";

const PortfolioItem: FC<IPortfolioItem> = ({
  image,
  title,
  description,
  url,
  githubUrl,
  portfolioPath,
}) => {
  return (
    <div className="rounded-xl bg-primary-50 p-6 shadow-xl shadow-primary-500/20 transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/50 dark:bg-gray-900 dark:shadow-gray-900/20 dark:hover:shadow-gray-900/50">
      <div className="flex flex-col items-start space-y-4">
        <h2 className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
          {title}
        </h2>
        <div className="relative w-full max-w-xs overflow-hidden rounded-lg shadow-lg shadow-primary-500/30 dark:border-2 dark:border-primary-500 dark:shadow-gray-900/30">
          {image}
        </div>
        <div className="text-gray-700 dark:text-gray-300">{description}</div>
        <div className="flex space-x-4">
          {portfolioPath && (
            <div>
              <Link
                href={portfolioPath}
                className={classnames(
                  "link whitespace-nowrap",
                  linkClassOverwrite
                )}
              >
                Read more
              </Link>
            </div>
          )}
          <div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={classnames("link", linkClassOverwrite)}
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
                className={classnames("link", linkClassOverwrite)}
              >
                See code
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
