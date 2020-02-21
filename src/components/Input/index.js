import React, { Component } from "react";

import styles from './styles.scss';

function Input(props) {
  const { 
    placeholder, 
    onChange,
    value,
  } = props;
  
  return (
    <input 
      className={styles.main} 
      placeholder={placeholder} 
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  )
}

export default Input;
