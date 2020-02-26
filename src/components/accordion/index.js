import React, { useState, useRef, useEffect } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function Accordion(props) {
  const {
    className,
    data,
    iconSelector,
    keySelector,
    headerSelector,
    componentSelector,
    selectedItem
  } = props;

  const [selected, setSelected] = useState(selectedItem);
  const selectedRef = useRef(null);

  const changeSelection = (event, d) => {
    const collapseNode = (node) => {
      // need to remove auto height, otherwise transition doesnot work
      node.style.height = node.scrollHeight + "px";
      setTimeout(() => {
        node.style.height = 0 + "px";
      })
    }
    if (keySelector(d) === selected) {
      collapseNode(event.currentTarget.nextSibling)
      setSelected(null)
    } else {
      let node = event.currentTarget.parentNode.previousSibling;
      while (node) {
        collapseNode(node.lastChild)
        node = node.previousSibling;
      }
      node = event.currentTarget.parentNode.nextSibling;
      while (node) {
        collapseNode(node.lastChild)
        node = node.nextSibling;
      }
      const cur_node = event.currentTarget.nextSibling;
      const expandedHeight = cur_node.scrollHeight;
      cur_node.style.height = expandedHeight + "px";
      setSelected(keySelector(d))
    }
  }

  const selectedProps = { ref: selectedRef }

  return (
    <div
      className={classnames(styles.main, className)}
    >
      {
        data.map(d => (
          <div key={keySelector(d)} className={classnames(styles.chunk, keySelector(d) === selected ? styles.open : undefined)}>
            <div onClick={(e) => changeSelection(e, d)} className={styles.header}>
              <div className={styles.icon}>
                <FontAwesomeIcon className={styles.icon} icon={iconSelector(d)} />
              </div>
              <div className={styles["header-content"]}>{headerSelector(d)}</div>
              <FontAwesomeIcon className={styles["icon-arrow"]} icon={faAngleRight} />
            </div>

            <div {...(keySelector(d) === selected ? selectedProps : {})} className={styles["content-wrapper"]}>
              <div className={styles.component}>
                <div className={styles.icon}>
                  <FontAwesomeIcon className={styles.icon} icon={iconSelector(d)} />
                </div>
                <div className={styles["component-content"]}>
                  {componentSelector(d)}
                  <div className={styles["component-content"]}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )

}

Accordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  keySelector: PropTypes.func.isRequired,
  headerSelector: PropTypes.func.isRequired,
  iconSelector: PropTypes.func.isRequired,
  componentSelector: PropTypes.func.isRequired,
}

export default Accordion;