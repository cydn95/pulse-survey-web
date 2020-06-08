import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import classnames from "classnames";

import styles from "./styles.scss";

class SideBarMenuItem extends Component {
  render() {
    const {
      to,
      className,
      mainMenuClassName,
      menuKey,
      menuTitle,
      onClickMenu,
      children,
      left = true
    } = this.props;
    return (
      <NavLink
        className={classnames(styles.root, className, {
          [styles.active]: mainMenuClassName === menuKey ? true : false,
        })}
        to={to}
        onClick={(e) => onClickMenu(e, menuKey)}
      >
        {left && children}
        <span className={classnames(styles.name)}>{menuTitle}</span>
        {!left && children}
      </NavLink>
    );
  }
}

export default SideBarMenuItem;
