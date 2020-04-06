import React, { Component } from "react";

import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './styles.scss';

import Sidebar from "../Sidebar";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  setCurrentMenuClassName,
  logoutUser,
} from "Redux/actions";

class TopNav extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      toggle: false,
      menu: false
    };
  }

  toggleDrawer = (event, open) => {
    if (event === null) {
      return;
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({
      toggle: open
    });
  };

  logOut = e => {
    e.preventDefault();

    this.props.logoutUser();
  }

  toggleMenu = e => {
    if (!this.state.menu) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  
    this.setState(prevState => ({
      menu: !prevState.menu,
    }));
  }

  handleOutsideClick = e => {
    this.toggleMenu(e);
  }

  navigateSetting = e => {
    e.preventDefault();

    this.props.setCurrentMenuClassName('settings');
    this.props.history.push("/app/settings");
  }

  render() {

    const { menuTitle, children } = this.props;

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
            <h1 className={ styles.title }>{menuTitle}</h1>
          </div>
          <div className={ styles.section }>
            { children }
          </div>
        </div>
        <div id="menu" className={ styles.control }>
          <div className={ styles.dropdown }  onClick={e => this.toggleMenu(e)}>
            <img className={ styles.avatar } src="/assets/img/profile-pic-l-2.jpg" alt="avatar"/>
            <span className={ styles.username }>Robert Bloggs</span>
          </div>
          { this.state.menu &&
          <div className={ styles['dropdown-menu'] }>
            <div className= { styles['dropdown-menu-item'] }  onClick={e => this.navigateSetting(e)}>
              <a href="" >Settings</a>
            </div>
            <div className= { styles['dropdown-menu-item'] } onClick={e => this.logOut(e) }>
              <a href="">Log Out</a>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps, { setCurrentMenuClassName, logoutUser })(TopNav));
