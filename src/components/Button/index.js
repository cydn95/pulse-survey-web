import React from 'react';
import classnames from "classnames";

import styles from './styles.scss';

function Button(props) {
  const { className, type, children, onClick, default: isDefault } = props;
  return (
    <button 
      className={classnames(styles.main, isDefault ? styles.default : null, className)}
      type={type}
      onClick={onClick}
      {...{ autoFocus: isDefault }}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  default: true
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