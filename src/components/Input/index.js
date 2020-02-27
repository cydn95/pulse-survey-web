import React, { Component } from "react";
import PropTypes from "prop-types"

import classnames from "classnames";

import styles from './styles.scss';

const Input = React.forwardRef((props, ref) => {
  const { 
    className,
    name,
    placeholder, 
    onChange,
    value,
    defaultValue,
    label,
    type,
  } = props;
  return (
    <label
      className={classnames(styles.main, className)}
    >
      {label && <span className={styles.label}>{label}</span> }
      <input
        type={type}
        ref={ref}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        value={value}
      />
    </label>
  )
})

Input.defaultProps = {
  label: undefined,
  type: undefined,
  name: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => null,
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input;
