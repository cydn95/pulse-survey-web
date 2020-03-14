import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAngleDown, 
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function TabPanel(props) {
  const {
    selectedTab: selectedTabNameProp,
    data,
    onChange,
    onSelectSH
  } = props;

  const [selectedTabName, setSelectedTabName] = useState(selectedTabNameProp)
  const [menuShow, setMenuShow] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(false)

  const selectedTabObject = data.filter(d => d.name === selectedTabName)[0]

  const handleChange = (name) => {
    setSelectedTabName(name) 
    onChange(name)
  }

  const handleClickMenuButton = e => {
    setMenuShow(!menuShow)
  }

  const handleSelectSH = (e, id) => {
    setMenuShow(false);
    setSelectedMenu(id);
    onSelectSH(e, id);
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        {
          data.map(d => {
            if (d.type === "default") {
              return (
                <div
                  key={d.name}
                  className={classnames(styles['panel-header'], d.name === selectedTabName ? styles.selected : null)}
                  onClick={() => handleChange(d.name)}
                >
                  {d.title}
                </div>
              );
            } else {
              return (
                <div className={styles['combo-tab']} key={d.name}>
                  <div
                    className={classnames(styles['panel-header'], styles.combo, d.name === selectedTabName ? styles.selected : null)}
                    onClick={() => handleChange(d.name)}
                  >
                    {d.title}
                    <FontAwesomeIcon onClick={e => handleClickMenuButton(e)} className={styles.arrow} icon={faAngleDown}/>
                  </div>
                  {menuShow &&
                    <div className={styles.menu}>
                      <div key={'ALL'} onClick={e => handleSelectSH(e, 0)} className={styles['menu-item']}>{'ALL'}</div>
                      {
                        d.list.map(item => (
                          <div key={item.SHCategoryName} onClick={e => handleSelectSH(e, item.id)} 
                            className={classnames(styles['menu-item'],  {[styles.selected]: selectedMenu == item.id ? true : false})}>{item.SHCategoryName}</div>
                        ))
                      }
                    </div>
                  }
                </div>
              );
            }
            
          })
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