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
    } = this.props;
    return (
      <NavLink
        className={classnames(styles.root, className, {
          [styles.active]: mainMenuClassName === menuKey ? true : false,
        })}
        to={to}
        onClick={(e) => onClickMenu(e, menuKey)}
      >
        {children}
        <span className={classnames(styles.name)}>{menuTitle}</span>
      </NavLink>
    );
  }
}

export default SideBarMenuItem;
