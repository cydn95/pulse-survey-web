import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from './styles.scss';

function TabPanel(props) {
  const {
    selectedTab: selectedTabNameProp,
    data,
    onChange,
  } = props;

  const [selectedTabName, setSelectedTabName] = useState(selectedTabNameProp)

  const selectedTabObject = data.filter(d => d.name === selectedTabName)[0]

  const handleChange = (name) => {
    setSelectedTabName(name) 
    onChange(name)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        {
          data.map(d => (
            <div
              key={d.name}
              className={classnames(styles['panel-header'], d.name === selectedTabName ? styles.selected : null)}
              onClick={() => handleChange(d.name)}
            >
              {d.title}
            </div>
          ))
        }
      </div>
      {selectedTabObject && selectedTabObject.content}
    </div>
  )
}

TabPanel.defaultProps = {
  data: [],
  selectedTab: undefined,
  onChange: () => null,
}

TabPanel.propTypes = {
  selectedTab: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.node,
  })),
  onChange: PropTypes.func,
}

export default TabPanel