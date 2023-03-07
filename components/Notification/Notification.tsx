import classnames from "classnames";

const Notification = ({
  type,
  children,
}: {
  type: "warning" | "error" | "info";
  children?: React.ReactNode;
}): JSX.Element => {
  const classNames = {
    warning: "border-primary-500 bg-primary-50",
    error: "border-yellow-500 bg-yellow-50",
    info: "border-blue-500 bg-blue-50",
  };
  return (
    <div className={classnames("border-l-4 p-4", classNames[type])}>
      {children}
    </div>
  );
};

export default Notification;
