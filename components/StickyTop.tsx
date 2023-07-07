const StickyTop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-30 w-full">{children}</div>
  );
};

export default StickyTop;
