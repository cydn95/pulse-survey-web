import React, { useState, useEffect, useRef } from "react";

import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "./styles.scss";

import Sidebar from "../Sidebar";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setMainMenuClassName, logoutUser } from "Redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import classnames from "classnames";

const TopNav = ({
  actions = null,
  withProfile = true,
  menuTitle,
  profile,
  children,
  setMainMenuClassName,
  logoutUser,
  history,
  style
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenu(false)
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)
  const [toggle, setToggle] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleDrawer = (event, open) => {
    if (event === null) {
      return;
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggle(open);
  };

  const logOut = (e) => {
    e.preventDefault();
    logoutUser();
  };

  // const toggleMenu = (e) => {
  //   if (!menu) {
  //     // attach/remove event handler
  //     document.addEventListener("click", handleOutsideClick, false);
  //   } else {
  //     document.removeEventListener("click", handleOutsideClick, false);
  //   }

  //   setMenu(!menu);
  // };

  // const handleOutsideClick = (e) => {
  //   toggleMenu(e);
  // };

  const navigateSetting = (e) => {
    e.preventDefault();

    setMainMenuClassName("settings");
    history.push("/app/settings");
  };

  return (
    <div className={classnames(styles.root)} style={style}>
      <Drawer
        open={toggle}
        onClose={toggleDrawer(null, false)}
        onKeyDown={(e) => toggleDrawer(e, false)}
      >
        <div
          style={{ position: "absolute", marginLeft: 190, top: 15 }}
          className={styles["hide-icon-wrapper"]}
          onClick={(e) => toggleDrawer(e, false)}
          role="button"
        >
          <FontAwesomeIcon
            className="fa-lg"
            size="lg"
            color="#fff"
            icon={faTimes}
            onClick={(e) => toggleDrawer(e, false)}
          />
        </div>
        <Sidebar />
      </Drawer>
      <div className={styles.project}>
        <div className={styles["drawer-section"]}>
          <MenuIcon
            className={styles["drawer-toggle"]}
            onClick={(e) => toggleDrawer(e, true)}
            onKeyDown={(e) => toggleDrawer(e, true)}
          />
          <h1 className={styles.title}>{menuTitle}</h1>
        </div>
        <div className={styles.section}>{children}</div>
      </div>
      {actions}
      <div id="menu" className={styles.control} ref={wrapperRef}>
        {withProfile && <div className={styles.dropdown} onClick={(e) => setMenu(!menu)}>
          {profile.avatar && (
            <img className={styles.avatar} src={profile.avatar} alt="avatar" />
          )}
          {(!profile.avatar || profile.avatar === "") && (
            <img
              className={styles.avatar}
              src="/assets/img/survey/menu-aboutme.png"
              alt="avatar"
            />
          )}
          <span
            className={styles.username}
          >{`${profile.firstName} ${profile.lastName}`}</span>
        </div>}
        {menu && (
          <div className={styles["dropdown-menu"]}>
            <div
              className={styles["dropdown-menu-item"]}
              onClick={(e) => navigateSetting(e)}
            >
              <a href="">
                <FontAwesomeIcon
                  size="md"
                  color="#1d1d1d"
                  icon={faEdit}
                />
                Edit Profile</a>
            </div>
            <div
              className={styles["dropdown-menu-item"]}
              onClick={(e) => logOut(e)}
            >
              <a href="">
                <FontAwesomeIcon
                  size="md"
                  color="#1d1d1d"
                  icon={faSignOutAlt}
                />
                Log Out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ account }) => {
  const { profile } = account;
  return { profile };
};

export default withRouter(
  connect(mapStateToProps, { setMainMenuClassName, logoutUser })(TopNav)
);
