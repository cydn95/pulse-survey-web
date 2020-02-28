import React from 'react';
import classnames from "classnames";
import { PropTypes } from 'prop-types';

import styles from './styles.scss';

function Radio(props) {
  const { name, styles, value, children, onChange, checked } = props;
  const checkedCls = checked ? styles.checked : "";
  return (
    <label className={classnames(styles.main, checkedCls)}>
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

Radio.defaultProps = {
  checked: false,
  name: '',
  value: 0,
  styles: styles,
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  styles: PropTypes.any,
};

export default Radio;

