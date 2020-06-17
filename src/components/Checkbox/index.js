import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import styles from "./styles.scss";

function Checkbox(props) {
  const { children, onChange, checked } = props;
  const checkedCls = checked ? styles.checked : "";
  return (
    <label className={classnames(styles.main, checkedCls)}>
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{children}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(!checked)}
      />
    </label>
  );
}

Checkbox.defaultProps = {
  checked: false,
};

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default Checkbox;
