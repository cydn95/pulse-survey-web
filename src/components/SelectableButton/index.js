import React from "react";
import classnames from "classnames";

import styles from "./styles.scss";

function SelectableButton(props) {
  const { className, active, children, onClick } = props;
  const activeCls = active ? styles.active : "";
  return (
    <button
      className={classnames(styles.main, activeCls, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

SelectableButton.defaultProps = {
  type: "button",
  default: true,
  active: false,
};

export default SelectableButton;
