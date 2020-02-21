import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntlMessages from "Util/IntlMessages";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from "Redux/actions";

import PropTypes from 'prop-types';
import { makeStyles, StylesProvider } from '@material-ui/core';

import styles from './styles.scss';

class BottomBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu:"", 
    };
  }

  changeViewingParentMenu = (menu) => {
    this.toggle();

    this.setState({
      viewingParentMenu: menu
    });
  }

  render() {
    return (
      <div className={ styles.root }>
        <div className={ styles.link }>
          <ul className={ styles.nav }>
            <li className={ styles["nav--item"] }>
              <NavLink
                className={ styles["nav--item--link"] }
                to="/app/about-me"
                onClick={() => this.changeViewingParentMenu('welcome')}
                data-flag="about-me">
                  About Me
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ styles["nav--item--link"] }
                to="/app/my-map"
                onClick={() => this.changeViewingParentMenu('my-map')}
                data-flag="my-map">
                  My Map
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ styles["nav--item--link"] }
                to="/app/project-map"
                onClick={() => this.changeViewingParentMenu('project-map')}
                data-flag="project-map">
                  Project Map
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ styles["nav--item--link"] }
                to="/app/profile"
                onClick={() => this.changeViewingParentMenu('profile')}
                data-flag="profile">
                  User Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  };
};

export default withRouter(BottomBar);

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
//   )(Sidebar)
// );
