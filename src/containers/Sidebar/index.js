import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Switch from "react-switch";

import Joyride, { STATUS } from "react-joyride";

import { isMobile } from "react-device-detect";
import DialogTourView from "Components/DialogTourView";
import { DesktopGuide, DesktopTooltip } from "Components/Tooltip";

import IconAboutMe from "./Icons/IconAboutMe";
import IconAboutOthers from "./Icons/IconAboutOthers";
import IconMyProject from "./Icons/IconMyProject";
import IconDashboard from "./Icons/IconDashboard";

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "Assets/css/custom/menubar.css";

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
  checkDashboard,
} from "Redux/actions";

import styles from "./styles.scss";
import classnames from "classnames";

const MENU_REPORT = [
  "Summary",
  // "Sentiment",
  // "Engagement",
  // "Interest",
  // "Confidence",
  // "Culture",
  // "Relationships",
  // "Improvement",
  "Driver Analysis",
  "Key Themes",
  "Matrix",
  "Advisor Insights",
];

const MENU_ADMIN = [
  "Projects",
  "Subscription"
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
      isAdmin: false,
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
      getPageContent,
      surveyId,
    } = this.props;

    getProjectListByUser(user.userId);
    getTooltipTourContent();

    if (surveyId) {
      getPageContent(surveyId);
    }
  }

  componentWillReceiveProps(props) {
    const {
      surveyId,
      surveyUserId,
      screenMode,
      guide,
      tooltipContent,
      getPageContent,
      projectList,
      projectId,
      actionSetProjectID,
      actionSetSurveyID,
      actionCheckDashboard,
      user,
    } = props;

    const { pageContent } = this.props;

    const oldSurveyId = this.props.surveyId ? this.props.surveyId : "";
    const oldSurveyUserId = this.props.surveyUserId
      ? this.props.surveyUserId
      : "";

    if (
      surveyId &&
      surveyId > 0 &&
      surveyUserId &&
      surveyUserId > 0 &&
      (surveyId.toString() !== oldSurveyId.toString() ||
        surveyUserId.toString() !== oldSurveyUserId.toString())
    ) {
      actionCheckDashboard(surveyId, surveyUserId, (result) => {
        const { code } = result;
        if (code === 201) {
          this.setState({
            isAdmin: true,
          });
        }
      });
    }

    if (
      projectId !== null &&
      projectId !== 0 &&
      projectId !== "0" &&
      projectList &&
      projectList.length > 0
    ) {
      const findIndex = projectList.findIndex(
        (item) => item.id.toString() === projectId.toString()
      );

      if (findIndex < 0) {
        actionSetProjectID(0);
        actionSetSurveyID(user.userId, 0, () => { });
      }
    }

    if (!props.guide) {
      this.setState({
        run: false,
      });
    }

    if (
      surveyId &&
      surveyId > 0 &&
      surveyId.toString() !== oldSurveyId.toString()
    ) {
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
      if (menu === "about-others") {
        window.location = "/app/" + menu;
      } else {
        history.push("/app/" + menu);
      }
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
      projectId,
      surveyId,
      user,
      isSuperUser
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
            <ProSidebar width="220px">
              <Menu iconShape="square" className="s-menu-my-projects">
                <SubMenu icon={<IconMyProject />} title="My Projects">
                  {projectList.map((project) => (
                    <MenuItem
                      key={`project-submenu-${project.id}`}
                      onClick={(e) => this.handleClickProject(e, project.id)}
                    >
                      {project.projectName}
                    </MenuItem>
                  ))}
                </SubMenu>
              </Menu>
              <Menu iconShape="square" className="s-menu-about-me">
                <MenuItem
                  icon={<IconAboutMe />}
                  onClick={(e) => this.handleClickMainMenu(e, "about-me", true)}
                >
                  About Me
                </MenuItem>
              </Menu>
              <Menu iconShape="square" className="s-menu-about-others">
                <MenuItem
                  icon={<IconAboutOthers />}
                  onClick={(e) =>
                    this.handleClickMainMenu(e, "about-others", true)
                  }
                >
                  About Others
                </MenuItem>
              </Menu>
              <Menu iconShape="square">
                <SubMenu icon={<IconDashboard />} title="Dashboard">
                  {MENU_REPORT.map((menu) => {
                    if (menu === "Matrix" && this.state.isAdmin === false) {
                      return null;
                    }

                    return (
                      <MenuItem
                        key={`submenu-report-${menu
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        onClick={(e) =>
                          this.handleClickSubMenu(
                            e,
                            menu.toLocaleLowerCase(),
                            `/app/dashboard/${menu
                              .toLocaleLowerCase()
                              .replace(" ", "-")}`
                          )
                        }
                      >
                        {menu}
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              </Menu>
            </ProSidebar>
          </div>
          <div className={styles.space}></div>
          <div className={styles.link}>
            <ProSidebar width="220px">
              {isSuperUser && <Menu iconShape="square">
                <SubMenu title="Administration">
                  {MENU_ADMIN.map((menu) => {
                    return (
                      <MenuItem
                        key={`submenu-report-${menu
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        onClick={(e) =>
                          this.handleClickSubMenu(
                            e,
                            menu.toLocaleLowerCase(),
                            `/app/admin/${menu
                              .toLocaleLowerCase()
                              .replace(" ", "-")}`
                          )
                        }
                      >
                        {menu}
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              </Menu>}
              {pageContent.length > 0 && (
                <Menu iconShape="square">
                  <SubMenu title="More Info">
                    {pageContent.map((menu) => (
                      <MenuItem
                        key={`submenu-configpage-${menu.id}`}
                        onClick={(e) =>
                          this.handleClickSubMenu(
                            e,
                            `config-page-${menu.id}`,
                            `/app/moreinfo/config/${menu.id}`
                          )
                        }
                      >
                        {menu.tabName}
                      </MenuItem>
                    ))}
                  </SubMenu>
                </Menu>
              )}
              {/* <Menu iconShape="square">
                <MenuItem
                  onClick={(e) => this.handleClickMainMenu(e, "settings", true)}
                >
                  More Info
                </MenuItem>
              </Menu> */}
              <Menu iconShape="square">
                <SubMenu title="Help">
                  {projectId && surveyId && (
                    <MenuItem
                      onClick={(e) =>
                        this.handleClickSubMenu(e, "take-the-tour", `/app/tour`)
                      }
                    >
                      Take the tour
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={(e) =>
                      this.handleClickSubMenu(
                        e,
                        "how-to-use-pulse",
                        `/app/help/how-to-use-pulse`
                      )
                    }
                  >
                    How to use Pulse
                  </MenuItem>
                  <MenuItem
                    onClick={(e) =>
                      this.handleClickSubMenu(
                        e,
                        "turn-on-guide-mode",
                        "/app/help/turn-on-guide-mode"
                      )
                    }
                  >
                    <span>{`Turn On Guide Mode `}</span>
                    <br />
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
                  </MenuItem>
                </SubMenu>
              </Menu>
              <Menu iconShape="square">
                <MenuItem
                  onClick={(e) => this.handleClickMainMenu(e, "logout", false)}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </ProSidebar>
          </div>
        </div>
        {surveyId !== null && surveyId.toString() !== "" && (
          <DialogTourView
            surveyId={surveyId}
            open={this.state.tourViewOpen}
            onClose={(e) => this.handleCloseTourDialog()}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ menu, settings, authUser, tour, account }) => {
  const { mainMenuClassName, subMenuClassName } = menu;
  const { projectList } = settings;
  const { user, surveyId, surveyUserId, projectId } = authUser;
  const { pageContent, tooltipContent } = tour;
  const { profile } = account;

  return {
    user,
    surveyId,
    surveyUserId,
    projectId,
    projectList,
    mainMenuClassName,
    subMenuClassName,
    guide: profile.guide,
    pageContent,
    tooltipContent,
    isSuperUser: profile.is_superuser
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
    actionCheckDashboard: checkDashboard,
  })(Sidebar)
);
