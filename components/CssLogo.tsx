import classnames from "classnames";

const CssLogo = ({ className }: { className?: string }) => {
  return (
    <div
      className={classnames(
        "relative h-12 w-12 select-none rounded bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-200 dark:to-primary-400",
        className
      )}
    >
      <div className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center border-t-0 border-b-4 border-l-4 border-r-0 border-white transition duration-300 dark:border-gray-800">
        <div className="text-3xl font-bold text-white transition duration-300 dark:text-gray-800">
          M
        </div>
      </div>
    </div>
  );
};

export default CssLogo;
