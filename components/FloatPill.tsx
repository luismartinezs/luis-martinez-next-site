import { type FC } from "react";

const FloatPill: FC<{ label: string }> = ({ label }) => {
  return (
    <div className="fixed bottom-4 right-6 z-10 rounded-full bg-white py-1 px-2 text-sm text-primary-800 shadow dark:bg-gray-700 dark:text-gray-300">
      {label}
    </div>
  );
};

export default FloatPill;
