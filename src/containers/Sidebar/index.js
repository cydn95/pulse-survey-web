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

class Sidebar extends Component {

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
        <img className={ styles.logo } src="/assets/img/login/projecai-logo.png" alt="logo"/>
        <div className={ styles.link }>
          <Nav vertical className="list-unstyled">
            <NavItem
              className={ classnames({
                active: ((this.state.selectedParentMenu === "about-me" && this.state.viewingParentMenu === "") || this.state.viewingParentMenu === "about-me")
              }) }
            >
              <NavLink
                to="/app/about-me"
                onClick={() => this.changeViewingParentMenu('welcome')}
                data-flag="about-me">
                  About Me
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                active: ((this.state.selectedParentMenu === "my-map" && this.state.viewingParentMenu === "") || this.state.viewingParentMenu === "my-map")
              })}
            >
              <NavLink
                to="/app/my-map"
                onClick={() => this.changeViewingParentMenu('my-map')}
                data-flag="my-map">
                  My Map
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                active: ((this.state.selectedParentMenu === "project-map" && this.state.viewingParentMenu === "") || this.state.viewingParentMenu === "project-map")
              })}
            >
              <NavLink
                to="/app/project-map"
                onClick={() => this.changeViewingParentMenu('project-map')}
                data-flag="project-map">
                  Project Map
              </NavLink>
            </NavItem>

            <NavItem
              className={classnames({
                active: ((this.state.selectedParentMenu === "profile" && this.state.viewingParentMenu === "") || this.state.viewingParentMenu === "profile")
              })}
            >
              <NavLink
                to="/app/profile"
                onClick={() => this.changeViewingParentMenu('profile')}
                data-flag="profile">
                  User Profile
              </NavLink>
            </NavItem>
          </Nav>
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

export default withRouter(Sidebar);

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
//   )(Sidebar)
// );
