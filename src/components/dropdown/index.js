import React, { useState } from 'react';
import Button from 'Components/Button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from "classnames";

import styles from './styles.scss';

function DropDown(props) {
  const {
    keySelector,
    valueSelector,
    onSelect,
    data,
    children
  } = props;

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const openCls = open ? styles.open : undefined;

  let timeoutId = null;
  const blurHandler = () => {
    timeoutId = setTimeout(() => {
      setOpen(false)
    })
  }

  const focusHandler = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return (
    <div tabIndex={0} className={styles.main} onClick={toggleOpen} onBlur={blurHandler} onFocus={focusHandler}>
      <Button
      >
        {children}
        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
      </Button>
      <div className={classnames(styles.dropdownlist, openCls)}>
        {
          data.map(d => (
            <div key={keySelector(d)} className={styles.option} onClick={() => onSelect(d)}>
              {valueSelector(d)}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DropDown