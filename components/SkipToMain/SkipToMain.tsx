const SkipToMain = (): JSX.Element => {
  return (
    <a
      className="absolute left-0 z-50 -translate-y-16 bg-primary-600 p-3 font-bold text-white focus:translate-y-0 focus:rounded-none"
      href="#main-content"
    >
      Skip Navigation
    </a>
  );
};

export default SkipToMain;
