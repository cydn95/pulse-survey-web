import React, { useState } from 'react';
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
    selectedChunk
  } = props;

  const [selected, setSelected] = useState(selectedChunk);

  const changeSelection = (d) => {
    if (keySelector(d) === selected) {
      setSelected(null)
    } else {
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
            <div onClick={() => changeSelection(d)} className={styles.header}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={iconSelector(d)} />
              </div>
              <div className={styles["header-content"]}>{headerSelector(d)}</div>
              <FontAwesomeIcon className={styles["icon-arrow"]} icon={faAngleRight} />
            </div>
            <div className={styles.component}>
              <div className={styles.icon}>
                <FontAwesomeIcon className={styles.icon} icon={iconSelector(d)} />
              </div>
              <div className={styles["component-content"]}>
                {componentSelector(d)}
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