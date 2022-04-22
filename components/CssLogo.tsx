const CssLogo = () => {
  return (
    <div className="relative w-12 h-12 rounded select-none bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-200 dark:to-primary-400">
      <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 border-t-0 border-b-4 border-l-4 border-r-0 border-white dark:border-gray-800 transition duration-300">
        <div className="text-3xl font-bold text-white dark:text-gray-800 transition duration-300">
          M
        </div>
      </div>
    </div>
  );
};

export default CssLogo;
