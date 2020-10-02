import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Switch from "react-switch";

import Joyride, { STATUS } from "react-joyride";

import { isMobile } from "react-device-detect";
import DialogTourView from "Components/DialogTourView";
import { DesktopGuide, DesktopTooltip } from "Components/Tooltip";

import SideBarMenuItem from "./SideBarMenuItem";

import {
  setMainMenuClassName,
  setSubMenuClassName,
  logoutUser,
  projectListByUser,
  surveyListByProject,
  setProjectID,
  setSurveyID,
  updateGuideStatus,
  tooltipTourContent,
  pageContent,
} from "Redux/actions";

import styles from "./styles.scss";
import classnames from "classnames";

const MENU_REPORT = [
  'People',
  'Sentiment',
  'Engagement',
  'Interest',
  'Confidence',
  'Culture',
  'Relationships',
  'Improvement'
];

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenuOpen: false,
      tourViewOpen: false,
      // guide: false,
      run: false,
      stepIndex: 0,
      steps: [],
    };
  }

  handleCloseTourDialog = () => {
    this.setState({
      tourViewOpen: false,
    });
  };

  handleStartGuide = () => {
    if (!this.state.subMenuOpen) {
      this.setState({
        run: true,
        subMenuOpen: false,
      });
    }
  };

  handleStopGuide = () => {
    this.setState({
      run: false,
    });
  };

  componentDidMount() {
    const {
      getProjectListByUser,
      user,
      getTooltipTourContent,
    } = this.props;

    getProjectListByUser(user.userId);
    getTooltipTourContent();
  }

  componentWillReceiveProps(props) {
    const {
      surveyId,
      screenMode,
      guide,
      tooltipContent,
      getPageContent,
    } = props;

    if (!props.guide) {
      this.setState({
        run: false,
      });
    }

    if (surveyId > 0 && surveyId !== this.props.surveyId) {
      getPageContent(surveyId);
    }

    if (tooltipContent.menu && tooltipContent.menu.length > 0) {
      const steps = [];
      for (let i = 0; i < tooltipContent.menu.length; i++) {
        steps.push({
          content: <DesktopTooltip tooltip={tooltipContent.menu[i]} />,
          placement: "right",
          target: `.s-menu-${tooltipContent.menu[i].place.toLowerCase()}`,
          disableBeacon: true,
        });
      }
      this.setState(
        {
          steps: steps,
        },
        () => {
          if (screenMode === "desktop") {
            if (guide) {
              setTimeout(this.handleStartGuide, 1000);
              // actionUpdateGuideStatus(user.accessToken, false);
            }
          } else {
            setTimeout(this.handleStopGuide, 500);
          }
        }
      );
    }
  }

  handleClickMainMenu = (e, menu, navigate) => {
    e.preventDefault();

    const {
      history,
      setMainMenuClassName,
      mainMenuClassName,
      logoutUser,
    } = this.props;

    setMainMenuClassName(menu);

    if (menu === "logout") {
      setMainMenuClassName("dashboard");
      logoutUser();
      return;
    }

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

    if (menu === "take-the-tour") {
      if (isMobile) {
        history.push(to);
      } else {
        this.setState({
          tourViewOpen: true,
          subMenuOpen: false,
        });
      }
      return;
    }

    if (menu === "turn-on-guide-mode") {
      return;
    }

    setSubMenuClassName(menu);

    this.setState({
      subMenuOpen: false,
    });

    history.push(to);
  };

  handleClickProject = (e, projectId) => {
    e.preventDefault();

    this.setState({
      subMenuOpen: false,
    });

    const { getSurveyListByProject } = this.props;
    setMainMenuClassName("about-me");
    getSurveyListByProject(projectId, this.callbackSelectProject);
  };

  callbackSelectProject = (data) => {
    const activeSurveys = data.filter((d) => d.isActive === true);
    if (activeSurveys.length > 0) {
      const survey = activeSurveys[0];

      const { actionSetProjectID, actionSetSurveyID, user } = this.props;
      actionSetProjectID(survey.project);
      actionSetSurveyID(user.userId, survey.id, this.callbackClickProject);
    }
  };

  callbackClickProject = () => {
    const { history } = this.props;
    history.push("/app/about-me");
  };

  handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }
  };

  getHelpers = (helpers) => {
    this.helpers = helpers;
  };

  handleSetGuideShowStatus = () => {
    // const { guide } = this.state;
    const { user, guide, actionUpdateGuideStatus } = this.props;

    // this.setState({
    //   guide: !guide,
    // });

    actionUpdateGuideStatus(user.accessToken, !guide);
  };

  render() {
    const {
      mainMenuClassName,
      subMenuClassName,
      projectList,
      pageContent,
      guide,
    } = this.props;
    const { subMenuOpen, run, steps } = this.state;

    return (
      <div className={styles.root}>
        {steps.length > 0 && (
          <Joyride
            callback={this.handleJoyrideCallback}
            continuous={true}
            getHelpers={this.getHelpers}
            run={run}
            debug={false}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            steps={steps}
            skipBeacon={true}
            tooltipComponent={DesktopGuide}
            styles={{
              options: {
                zIndex: 10000,
              },
            }}
          />
        )}
        <div className={styles["main-menu"]}>
          <div className={styles.logo}></div>
          <div className={styles.link}>
            <ul className={styles.nav}>
              <li
                className={classnames(
                  styles["nav--item"],
                  "s-menu-my-projects"
                )}
              >
                <SideBarMenuItem
                  to="/app/my-project"
                  menuKey="my-project"
                  menuTitle="My Projects"
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
                </SideBarMenuItem>
              </li>
              <li
                className={classnames(styles["nav--item"], "s-menu-about-me")}
              >
                <SideBarMenuItem
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
                </SideBarMenuItem>
              </li>
              <li
                className={classnames(
                  styles["nav--item"],
                  "s-menu-about-others"
                )}
              >
                <SideBarMenuItem
                  to="/app/about-others"
                  menuKey="about-others"
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
                        d="m2.642 9.5924c0.50308 0 0.94019 0.18144 1.3031 0.55257s0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257-0.94019-0.18144-1.3031-0.55257-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257zm2.5484 2.3257v-0.93194h1.3938v0.93194h-1.3938zm12.066 1.3855c0.57731 0 1.0721 0.20618 1.4763 0.6103s0.6103 0.89895 0.6103 1.4763-0.20618 1.0721-0.6103 1.4763-0.89895 0.6103-1.4763 0.6103-1.0721-0.20618-1.4763-0.6103-0.6103-0.89895-0.6103-1.4763l0.032989-0.28865-2.3752-1.3608c-0.3134 0.3134-0.65978 0.54432-1.0474 0.70926s-0.79998 0.24742-1.2453 0.24742c-0.57731 0-1.1216-0.14845-1.6247-0.4371s-0.89895-0.68452-1.1876-1.1876-0.4371-1.0474-0.4371-1.6247c0-0.51958 0.11546-1.0062 0.34638-1.4515s0.54432-0.82473 0.93194-1.1299l-0.95668-2.0618h-0.09072c-0.57731 0-1.0721-0.20618-1.4763-0.6103s-0.6103-0.89895-0.6103-1.4763 0.20618-1.0721 0.6103-1.4763 0.89895-0.6103 1.4763-0.6103 1.0721 0.20618 1.4763 0.6103 0.6103 0.89895 0.6103 1.4763c0 0.61854-0.23917 1.1381-0.72576 1.567l0.95668 2.0041c0.23092-0.057731 0.46185-0.09072 0.69277-0.09072 0.57731 0 1.1216 0.14845 1.6247 0.4371s0.89895 0.68452 1.1876 1.1876 0.4371 1.0474 0.4371 1.6247c0 0.37113-0.065978 0.74225-0.20618 1.1299l2.2598 1.3113c0.40412-0.38762 0.88246-0.58556 1.4268-0.58556zm-9.7483-7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.30515 0.20618 0.49484 0.20618zm3.0185 7.8844c0.50308 0 0.94019-0.18144 1.3031-0.55257s0.55257-0.79998 0.55257-1.3031-0.18144-0.94019-0.55257-1.3031-0.79998-0.55257-1.3031-0.55257-0.94019 0.18144-1.3031 0.55257-0.55257 0.79998-0.55257 1.3031 0.18144 0.94019 0.55257 1.3031 0.79998 0.55257 1.3031 0.55257zm5.1628-4.7834-1.3938 1.0474-0.57731-0.7505 1.3938-1.0474 0.57731 0.7505zm1.7979-0.3134c-0.50308 0-0.94019-0.18144-1.3031-0.55257s-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257 0.94019 0.18144 1.3031 0.55257 0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257zm-0.23092 7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.2969 0.20618 0.49484 0.20618z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </SideBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <SideBarMenuItem
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
                        d="m16.751 4.0538c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695v9.7509c0 0.52871-0.19068 0.98809-0.58072 1.3695s-0.84074 0.58072-1.3695 0.58072h-13.651c-0.52871 0-0.98809-0.19068-1.3695-0.58072s-0.58072-0.84074-0.58072-1.3695v-9.7509c0-0.52871 0.19068-0.98809 0.58072-1.3695s0.84074-0.58072 1.3695-0.58072h4.3857v-0.97942c0-0.26002 0.095342-0.49404 0.28603-0.68473s0.4247-0.28603 0.68473-0.28603h2.9296c0.26002 0 0.49404 0.095342 0.68473 0.28603s0.28603 0.4247 0.28603 0.68473v0.97942h4.3944zm0.48538 11.701v-9.7509c0-0.13868-0.043337-0.26002-0.13868-0.3467s-0.20802-0.13868-0.3467-0.13868h-4.3857v1.4648h-4.8798v-1.4648h-4.3857c-0.13868 0-0.26002 0.043337-0.3467 0.13868s-0.13868 0.20802-0.13868 0.3467v9.7509c0 0.13868 0.043337 0.26002 0.13868 0.3467s0.20802 0.13868 0.3467 0.13868h3.441l-0.03467-0.095342v-0.58072c0-0.48538 0.19935-0.90142 0.59805-1.2481s0.87541-0.52005 1.4475-0.52005c0.10401 0 0.23402 0.03467 0.3987 0.095342 0.32936 0.10401 0.65006 0.15601 0.97942 0.15601s0.65006-0.052005 0.97942-0.15601c0.18202-0.060672 0.31203-0.095342 0.3987-0.095342 0.57205 0 1.0488 0.17335 1.4475 0.52005s0.59805 0.76274 0.59805 1.2481v0.58072l-0.03467 0.095342h3.441c0.13868 0 0.26002-0.043337 0.3467-0.13868s0.13001-0.20802 0.13001-0.3467zm-7.3153-6.83c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695-0.19068 0.98809-0.58072 1.3695-0.84074 0.58072-1.3695 0.58072-0.98809-0.19068-1.3695-0.58072-0.58072-0.84074-0.58072-1.3695 0.19068-0.98809 0.58072-1.3695 0.84074-0.58072 1.3695-0.58072zm-0.97075-5.3565v1.9502h1.9502v-1.9502h-1.9502z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </SideBarMenuItem>
              </li>
              <li className={styles["nave--space"]}></li>
            </ul>
          </div>
          <div className={styles.space}></div>
          <div className={classnames(styles.link)}>
            <ul className={styles.nav}>
              <li className={styles["nav--item"]}>
                <SideBarMenuItem
                  to="/app/settings/account"
                  menuKey="settings"
                  menuTitle="Profile"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, true)
                  }
                ></SideBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <SideBarMenuItem
                  to="/app/help"
                  menuKey="help"
                  menuTitle="Help"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                ></SideBarMenuItem>
              </li>

              <li className={styles["nav--item"]}>
                <SideBarMenuItem
                  to="/logout"
                  menuKey="logout"
                  menuTitle="Log out"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                ></SideBarMenuItem>
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
                    <SideBarMenuItem
                      to=""
                      menuKey={project.projectName}
                      menuTitle={project.projectName}
                      className={styles["nav--item--link"]}
                      mainMenuClassName={subMenuClassName}
                      onClickMenu={(e, menuKey) =>
                        this.handleClickProject(e, project.id)
                      }
                    ></SideBarMenuItem>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.space}></div>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <SideBarMenuItem
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
                  <SideBarMenuItem
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
                {MENU_REPORT.map((menu) => (
                  <li key={`submenu-report-menu`} className={styles["nav--item"]}>
                    <SideBarMenuItem
                      to="/app/dashboard"
                      menuKey={menu.toLowerCase()}
                      menuTitle={menu}
                      className={styles["nav--item--link"]}
                      mainMenuClassName={subMenuClassName}
                      onClickMenu={(e, menuKey) =>
                        this.handleClickSubMenu(
                          e,
                          menu.toLowerCase(),
                          `/app/dashboard/${menu.toLowerCase()}`
                        )
                      }
                    ></SideBarMenuItem>
                  </li>
                ))}
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
                  <SideBarMenuItem
                    to="/app/tour"
                    menuKey="take-the-tour"
                    menuTitle="Take the tour"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(e, menuKey, "/app/tour")
                    }
                  ></SideBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <SideBarMenuItem
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
                  ></SideBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <SideBarMenuItem
                    to="/app/help/turn-on-guide-mode"
                    menuKey="turn-on-guide-mode"
                    menuTitle=""
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/turn-on-guide-mode"
                      )
                    }
                    left={false}
                  >
                    <span>{`Turn On Guide Mode `}</span>

                    {guide !== undefined && (
                      <Switch
                        checked={guide}
                        onChange={(e) => this.handleSetGuideShowStatus()}
                        onColor="#7fcdc1"
                        onHandleColor="#4cb9a8"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={38}
                        className="react-switch"
                      />
                    )}
                  </SideBarMenuItem>
                </li>
                {pageContent.length > 0 &&
                  pageContent.map((page) => {
                    const link = page.tabName
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return (
                      <li
                        key={`page_${page.id}`}
                        className={styles["nav--item"]}
                      >
                        <SideBarMenuItem
                          to={`/app/help/${link}`}
                          menuKey={link}
                          menuTitle={page.tabName}
                          className={styles["nav--item--link"]}
                          mainMenuClassName={subMenuClassName}
                          onClickMenu={(e, menuKey) =>
                            this.handleClickSubMenu(
                              e,
                              menuKey,
                              `/app/help/${link}`
                            )
                          }
                        ></SideBarMenuItem>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.space}></div>
          </div>
        )}
        <DialogTourView
          open={this.state.tourViewOpen}
          onClose={(e) => this.handleCloseTourDialog()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ menu, settings, authUser, tour, account }) => {
  const { mainMenuClassName, subMenuClassName } = menu;
  const { projectList } = settings;
  const { user, surveyId } = authUser;
  const { pageContent, tooltipContent } = tour;
  const { profile } = account;

  return {
    user,
    surveyId,
    projectList,
    mainMenuClassName,
    subMenuClassName,
    guide: profile.guide,
    pageContent,
    tooltipContent,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    setMainMenuClassName,
    setSubMenuClassName,
    logoutUser,
    getProjectListByUser: projectListByUser,
    getSurveyListByProject: surveyListByProject,
    actionSetProjectID: setProjectID,
    actionSetSurveyID: setSurveyID,
    actionUpdateGuideStatus: updateGuideStatus,
    getPageContent: pageContent,
    getTooltipTourContent: tooltipTourContent,
  })(Sidebar)
);
