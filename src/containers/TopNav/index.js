import React, { Component } from "react";

import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from "react-router-dom";

import styles from './styles.scss';

import Sidebar from "../Sidebar";

class TopNav extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      toggle: false
    };
  }

  toggleDrawer = (event, open) => {
    if (event === null) {
      return;
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log(open);

    this.setState({
      toggle: open
    });
  };

  render() {
    return (
      <div className={ styles.root }>
        <Drawer 
          open={ this.state.toggle }
          onClose={this.toggleDrawer(null, false)}
          onClick={e => this.toggleDrawer(e, false)}
          onKeyDown={e => this.toggleDrawer(e, false)}
        >
          <Sidebar/>
        </Drawer>
        <div className={ styles.project }>
          <div className={ styles['drawer-section'] }>
            <MenuIcon
              className={ styles['drawer-toggle'] }
              onClick={e => this.toggleDrawer(e, true)}
              onKeyDown={e => this.toggleDrawer(e, true)}
            />
            <h1 className={ styles.title }>Dashboard</h1>
          </div>
          <div className={ styles.section }>
            <h2 className={ styles['page-title'] }>My Profile</h2>
            <h2 className={ styles['project-name'] }>Alpha Project</h2>
          </div>
        </div>
        <div className={ styles.control }>
          <div className={ styles.dropdown }>
            <img className={ styles.avatar } src="/assets/img/profile-pic-l-2.jpg" alt="avatar"/>
            <span className={ styles.username }>Robert Bloggs</span>
          </div>
        </div>
      </div>
    )
  }
}

export default TopNav;
