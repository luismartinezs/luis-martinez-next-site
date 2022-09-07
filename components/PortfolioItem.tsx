import { type FC } from "react";

const PortfolioItem: FC<{
  picture: JSX.Element;
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
}> = ({ picture, title, description, url, githubUrl }) => {
  return (
    <div className="shadow-xl shadow-primary-500/20 p-10 rounded-xl transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/50 bg-primary-50 dark:bg-gray-900 dark:shadow-gray-900/20 dark:hover:shadow-gray-900/50">
      <div className="flex flex-col space-y-6 items-center lg:flex-row lg:space-y-0 lg:space-x-10">
        <div className="rounded-lg overflow-hidden shadow-lg shadow-primary-500/30 dark:shadow-gray-900/30 dark:border-primary-500 dark:border-2 max-w-fit lg:w-1/2">
          {picture}
        </div>
        <div className="flex flex-col space-y-2 lg:w-1/2 lg:p-10 lg:justify-center">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              {title}
            </h3>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div className="flex space-x-4 lg:flex-col lg:space-x-0 lg:space-y-2">
            <div>
              <a href={url} target="_blank" rel="noreferrer">
                See project
              </a>
            </div>
            {githubUrl && (
              <div>
                <a href={githubUrl} target="_blank" rel="noreferrer">
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
