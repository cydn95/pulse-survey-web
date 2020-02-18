import React, { useRef, useState, useEffect } from 'react';
import * as d3 from "d3-interpolate";

import styles from './styles.scss';

function Button(props) {
  const { children, onClick, active } = props;
  const activeCls = active ? styles.active : "";
  return (
    <button 
      className={styles.main + " " + activeCls}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

