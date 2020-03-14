import React, { useState } from "react";
import classnames from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAngleDown, 
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

class TabPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTabName: this.props.selectedTab,
      menuShow: false,
      selectedMenu: false
    }
  }

  selectedTabObject = data => {
    
    return data.filter(d => d.name === this.state.selectedTabName)[0]
  }

  handleChange = (name) => {
    this.setState({
      selectedTabName: name
    });
  }

  handleClickMenuButton = e => {

    if (!this.state.menuShow) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      menuShow: !this.state.menuShow
    })
  }

  handleOutsideClick = e => {
    this.handleClickMenuButton(e);
  }

  handleSelectSH = (e, id) => {
    setTimeout(() => {
      this.setState({
        menuShow: false,
        selectMenu: id
      })
    }, 300)
    
    this.props.onSelectSH(e, id);
  }

  render() {

    const {
      data,
    } = this.props;

    return (
      <div className={styles.main}>
        <div className={styles.header}>
          {
            data.map(d => {
              if (d.type === "default") {
                return (
                  <div
                    key={d.name}
                    className={classnames(styles['panel-header'], d.name === this.state.selectedTabName ? styles.selected : null)}
                    onClick={() => this.handleChange(d.name)}
                  >
                    {d.title}
                  </div>
                );
              } else {
                return (
                  <div className={styles['combo-tab']} key={d.name}>
                    <div
                      className={classnames(styles['panel-header'], styles.combo, d.name === this.state.selectedTabName ? styles.selected : null)}
                      onClick={e => this.handleChange(d.name)}
                    >
                      {d.title}
                      <FontAwesomeIcon onClick={e => this.handleClickMenuButton(e)} className={styles.arrow} icon={faAngleDown}/>
                    </div>
                    {this.state.menuShow &&
                      <div className={styles.menu}>
                        <div key={'ALL'} onClick={e => this.handleSelectSH(e, 0)} className={styles['menu-item']}>{'ALL'}</div>
                        {
                          d.list.map(item => (
                            <div key={item.SHCategoryName} onClick={e => this.handleSelectSH(e, item.id)} 
                              className={classnames(styles['menu-item'],  {[styles.selected]: this.state.selectedMenu == item.id ? true : false})}>{item.SHCategoryName}</div>
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
        {this.selectedTabObject(data) && this.selectedTabObject(data).content}
      </div>
    )
  }
}

export default TabPanel