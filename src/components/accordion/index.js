import React, { useState, useRef, useEffect } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function AccordionComponent(props) {
  const {
    icon, 
    children,
  } = props;

  const ref = useRef(null)

  return (
    <div
      className={styles["content-wrapper"]}
      ref={ref}
      onTransitionEnd={(event) => {
        const node = event.currentTarget
        if (node.style.height !== "0px") {
          node.style.height = "auto";
        }
      }}
      >
      <div className={styles.component}>
        <div className={styles.icon}>
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        </div>
        <div className={styles["component-content"]}>
          {children}
        </div>
      </div>
    </div>
  )
}

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

  const changeSelection = (event, d) => {
    const collapseNode = (node) => {
      // need to remove auto height, otherwise transition doesnot work
      node.style.height = node.clientHeight + "px";
      // give sufficient time for height change
      setTimeout(() => {
        node.style.height = 0 + "px";
      }, 100)
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
      const expandedHeight = cur_node.firstChild.clientHeight;
      cur_node.style.height = expandedHeight + "px";
      setSelected(keySelector(d))
    }
  }

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
            <AccordionComponent isSelected={keySelector(d) === selected} icon={iconSelector(d)}>
              {componentSelector(d)}
            </AccordionComponent>
          </div>
        ))
      }
    </div>
  )

}

Accordion.defaultProps = {
  selectedItem: null,
  className: null,
}

Accordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  keySelector: PropTypes.func.isRequired,
  headerSelector: PropTypes.func.isRequired,
  iconSelector: PropTypes.func.isRequired,
  componentSelector: PropTypes.func.isRequired,
  selectedItem: PropTypes.any,
  className: PropTypes.string,
}

export default Accordion;