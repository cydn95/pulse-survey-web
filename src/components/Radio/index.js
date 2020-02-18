import React from 'react';

import styles from './styles.scss';

function Radio(props) {
  const { name, value, children, onChange, checked } = props;
  const checkedCls = checked ? styles.checked : "";
  return (
    <label className={styles.main + " " + checkedCls}>
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{children}</span>
      <input 
        name={name}
        value={value}
        type="radio"
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default Radio;

