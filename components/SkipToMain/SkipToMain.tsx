const SkipToMain = (): JSX.Element => {
  return (
    <a
      className="absolute left-0 z-50 -translate-y-16 bg-primary-500 p-3 text-white focus:translate-y-0"
      href="#main-content"
    >
      Skip Navigation
    </a>
  );
};

export default SkipToMain;
