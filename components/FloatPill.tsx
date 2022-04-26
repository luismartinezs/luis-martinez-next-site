const FloatPill = ({ label }) => {
  return (
    <div className="z-10 shadow fixed bottom-4 right-6 rounded-full py-1 px-2 text-sm bg-white text-primary-500 dark:bg-gray-700 dark:text-gray-300">
      {label}
    </div>
  );
};

export default FloatPill;
