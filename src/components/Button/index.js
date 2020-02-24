import React from 'react';
import classnames from "classnames";

import styles from './styles.scss';

function Button(props) {
  const { className, children, onClick } = props;
  return (
    <button 
      className={classnames(styles.main, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

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

export {
  SelectableButton
};