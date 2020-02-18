import React from 'react';

import styles from './styles.scss';

function Checkbox(props) {
  const { children, onChange, checked } = props;
  const checkedCls = checked ? styles.checked : "";
  return (
    <label className={styles.main + " " + checkedCls}>
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{children}</span>
      <input 
        type="checkbox"
        onChange={(e) => onChange(!checked)}
      />
    </label>
  );
}

export default Checkbox;
