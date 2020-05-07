import React from "react";

import TopNav from "Containers/TopNav";

import { connect } from "react-redux";

import {
  userList,
  stakeholderList,
  kMapData,
  kMapSave,
  projectMapData,
  projectMapSave,
  aoQuestionList,
  driverList,
  submitAoQuestion,
  skipQuestionList,
  teamList,
  shCategoryList,
  addStakeholder,
} from "Redux/actions";

import { KGraph, AoSurvey, KGraphNavControls } from "Components/MyMap";
import { NewStakeholder } from "Components/Survey";
import SearchBar from "Components/search-bar";
import Button from "Components/Button";

import { SH_CATEGORY_TYPE } from "Constants/defaultValues";
import { Droppable } from "react-drag-and-drop";

import styles from "./styles.scss";
import classnames from "classnames";

import { uuid } from "uuidv4";

const searchKey = "";

class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.myMapProjectUserList = [];
    this.projectMapProjectUserList = [];

    this.state = {
      screen: "list",
      stakeholderList: [],
      currentSurveyUserId: 0,
      currentSurveyUser: "",
      newStakeholder: {},
      mapStyle: "my-map",
      viewDropDownOpen: false,
      layoutDropDownOpen: false,
      enableLayout: true,
      layout: "Standard",
      viewMode: "Org/ Team/ SH",
      layoutUpdated: false,
      apList: null,
      esList: null,
      projectApList: null,
      projectEsList: null,
      teamList: [],
      userList: [],
      shCategoryList: [],
      projectMapShCategoryList: [],
      decisionMakerList: [],
      mapSaveLoading: false,
      mapGetLoading: false,

      toggleGraph: true,
      search: "",

      searchFullHeight: false,
    };

    this.defaultStakeholder = {
      projectUserId: "",
      projectId: this.props.projectId,
      projectUserTitle: "",
      projectUserRoleDesc: "",
      userId: this.props.userId,
      fullName: "",
      teamId: "",
      team: "",
      organisationId: "",
      organisation: "",
      myCategoryList: [],
      projectCategoryList: [],
      show: true,
      firstName: "",
      lastName: "",
      email: "",
    };
  }

  handleAddNewStakeholder = (stakeholder) => {
    const { projectId } = this.props;

    this.props.addStakeholder(projectId, stakeholder);
  };

  handleShowAddPage = () => {
    this.setState({
      screen: "add",
    });
  };

  handleAddStackholderToGraph = (data, e = {}) => {
    const projectUserId = data.stakeholder;
    const { stakeholderList } = this.state;
    let projectUser = stakeholderList.filter((e) => {
      return parseInt(e.projectUserId, 10) === parseInt(projectUserId, 10);
    });

    if (projectUser.length === 0) return;

    projectUser = projectUser[0];

    let newElem = {
      individuals: [
        {
          id: projectUser.userId + "_" + uuid(),
          name: projectUser.fullName,
          color: "transparent",
          icon: "fa-user",
          avatar: projectUser.userAvatar,
          survey_completion:
            (projectUser.aoAnswered / projectUser.aoTotal) * 100,
          iconColor: "rgb(0, 0, 0)",
          team: {
            current: projectUser.teamId,
            changeable: true,
          },
          organisation: {
            current: projectUser.organisationId,
            changeable: true,
          },
          viewCoordinates:
            Object.keys(e).length > 0
              ? {
                  clientX: e.clientX,
                  clientY: e.clientY,
                }
              : {},
        },
      ],
      teams: [
        {
          id: projectUser.teamId,
          name: projectUser.team,
          icon: "fa-users",
        },
      ],
      organisations: [
        {
          id: projectUser.organisationId,
          icon: "fa-building",
          name: projectUser.organisation,
        },
      ],
    };

    this.setState({ newStakeholder: newElem }, () => {
      if (!newElem.individuals[0].sh_category) return;
      const newProjectUserId = projectUser.projectUserId;
      const newShCategory = newElem.individuals[0].sh_category.current.split(
        "_"
      )[1];

      let bExist = false;

      for (let i = 0; i < this.myMapProjectUserList.length; i++) {
        if (
          this.myMapProjectUserList[i].projectUserId === newProjectUserId &&
          this.myMapProjectUserList[i].shCategory === newShCategory
        ) {
          bExist = true;
          break;
        }
      }
      if (!bExist) {
        this.myMapProjectUserList.push({
          projectUserId: newProjectUserId,
          shCategory: parseInt(newShCategory, 10),
        });
      }
    });
  };

  handleAddStackholderToProjectGraph = (data, e = {}) => {

    const projectUserId = data.stakeholder;
    const { stakeholderList } = this.state;
    let projectUser = stakeholderList.filter((e) => {
      return parseInt(e.projectUserId, 10) === parseInt(projectUserId, 10);
    });

    if (projectUser.length === 0) return;

    projectUser = projectUser[0];

    let newElem = {
      individuals: [
        {
          id: projectUser.userId + "_" + uuid(),
          name: projectUser.fullName,
          color: "transparent",
          icon: "fa-user",
          avatar: projectUser.userAvatar,
          survey_completion:
            (projectUser.aoAnswered / projectUser.aoTotal) * 100,
          iconColor: "rgb(0, 0, 0)",
          team: {
            current: projectUser.teamId,
            changeable: true,
          },
          organisation: {
            current: projectUser.organisationId,
            changeable: true,
          },
          viewCoordinates:
            Object.keys(e).length > 0
              ? {
                  clientX: e.clientX,
                  clientY: e.clientY,
                }
              : {},
        },
      ],
      teams: [
        {
          id: projectUser.teamId,
          name: projectUser.team,
          icon: "fa-users",
        },
      ],
      organisations: [
        {
          id: projectUser.organisationId,
          icon: "fa-building",
          name: projectUser.organisation,
        },
      ],
    };

    this.setState({ newStakeholder: newElem }, () => {
      if (!newElem.individuals[0].sh_category) return;
      const newProjectUserId = projectUser.projectUserId;
      const newShCategory = newElem.individuals[0].sh_category.current.split(
        "_"
      )[1];

      let bExist = false;

      for (let i = 0; i < this.projectMapProjectUserList.length; i++) {
        if (
          this.projectMapProjectUserList[i].projectUserId === newProjectUserId &&
          this.projectMapProjectUserList[i].shCategory === newShCategory
        ) {
          bExist = true;
          break;
        }
      }
      if (!bExist) {
        this.projectMapProjectUserList.push({
          projectUserId: newProjectUserId,
          shCategory: parseInt(newShCategory, 10),
        });
      }
    });
  };

  componentWillMount() {
    const { projectId, projectUserId, userId } = this.props;

    this.props.getKMapData(userId, projectId);
    this.props.getProjectMapData(userId, projectId);
    this.props.getShCategoryList(0);
    this.props.getStakeholderList(projectId);
    this.props.getTeamList();
    this.props.getAoQuestionList(projectUserId);
    this.props.getDriverList();
    this.props.getSkipQuestionList();
  }

  componentWillReceiveProps(props) {
    const {
      stakeholderList,
      teamList,
      shCategoryList,
      projectMapShCategoryList,
      userList,
      kMapData,
      projectMapData,
      mapSaveLoading,
      mapGetLoading,
    } = props;

    /*
     * ------------------------------------------------------------------------------
     * For MyMap Layouts
     * ------------------------------------------------------------------------------
     */
    let architecture = {
      main: {
        id: "ap1",
        name: "ME",
        icon: "http://3.17.57.137/media/uploads/shcategory/me.svg",
        color: "#7030a0",
        iconColor: "#fefefa",
      },
      sh_categories: [],
    };

    let individual = {
      individuals: [],
      teams: [],
      organisations: [],
    };

    let projectMapArchitecture = {
      main: {
        id: "ap1",
        name: "projectTitle",
        icon: "http://3.17.57.137/media/uploads/shcategory/project.svg",
        color: "#7030a0",
        iconColor: "#fefefa",
      },
      sh_categories: [],
    };

    let projectMapIndividual = {
      individuals: [],
      teams: [],
      organisations: [],
    };

    if (
      teamList.length > 0 &&
      userList.length > 0 &&
      (shCategoryList.length > 0 || projectMapShCategoryList.length > 0)
    ) {
      // Make Architecture For My Map
      shCategoryList.forEach((shCategory) => {
        architecture.sh_categories.push({
          id: "SHC_" + shCategory.id,
          name: shCategory.SHCategoryName,
          icon: shCategory.icon,
          color: "#59a2ad",
          iconColor: "#fefefa",
          individualCount: 0,
          expanded: false,
        });
      });

      projectMapShCategoryList.forEach((shCategory) => {
        projectMapArchitecture.sh_categories.push({
          id: "SHC_" + shCategory.id,
          name: shCategory.SHCategoryName,
          icon: shCategory.icon,
          color: "#59a2ad",
          iconColor: "#fefefa",
          individualCount: 0,
          expanded: false,
        });
      });

      // Individual -> Team List
      teamList.forEach((team) => {
        individual.teams.push({
          id: "T_" + team.id,
          name: team.name,
          icon: "fa-users",
        });
        projectMapIndividual.teams.push({
          id: "T_" + team.id,
          name: team.name,
          icon: "fa-users",
        });
      });

      // Individual -> Organization
      let organizationList = [];
      userList.forEach((user) => {
        if (organizationList.length === 0) {
          organizationList.push({
            id: "O_" + user.user.organization.name,
            icon: "fa-building",
            name: user.user.organization.name,
          });
        } else {
          let bExist = false;
          organizationList.forEach((o) => {
            if (o.id === "O_" + user.user.organization.name) {
              bExist = true;
            }
          });
          if (bExist === false) {
            organizationList.push({
              id: "O_" + user.user.organization.name,
              icon: "fa-building",
              name: user.user.organization.name,
            });
          }
        }
      });

      individual.organisations = organizationList;
      projectMapIndividual.organisations = organizationList;

      let individualList = [];
      if (kMapData.length > 0) {
        let mapUserList = [];
        for (let i = 0; i < kMapData[0].pu_category.length; i++) {
          mapUserList.push({
            projectUserId: kMapData[0].pu_category[i].projectUser,
            shCategory: kMapData[0].pu_category[i].category,
          });
        }

        mapUserList.forEach((mapUser) => {
          let bExist = false;
          for (let i = 0; i < this.myMapProjectUserList.length; i++) {
            if (
              this.myMapProjectUserList[i].projectUserId ===
                mapUser.projectUserId &&
              this.myMapProjectUserList[i].shCategory === mapUser.shCategory
            ) {
              bExist = true;
              break;
            }
          }
          if (!bExist) {
            this.myMapProjectUserList.push(mapUser);
          }

          // console.log("---------------------");
          // console.log(this.myMapProjectUserList);

          let individualUser = {
            id: "",
            name: "",
            icon: "fa-user",
            survey_completion: 0,
            team: {
              current: "",
              changeable: false,
            },
            organisation: {
              current: "",
              changeable: false,
            },
            sh_category: {
              current: "",
              changeable: false,
            },
          };
          let bAdd = false;
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === mapUser.projectUserId) {
              for (let j = 0; j < userList[i].shCategory.length; j++) {
                if (userList[i].shCategory[j] === mapUser.shCategory) {
                  individualUser.id = `S_${userList[i].user.id}_SHC_${userList[i].shCategory[j]}`;
                  individualUser.avatar =
                    userList[i].user.avatar == null
                      ? ""
                      : userList[i].user.avatar.name;
                  individualUser.name = `${userList[i].user.first_name} ${userList[i].user.last_name}`;
                  individualUser.team.current = `T_${userList[i].team.id}`;
                  individualUser.organisation.current = `O_${userList[i].user.organization.name}`;
                  individualUser.sh_category.current = `SHC_${userList[i].shCategory[j]}`;
                  individualUser.survey_completion =
                    (userList[i].ao_answered / userList[i].ao_total) * 100;

                  bAdd = true;

                  break;
                }
              }
            }
          }
          // console.log("---individual list----------");
          // console.log(individualList);
          if (bAdd) {
            individualList.push(individualUser);
            // update SHCategory individual Count
            for (let i = 0; i < architecture.sh_categories.length; i++) {
              if (
                architecture.sh_categories[i].id ===
                individualUser.sh_category.current
              ) {
                architecture.sh_categories[i].individualCount++;
                break;
              }
            }
          }
        });
      }

      individual.individuals = individualList;

      // Project Map Individuals
      individualList = [];
      if (projectMapData.length > 0) {
        let mapUserList = [];
        for (let i = 0; i < projectMapData[0].pu_category.length; i++) {
          mapUserList.push({
            projectUserId: projectMapData[0].pu_category[i].projectUser,
            shCategory: projectMapData[0].pu_category[i].category,
          });
        }

        mapUserList.forEach((mapUser) => {
          let bExist = false;
          for (let i = 0; i < this.projectMapProjectUserList.length; i++) {
            if (
              this.projectMapProjectUserList[i].projectUserId ===
                mapUser.projectUserId &&
              this.projectMapProjectUserList[i].shCategory === mapUser.shCategory
            ) {
              bExist = true;
              break;
            }
          }
          if (!bExist) {
            this.projectMapProjectUserList.push(mapUser);
          }

          let individualUser = {
            id: "",
            name: "",
            icon: "fa-user",
            survey_completion: 0,
            team: {
              current: "",
              changeable: false,
            },
            organisation: {
              current: "",
              changeable: false,
            },
            sh_category: {
              current: "",
              changeable: false,
            },
          };
          let bAdd = false;
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === mapUser.projectUserId) {
              for (let j = 0; j < userList[i].shCategory.length; j++) {
                if (userList[i].shCategory[j] === mapUser.shCategory) {
                  individualUser.id = `S_${userList[i].user.id}_SHC_${userList[i].shCategory[j]}`;
                  individualUser.avatar =
                    userList[i].user.avatar == null
                      ? ""
                      : userList[i].user.avatar.name;
                  individualUser.name = `${userList[i].user.first_name} ${userList[i].user.last_name}`;
                  individualUser.team.current = `T_${userList[i].team.id}`;
                  individualUser.organisation.current = `O_${userList[i].user.organization.name}`;
                  individualUser.sh_category.current = `SHC_${userList[i].shCategory[j]}`;
                  individualUser.survey_completion =
                    (userList[i].ao_answered / userList[i].ao_total) * 100;

                  bAdd = true;

                  break;
                }
              }
            }
          }

          if (bAdd) {
            individualList.push(individualUser);
            // update SHCategory individual Count
            for (let i = 0; i < projectMapArchitecture.sh_categories.length; i++) {
              if (
                projectMapArchitecture.sh_categories[i].id ===
                individualUser.sh_category.current
              ) {
                projectMapArchitecture.sh_categories[i].individualCount++;
                break;
              }
            }
          }
        });
      }

      projectMapIndividual.individuals = individualList;

      //--------------------------------------------------------------------

      let decisionMakerList = [];
      if (kMapData.length > 0 && stakeholderList.length > 0) {
        let mapUserList = kMapData[0].projectUser;
        for (let i = 0; i < mapUserList.length; i++) {
          for (let j = 0; j < stakeholderList.length; j++) {
            if (mapUserList[i] === stakeholderList[j].projectUserId) {
              decisionMakerList.push(stakeholderList[j]);
              break;
            }
          }
        }
      }

      // Project Map
      // const projectArchitecture = {
      //   main: {
      //     ...architecture.main
      //   },
      //   sh_categories: []
      // }

      // projectArchitecture.main.name = projectTitle;
      // projectArchitecture.main.icon = "http://3.17.57.137/media/uploads/shcategory/project.svg";
      // projectArchitecture.main.color = "#7030a0";
      // projectArchitecture.main.iconColor = "#fefefa";

      // for (let i = 0; i < architecture.sh_categories.length; i++) {
      //   projectArchitecture.sh_categories.push({
      //     ...architecture.sh_categories[i],
      //     individualCount: 0,
      //   });
      // }

      this.setState({
        stakeholderList,
        decisionMakerList,
        teamList,
        userList,
        shCategoryList,
        projectMapShCategoryList,
        apList: architecture,
        esList: individual,
        projectApList: projectMapArchitecture,
        projectEsList: projectMapIndividual,
        screen: "list",
        mapSaveLoading,
        mapGetLoading,
      });
    }
  }

  handleFilter = (search) => {
    const filter = search;

    this.setState((state) => {
      for (let i = 0; i < state.stakeholderList.length; i++) {
        if (search === "") {
          state.stakeholderList[i].show = true;
          continue;
        }
        const index = state.stakeholderList[i].fullName.indexOf(filter);

        if (index < 0) {
          state.stakeholderList[i].show = false;
        }
      }
      return {
        stakeholderList: state.stakeholderList,
      };
    });
  };

  handleStartOtherSurvey = (id) => {
    if (id.startsWith("S_")) {
      let user = {};
      for (let i = 0; i < this.state.decisionMakerList.length; i++) {
        if (id.includes(`${this.state.decisionMakerList[i].userId}_`)) {
          user = this.state.decisionMakerList[i];
          break;
        }
      }

      this.setState({
        screen: "aosurvey",
        currentSurveyUserId: id,
        currentSurveyUser: user,
      });
    }
  };

  handleCancelSurvey = (e) => {
    this.setState({
      screen: "list",
      currentSurveyUserId: 0,
      currentSurveyUser: {},
    });
  };

  handleSubmitSurvey = (e, answerData) => {
    this.props.submitAoQuestion(
      answerData,
      this.props.history,
      this.state.currentSurveyUserId
    );
  };

  handleToggleMapModeDropdown = () => {
    this.setState({
      viewDropDownOpen: !this.state.viewDropDownOpen,
      layoutUpdated: false,
      newStakeholder: [],
    });
  };

  handleToggleLayoutDropdown = (e) => {
    let currentSelection =
      e.target.parentNode.parentNode.childNodes[0].innerHTML;
    let validUpdate =
      currentSelection.indexOf("Toggle Dropdown") === 22 ||
      (currentSelection.indexOf("<") === -1 &&
        currentSelection !== this.state.layout);
    this.setState({
      layoutDropDownOpen: !this.state.layoutDropDownOpen,
      layoutUpdated: validUpdate,
      newStakeholder: [],
    });
  };

  setMapMode = (selection, option) => {
    this.setState({
      [option]: selection,
      layoutUpdated: option === "layout" ? true : false,
      newStakeholder: [],
    });
  };

  handleSaveGraph = (e) => {
    const { userId, projectId } = this.props;
    const { mapStyle } = this.state;

    let mapProjectUserList = [];

    if (mapStyle === "my-map") {
      for (let i = 0; i < this.myMapProjectUserList.length; i++) {
        mapProjectUserList.push({
          projectUser: this.myMapProjectUserList[i].projectUserId,
          category: this.myMapProjectUserList[i].shCategory,
        });
      }
    } else {
      for (let i = 0; i < this.projectMapProjectUserList.length; i++) {
        mapProjectUserList.push({
          projectUser: this.projectMapProjectUserList[i].projectUserId,
          category: this.projectMapProjectUserList[i].shCategory,
        });
      }
    }
   
    
    const newMapData = {
      user: userId,
      project: projectId,
      pu_category: mapProjectUserList,
      layout_json: {},
    };
    // console.log(newMapData); return;
    if (mapStyle === "my-map") {
      this.props.saveKMapData(newMapData);
    } else {
      this.props.saveProjectMapData(newMapData);
    }
  };

  toggleGraph = (e) => {
    this.setState({
      toggleGraph: !this.state.toggleGraph,
    });
  };

  handleSearchFocus = () => {
    this.setState({
      searchFullHeight: true,
    });
  };

  handleSearchBlur = () => {
    this.setState({
      searchFullHeight: false,
    });
  };

  handleSelectMapStyle = (mapStyle) => {
    this.setState({
      mapStyle,
    });
  };

  render() {
    const {
      projectTitle,
      aoQuestionList,
      optionList,
      driverList,
      skipQuestionList,
      history,
    } = this.props;

    const {
      enableLayout,
      viewDropDownOpen,
      layoutDropDownOpen,
      layout,
      viewMode,
      newStakeholder,
      layoutUpdated,
      screen,
      stakeholderList,
      apList,
      esList,
      projectApList,
      projectEsList,
      shCategoryList,
      projectMapShCategoryList,
      decisionMakerList,
      teamList,
      userList,
      mapSaveLoading,
      mapGetLoading,
      toggleGraph,
      currentSurveyUser,
      searchFullHeight,
      mapStyle,
    } = this.state;

    const mapHeaderVisible = toggleGraph
      ? classnames(styles["map-header"])
      : classnames(styles["map-header"], styles["mobile-hide"]);
    const mapContentVisible = toggleGraph
      ? classnames(styles["map-content"])
      : classnames(styles["map-content"], styles["mobile-hide"]);
    const stakeholderVisible = !toggleGraph
      ? classnames(styles["map-stakeholder"])
      : classnames(styles["map-stakeholder"], styles["mobile-hide"]);

    return (
      <div className={styles.root}>
        {(!searchFullHeight || toggleGraph) && (
          <div className={styles.topbar}>
            <TopNav history={history} menuTitle="My Map">
              {screen === "aosurvey" && (
                <div className={styles.section}>
                  <div className={styles["graph-toggle"]}>
                    <h2 className={styles["project-name"]}>{projectTitle}</h2>
                  </div>
                </div>
              )}
              {screen !== "aosurvey" && (
                <div className={styles.section}>
                  <h2 className={styles["project-name"]}>{projectTitle}</h2>
                  <div className={styles["graph-toggle"]}>
                    <Button onClick={(e) => this.toggleGraph(e)}>
                      {!toggleGraph ? "GRAPH VIEW" : "STAKEHOLDER"}
                    </Button>
                  </div>
                </div>
              )}
            </TopNav>
          </div>
        )}
        <div
          className={classnames(styles["map-container"], {
            [styles.full]:
              searchFullHeight && !toggleGraph && screen === "list",
          })}
        >
          <div className={classnames(mapHeaderVisible)}>
            <div className={styles["map-title"]}>
              <svg
                className={styles.icon}
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
              <h2
                className={classnames(styles["title"], {
                  [styles["map-selected"]]: mapStyle === "my-map",
                })}
                onClick={(e) => this.handleSelectMapStyle("my-map")}
              >
                My Map
              </h2>
              <h2
                className={classnames(styles["title"], {
                  [styles["map-selected"]]: mapStyle === "project-map",
                })}
                onClick={(e) => this.handleSelectMapStyle("project-map")}
              >
                Project Map
              </h2>
            </div>
            <div className={styles["map-control"]}>
              <KGraphNavControls
                enableLayout={enableLayout}
                viewDropDownOpen={viewDropDownOpen}
                layoutDropDownOpen={layoutDropDownOpen}
                updateViewDisplay={this.handleToggleMapModeDropdown}
                updateLayoutDisplay={this.handleToggleLayoutDropdown}
                updateMap={this.setMapMode}
                saveGraph={(e) => this.handleSaveGraph(e)}
                saveLoading={mapSaveLoading}
                selectedLayout={layout}
                selectedViewMode={viewMode}
              />
            </div>
          </div>
          <div
            className={classnames(styles["map-content-section"], {
              [styles.full]:
                searchFullHeight && !toggleGraph && screen === "list",
            })}
          >
            {mapStyle === "my-map" && (
              <Droppable
                className={mapContentVisible}
                types={["stakeholder"]} // <= allowed drop types
                onDrop={(data, e) => {
                  this.handleAddStackholderToGraph(data, e);
                }}
              >
                {userList.length > 0 &&
                  teamList.length > 0 &&
                  shCategoryList.length > 0 &&
                  mapGetLoading === false && (
                    <KGraph
                      setParentState={this.setState.bind(this)}
                      apList={apList}
                      esList={esList}
                      newStakeholder={newStakeholder}
                      onClickNode={(id) => this.handleStartOtherSurvey(id)}
                      layout={layout.toLowerCase()}
                      viewMode={viewMode}
                      layoutUpdated={layoutUpdated}
                    />
                  )}
              </Droppable>
            )}
            {mapStyle === "project-map" && (
              <Droppable
                className={mapContentVisible}
                types={["stakeholder"]} // <= allowed drop types
                onDrop={(data, e) => {
                  this.handleAddStackholderToProjectGraph(data, e);
                }}
              >
                {userList.length > 0 &&
                  teamList.length > 0 &&
                  projectMapShCategoryList.length > 0 &&
                  mapGetLoading === false && (
                    <KGraph
                      setParentState={this.setState.bind(this)}
                      apList={projectApList}
                      esList={projectEsList}
                      newStakeholder={newStakeholder}
                      onClickNode={(id) => this.handleStartOtherSurvey(id)}
                      layout={layout.toLowerCase()}
                      viewMode={viewMode}
                      layoutUpdated={layoutUpdated}
                    />
                  )}
              </Droppable>
            )}
            <div
              className={classnames(stakeholderVisible, {
                [styles.full]:
                  searchFullHeight && !toggleGraph && screen === "list",
              })}
            >
              {screen === "list" && shCategoryList.length > 0 && (
                <SearchBar
                  searchKey={searchKey}
                  decisionMakers={decisionMakerList}
                  onClickDecisionMaker={(id) => this.handleStartOtherSurvey(id)}
                  allStakeholders={stakeholderList}
                  addNewStakeholder={(e) => this.handleShowAddPage(e)}
                  onSearchFocus={(e) => this.handleSearchFocus()}
                  onSearchBlur={(e) => this.handleSearchBlur()}
                />
              )}
              {screen === "add" && shCategoryList.length > 0 && (
                <NewStakeholder
                  shCategoryList={shCategoryList}
                  projectMapShCategoryList={projectMapShCategoryList}
                  teamList={teamList}
                  onCancel={(e) => this.handleCancelSurvey()}
                  onAddStakeholder={(data) =>
                    this.handleAddNewStakeholder(data)
                  }
                  stakeholder={this.defaultStakeholder}
                />
              )}
              {screen === "aosurvey" &&
                aoQuestionList.length > 0 &&
                optionList.length > 0 &&
                driverList.length > 0 &&
                skipQuestionList.length > 0 && (
                  <AoSurvey
                    questions={aoQuestionList}
                    options={optionList}
                    drivers={driverList}
                    user={currentSurveyUser}
                    skipQuestionList={skipQuestionList}
                    onSubmit={(e, answerData) =>
                      this.handleSubmitSurvey(e, answerData)
                    }
                    onCancel={(e) => this.handleCancelSurvey()}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  survey,
  kmap,
  common,
  settings,
  aosurvey,
  authUser,
}) => {
  const { projectId, projectTitle, projectUserId, user } = authUser;
  const { surveyId } = survey;
  const { locale } = settings;
  const { kMapData, projectMapData, mapSaveLoading, mapGetLoading } = kmap;
  const {
    driverList,
    skipQuestionList,
    stakeholderList,
    teamList,
    shCategoryList,
    projectMapShCategoryList,
    userList,
  } = common;
  const { aoQuestionList, optionList } = aosurvey;

  return {
    userId: user.userId,
    projectId,
    projectTitle,
    projectUserId,
    stakeholderList,
    teamList,
    shCategoryList,
    projectMapShCategoryList,
    userList,
    skipQuestionList,
    surveyId,
    kMapData,
    projectMapData,
    aoQuestionList,
    optionList,
    driverList,
    locale,
    commonLoading: common.loading,
    mapSaveLoading,
    mapGetLoading,
  };
};

export default connect(mapStateToProps, {
  getUserList: userList,
  getStakeholderList: stakeholderList,
  getKMapData: kMapData,
  saveKMapData: kMapSave,
  getProjectMapData: projectMapData,
  saveProjectMapData: projectMapSave,
  getShCategoryList: shCategoryList,
  getAoQuestionList: aoQuestionList,
  getDriverList: driverList,
  getSkipQuestionList: skipQuestionList,
  getTeamList: teamList,
  submitAoQuestion,
  addStakeholder,
})(MyMap);
