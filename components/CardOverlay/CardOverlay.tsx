import classnames from "classnames";

import Styles from "./CardOverlay.module.css";

const CardOverlay = (): JSX.Element => {
  return (
    <div
      className={classnames(
        "absolute h-full w-full object-cover",
        Styles.cardOverlay
      )}
    ></div>
  );
};

export default CardOverlay;
