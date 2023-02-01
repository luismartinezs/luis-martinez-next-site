import classnames from "classnames";

import Styles from "./CardOverlay.module.scss";

const CardOverlay = (): JSX.Element => {
  return (
    <div
      className={classnames(
        "absolute object-cover w-full h-full",
        Styles.cardOverlay
      )}
    ></div>
  );
};

export default CardOverlay;
