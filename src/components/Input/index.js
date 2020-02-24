import React, { Component } from "react";
import classnames from "classnames";

import styles from './styles.scss';

function Input(props) {
  const { 
    className,
    placeholder, 
    onChange,
    value,
  } = props;
  
  return (
    <input 
      className={classnames(styles.main, className)} 
      placeholder={placeholder} 
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  )
}

export default Input;
