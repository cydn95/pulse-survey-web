import React from "react";
import classnames from "classnames";

import styles from "./styles.scss";

function Button(props) {
  const { className, type, children, onClick, default: isDefault, style, disabled } = props;
  return (
    <button
      className={classnames(
        styles.main,
        isDefault ? disabled ? null : styles.default : null,
        className
      )}
      type={type}
      onClick={onClick}
      {...{ autoFocus: isDefault }}
      style={{ ...style }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  default: true,
};

export default Button;

function SelectableButton(props) {
  const { className, active } = props;
  const activeCls = active ? styles.active : "";
  return (
    <Button
      className={classnames(styles.selectable, activeCls, className)}
      {...props}
    />
  );
}

export { SelectableButton };
