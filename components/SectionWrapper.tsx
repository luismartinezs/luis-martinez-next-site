// adds vertical padding to a section

const SectionWrapper = ({ children, noPadding = false, size = "md" }) => {
  const baseClass = "section-wrapper";
  const sizeMap = {
    sm: "py-4",
    md: "py-6",
    lg: "py-10",
    xl: "py-16",
  };

  const classes = `${baseClass} ${noPadding ? "" : sizeMap[size]}`;

  return <div className={classes}>{children}</div>;
};

export default SectionWrapper;
