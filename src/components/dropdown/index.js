import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "Components/Button";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classnames from "classnames";

import styles from "./styles.scss";

function DropDown(props) {
  const {
    keySelector,
    valueSelector,
    onSelect,
    data,
    selectedItem,
    children,
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const openCls = open ? styles.open : undefined;

  let timeoutId = null;
  const blurHandler = () => {
    timeoutId = setTimeout(() => {
      setOpen(false);
    });
  };

  const focusHandler = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <div
      tabIndex={0}
      className={styles.main}
      onClick={toggleOpen}
      onBlur={blurHandler}
      onFocus={focusHandler}
    >
      <Button className={styles.button}>
        {children}
        <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
      </Button>
      <div className={classnames(styles.dropdownlist, openCls)}>
        {data.map((d, i) => (
          <div
            key={keySelector(d, i)}
            className={classnames(
              styles.option,
              selectedItem && keySelector(d) === keySelector(selectedItem)
                ? styles.selected
                : null
            )}
            onClick={() => onSelect(d)}
          >
            {valueSelector(d)}
          </div>
        ))}
      </div>
    </div>
  );
}

DropDown.defaultProps = {
  selectedItem: null,
  keySelector: (d, i) => i,
  data: [],
};

DropDown.propTypes = {
  selectedItem: PropTypes.any,
  keySelector: PropTypes.func.isRequired,
  valueSelector: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
};

export default DropDown;
