const FloatPill = ({ label }) => {
  return (
    <div className="fixed bottom-4 right-4 rounded-full py-1 px-2 text-sm bg-white text-primary-500 dark:bg-gray-600 dark:text-gray-300">
      {label}
    </div>
  );
};

export default FloatPill;
