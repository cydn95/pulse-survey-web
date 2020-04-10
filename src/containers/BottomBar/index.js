import React, { Component } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import BottomBarMenuItem from "./BottomBarMenuItem";
import {
  setMainMenuClassName,
  setSubMenuClassName,
  projectListByUser,
} from "Redux/actions";

import styles from './styles.scss';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
    };
  }

  componentWillMount() {
    const { getProjectListByUser, user, projectList } = this.props;
    if (projectList.length === 0) {
      getProjectListByUser(user.userId);
    }
  }

  handleClickMainMenu = (e, menu, navigate) => {
    e.preventDefault();

    const { history, setMainMenuClassName, mainMenuClassName } = this.props;

    setMainMenuClassName(menu);

    if (navigate) {
      this.setState({
        subMenuOpen: false,
      });
      history.push("/app/" + menu);
    } else {
      if (menu === mainMenuClassName) {
        this.setState({
          subMenuOpen: !this.state.subMenuOpen,
        });
      } else {
        this.setState({
          subMenuOpen: true,
        });
      }
    }
  };

  handleClickSubMenu = (e, menu, to) => {
    e.preventDefault();

    const { history, setSubMenuClassName } = this.props;

    setSubMenuClassName(menu);

    this.setState({
      subMenuOpen: false,
    });

    history.push(to);
  };

  render() {
    const { mainMenuClassName, subMenuClassName, projectList } = this.props;
    const { subMenuOpen } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles["main-menu"]}>
          <div className={styles.link}>
            <ul className={styles.nav}>
              <li className={styles["nav--item"]}>
                <BottomBarMenuItem
                  to="/app/my-project"
                  menuKey="my-project"
                  menuTitle="My Project"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g stroke="none" strokeWidth="1">
                      <g transform="translate(-120.000000, -264.000000)">
                        <g transform="translate(120.000000, 267.000000)">
                          <rect x="11" y="4" width="1" height="8"></rect>
                          <path d="M21,9.0093689 C21,8.45190985 20.5490746,8 20.0052288,8 L2.99477117,8 C2.44537422,8 2,8.44335318 2,9.0093689 L2,12 L3,12 L3,9 L20,9 L20,12 L21,12 L21,9.0093689 Z"></path>
                          <path d="M17,0.497698784 C17,0.222827336 16.7702494,0 16.4987692,0 L6.50123084,0 C6.22440869,0 6,0.21484375 6,0.497698784 L6,4.50230122 C6,4.77717266 6.22975063,5 6.50123084,5 L16.4987692,5 C16.7755913,5 17,4.78515625 17,4.50230122 L17,0.497698784 Z"></path>
                          <path d="M5,13.4976988 C5,13.2228273 4.78515625,13 4.50230122,13 L0.497698784,13 C0.222827336,13 0,13.2148438 0,13.4976988 L0,17.5023012 C0,17.7771727 0.21484375,18 0.497698784,18 L4.50230122,18 C4.77717266,18 5,17.7851562 5,17.5023012 L5,13.4976988 Z"></path>
                          <path d="M14,13.4976988 C14,13.2228273 13.7851562,13 13.5023012,13 L9.49769878,13 C9.22282734,13 9,13.2148438 9,13.4976988 L9,17.5023012 C9,17.7771727 9.21484375,18 9.49769878,18 L13.5023012,18 C13.7771727,18 14,17.7851562 14,17.5023012 L14,13.4976988 Z"></path>
                          <path d="M23,13.4976988 C23,13.2228273 22.7851562,13 22.5023012,13 L18.4976988,13 C18.2228273,13 18,13.2148438 18,13.4976988 L18,17.5023012 C18,17.7771727 18.2148438,18 18.4976988,18 L22.5023012,18 C22.7771727,18 23,17.7851562 23,17.5023012 L23,13.4976988 Z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <BottomBarMenuItem
                  to="/app/about-me"
                  menuKey="about-me"
                  menuTitle="About Me"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, true)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g>
                      <path d="m10.54 10.443c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                      <path d="m16.69 18.803c-0.19-3.62-3.17-6.45-6.79-6.45s-6.6 2.83-6.79 6.45l-2-0.1c0.24-4.68 4.1-8.34 8.79-8.34 4.68 0 8.54 3.67 8.79 8.34l-2 0.1z" />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <BottomBarMenuItem
                  to="/app/my-map"
                  menuKey="my-map"
                  menuTitle="About Others"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, true)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g stroke="null">
                      <path
                        d="m18.381 2.7343c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-0.93349h-7.4856v1.3738l2.4306 4.2359h3.188c0.25539 0 0.47555 0.096872 0.66049 0.28181s0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.505l-2.8093-4.914h-2.7917c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.7516c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7428c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v0.93349h7.4856v-0.93349c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7252v0.008807zm-13.562 4.2095v-2.8093h-2.8093v2.8093h2.8093zm3.7428 6.5521v2.8093h2.8093v-2.8093h-2.8093zm9.3525-6.5521v-2.8093h-2.8093v2.8093h2.8093z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <BottomBarMenuItem
                  to="/app/dashboard"
                  menuKey="dashboard"
                  menuTitle="Dashboard"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g stroke="null">
                      <path
                        d="m18.381 2.7343c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-0.93349h-7.4856v1.3738l2.4306 4.2359h3.188c0.25539 0 0.47555 0.096872 0.66049 0.28181s0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.505l-2.8093-4.914h-2.7917c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.7516c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7428c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v0.93349h7.4856v-0.93349c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7252v0.008807zm-13.562 4.2095v-2.8093h-2.8093v2.8093h2.8093zm3.7428 6.5521v2.8093h2.8093v-2.8093h-2.8093zm9.3525-6.5521v-2.8093h-2.8093v2.8093h2.8093z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
            </ul>
          </div>
        </div>
        {mainMenuClassName === "my-project" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                {projectList.map((project, index) => (
                  <li key={index} className={styles["nav--item"]}>
                    <BottomBarMenuItem
                      to={`/app/my-project/${project.project.projectName}`}
                      menuKey={project.project.projectName}
                      menuTitle={project.project.projectName}
                      className={styles["nav--item--link"]}
                      mainMenuClassName={subMenuClassName}
                      onClickMenu={(e, menuKey) =>
                        this.handleClickSubMenu(
                          e,
                          menuKey,
                          `/app/my-project/${project.project.projectName}`
                        )
                      }
                    ></BottomBarMenuItem>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.space}></div>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/my-project/create"
                    menuKey="create-project"
                    menuTitle="Create a new project"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/my-project/create"
                      )
                    }
                  />
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/my-project/join"
                    menuKey="join-project"
                    menuTitle="Join an existing project"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/my-project/join"
                      )
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
        {mainMenuClassName === "dashboard" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/dashboard/report-1"
                    menuKey="report-1"
                    menuTitle="Report 1"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/dashboard/report-1"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/dashboard/report-2"
                    menuKey="report-2"
                    menuTitle="Report 2"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/dashboard/report-2"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
              </ul>
            </div>
            <div className={styles.space}></div>
          </div>
        )}
        {mainMenuClassName === "help" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/how-to-use-pulse"
                    menuKey="how-to-use-pulse"
                    menuTitle="How to use Pulse"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/how-to-use-pulse"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/turn-on-guide-mode"
                    menuKey="turn-on-guide-mode"
                    menuTitle="Turn On Guide Mode"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/turn-on-guide-mode"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/faq"
                    menuKey="faq"
                    menuTitle="FAQ"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(e, menuKey, "/app/help/faq")
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/safe-to-speak"
                    menuKey="safe-to-speak"
                    menuTitle="Safe to Speak?"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/safe-to-speak"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/code-of-conduct"
                    menuKey="code-of-conduct"
                    menuTitle="Code of Conduct"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/code-of-conduct"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
              </ul>
            </div>
            <div className={styles.space}></div>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = ({ menu, settings, authUser }) => {
  const { mainMenuClassName, subMenuClassName } = menu;
  const { projectList } = settings;
  const { user } = authUser;

  return {
    user,
    projectList,
    mainMenuClassName,
    subMenuClassName,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    setMainMenuClassName,
    setSubMenuClassName,
    getProjectListByUser: projectListByUser,
  })(BottomBar)
);
