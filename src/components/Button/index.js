import React from 'react';
import classnames from "classnames";

import styles from './styles.scss';

function Button(props) {
  const { className, children, onClick } = props;
  return (
    <button 
      className={classnames(className, styles.main)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SelectableButton(props) {
  const { active } = props;
  const activeCls = active ? styles.active : "";
  return (
    <Button 
      className={classnames(styles.selectable, activeCls)}
      {...props}
    />
  );
}

export default Button;

export {
  SelectableButton
};