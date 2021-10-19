import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import styles from "./styles.scss";

const Input = ({
  className,
  name,
  placeholder,
  onChange,
  onKeyUp,
  value,
  defaultValue,
  label,
  type,
  onFocus,
  onBlur,
  style = null,
  refVal = null,
  withClose = false,
  onClickClose = null,
}) => {
  return (
    <label className={classnames(styles.main, className)} onClick={(e) => e.stopPropagation()}>
      {label && <span className={styles.label}>{label}</span>}
      <div>
        <input
          ref={refVal}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value, e)}
          onKeyUp={(e) => (onKeyUp ? onKeyUp(e) : {})}
          value={value}
          onFocus={(e) => (onFocus ? onFocus(e) : {})}
          onBlur={(e) => (onBlur ? onBlur(e) : {})}
          style={style}
        />
        {withClose && <span onClick={onClickClose} className={styles.close}>x</span>}
      </div>
    </label>
  );
};

Input.defaultProps = {
  label: undefined,
  type: undefined,
  name: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => null,
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default Input;
