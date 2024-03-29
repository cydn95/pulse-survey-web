import React from "react";
import { connect } from "react-redux";
import { Droppable } from "react-drag-and-drop";

import { Button as MButton, ButtonGroup } from "@material-ui/core";

import TopNav from "Containers/TopNav";
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
  updateStakeholder,
} from "Redux/actions";

import {
  KGraphContainer,
  AoSurvey,
  KGraphNavControls,
  StakeholderManager,
} from "Components/MyMap";
import { NewStakeholder } from "Components/Survey";
import Button from "Components/Button";

import { serverUrl } from "Constants/defaultValues";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

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
      viewMode: "SH only",
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

      myMapStakeholderList: [],
      projectMapStakeholderList: [],
      aoQuestionList: [],

      lastAddedShCategory: null,

      aoSurveySubmitLoading: false,
      mapRefresh: false,
      expandedElements: [],
      toggledElements: [],
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
      myProjectUser: this.props.surveyUserId,
    };
  }

  componentWillMount() {
    const { userId, surveyId, surveyUserId, projectId, history } = this.props;
    if (
      surveyId == undefined ||
      surveyId == null ||
      surveyId <= 0 ||
      surveyUserId == undefined ||
      surveyUserId == null ||
      surveyUserId <= 0
    ) {
      history.push("/app/project-not-found");
      return;
    }

    this.props.getKMapData(surveyUserId, userId);
    this.props.getProjectMapData(surveyUserId, userId);
    this.props.getShCategoryList(surveyId, 0);
    this.props.getStakeholderList(surveyUserId, surveyId);
    this.props.getTeamList(projectId);
    this.props.getAoQuestionList(surveyUserId, surveyId);
    this.props.getDriverList(surveyId);
    this.props.getSkipQuestionList();
  }

  componentWillReceiveProps(props) {
    const {
      projectId,
      projectTitle,
      stakeholderList,
      teamList,
      shCategoryList,
      projectMapShCategoryList,
      userList,
      kMapData,
      projectMapData,
      mapSaveLoading,
      mapGetLoading,
      aoQuestionList
    } = props;

    this.projectMapProjectUserList = []
    this.myMapProjectUserList = []
    // console.log('--------------------------------------');
    // console.log("StakeholderList:=", stakeholderList);
    console.log(userList);
    // console.log(kMapData);
    // console.log(aoQuestionList);
    // console.log("--------------------------------------");

    // console.log('here1', aoQuestionList === this.props.aoQuestionList)
    // console.log('here2', stakeholderList === this.props.stakeholderList)
    // console.log('here2', userList === this.props.userList)
    // console.log('here3', stakeholderList)
    // console.log('here4', this.props.stakeholderList)
    // console.log('here3', shCategoryList === this.props.shCategoryList)
    // console.log('here4', mapGetLoading === this.props.mapGetLoading)
    // console.log('here5', mapSaveLoading === this.props.mapSaveLoading)
    // console.log('here6', teamList === this.props.teamList)

    const kMapDataForCurrentProject =
      kMapData.length > 0
        ? kMapData.filter((map) => map.project.toString() === projectId.toString())
        : [];

    const projectMapDataForCurrentProject =
      projectMapData.length > 0
        ? projectMapData.filter((map) => map.project.toString() === projectId.toString())
        : [];
    /*
     * ------------------------------------------------------------------------------
     * For MyMap Layouts
     * ------------------------------------------------------------------------------
     */
    let architecture = {
      main: {
        id: "ap1",
        name: "ME",
        icon: `${serverUrl}/media/uploads/shcategory/me.svg`,
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
        name: projectTitle,
        icon: `${serverUrl}/media/uploads/shcategory/project.svg`,
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
      (shCategoryList.length > 0 || projectMapShCategoryList.length > 0) &&
      aoQuestionList.length > 0
    ) {
      // console.log('here')

      // const totalQuestions = aoQuestionList.length;
      // console.log(aoQuestionList);

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
        const organizationName = (user.projectOrganization && user.projectOrganization !== '') ? user.projectOrganization : user.user.organization.name;
        if (organizationList.length === 0) {
          organizationList.push({
            id: "O_" + organizationName,
            icon: "fa-sitemap",
            name: organizationName,
          });
        } else {
          let bExist = false;
          organizationList.forEach((o) => {
            if (o.id === "O_" + organizationName) {
              bExist = true;
            }
          });
          if (bExist === false) {
            organizationList.push({
              id: "O_" + organizationName,
              icon: "fa-sitemap",
              name: organizationName,
            });
          }
        }
      });

      individual.organisations = organizationList;
      projectMapIndividual.organisations = organizationList;

      // console.log("kMapDataForCurrentProject:=", kMapDataForCurrentProject);

      let individualList = [];
      if (kMapDataForCurrentProject.length > 0) {
        let mapUserList = [];
        for (
          let i = 0;
          i < kMapDataForCurrentProject[0].pu_category.length;
          i++
        ) {
          if (
            shCategoryList.filter(
              (sc) =>
                sc.id.toString() === kMapDataForCurrentProject[0].pu_category[i].category.toString()
            ).length > 0
          ) {
            mapUserList.push({
              projectUserId:
                kMapDataForCurrentProject[0].pu_category[i].projectUser,
              shCategory: kMapDataForCurrentProject[0].pu_category[i].category,
            });
          }
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
            survey_sentiment: 0,
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
                if (!userList[i].team) {
                  continue;
                }
                if (userList[i].shCategory[j] === mapUser.shCategory) {

                  const organizationName = (userList[i].projectOrganization && userList[i].projectOrganization !== '') ? userList[i].projectOrganization : userList[i].user.organization.name;

                  individualUser.id = `S_${userList[i].user.id}_SHC_${userList[i].shCategory[j]}`;
                  individualUser.projectUserId = userList[i].id;
                  individualUser.avatar =
                    userList[i].user.avatar == null
                      ? ""
                      : userList[i].user.avatar.name;
                  individualUser.name = `${userList[i].user.first_name} ${userList[i].user.last_name}`;
                  individualUser.team.current = `T_${userList[i].team.id}`;
                  individualUser.organisation.current = `O_${organizationName}`;
                  individualUser.sh_category.current = `SHC_${userList[i].shCategory[j]}`;

                  // Calculate Survey Completion - MyMap (Sentiment Answer should be completion rate)
                  let sentimentAnswer = 0;
                  let sentimentAnswerCnt = 0;

                  let totalAnswer = 0;
                  let totalQuestion = 0;

                  for (let k = 0; k < aoQuestionList.length; k++) {
                    totalQuestion++;

                    const answer = aoQuestionList[k].response.filter(
                      (resp) =>
                        /*resp.shCategory.toString() === userList[i].shCategory[j].toString() &&*/
                        resp.subProjectUser.toString() === userList[i].id.toString()
                    );
                    if (answer.length > 0) {
                      totalAnswer++;
                      if (aoQuestionList[k].subdriver === "Overall Sentiment") {
                        sentimentAnswer += answer[0].integerValue;
                        sentimentAnswerCnt++;
                      }
                    }
                  }

                  individualUser.survey_completion = (totalAnswer / totalQuestion).toFixed(2) * 100;
                  individualUser.survey_sentiment = (sentimentAnswer / sentimentAnswerCnt).toFixed(2);

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
      if (projectMapDataForCurrentProject.length > 0) {
        let mapUserList = [];
        for (
          let i = 0;
          i < projectMapDataForCurrentProject[0].pu_category.length;
          i++
        ) {
          mapUserList.push({
            projectUserId:
              projectMapDataForCurrentProject[0].pu_category[i].projectUser,
            shCategory:
              projectMapDataForCurrentProject[0].pu_category[i].category,
          });
        }

        mapUserList.forEach((mapUser) => {
          let bExist = false;
          for (let i = 0; i < this.projectMapProjectUserList.length; i++) {
            if (
              this.projectMapProjectUserList[i].projectUserId ===
              mapUser.projectUserId &&
              this.projectMapProjectUserList[i].shCategory ===
              mapUser.shCategory
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
            survey_sentiment: 0,
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
                  // console.log(userList[i].projectOrganization && userList[i].projectOrganization !== '')
                  const organizationName = (userList[i].projectOrganization && userList[i].projectOrganization !== '') ? userList[i].projectOrganization : userList[i].user.organization.name;

                  individualUser.id = `S_${userList[i].user.id}_SHC_${userList[i].shCategory[j]}`;
                  individualUser.projectUserId = userList[i].id;
                  individualUser.avatar =
                    userList[i].user.avatar == null
                      ? ""
                      : userList[i].user.avatar.name;
                  individualUser.name = `${userList[i].user.first_name} ${userList[i].user.last_name}`;
                  individualUser.team.current = `T_${userList[i].team.id}`;
                  individualUser.organisation.current = `O_${organizationName}`;
                  individualUser.sh_category.current = `SHC_${userList[i].shCategory[j]}`;

                  // Calculate Survey Completion - ProjectMap (Sentiment answer should be completion rate)
                  let sentimentAnswer = 0;
                  let sentimentAnswerCnt = 0;

                  let totalQuestion = 0;
                  let totalAnswer = 0;
                  for (let k = 0; k < aoQuestionList.length; k++) {
                    totalQuestion++;
                    const answer = aoQuestionList[k].response.filter(
                      (resp) =>
                        /*resp.shCategory.toString() === userList[i].shCategory[j].toString() &&*/
                        resp.subProjectUser.toString() === userList[i].id.toString()
                    );
                    if (answer.length > 0) {
                      totalAnswer++;
                      if (aoQuestionList[k].subdriver === "Overall Sentiment") {
                        sentimentAnswer += answer[0].integerValue;
                        sentimentAnswerCnt++;
                      }
                    }
                  }

                  individualUser.survey_completion = (totalAnswer / totalQuestion).toFixed(2) * 100;
                  individualUser.survey_sentiment = (sentimentAnswer / sentimentAnswerCnt).toFixed(2);

                  bAdd = true;

                  break;
                }
              }
            }
          }

          if (bAdd) {
            individualList.push(individualUser);
            // update SHCategory individual Count
            for (
              let i = 0;
              i < projectMapArchitecture.sh_categories.length;
              i++
            ) {
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
      if (kMapDataForCurrentProject.length > 0 && stakeholderList.length > 0) {
        let mapUserList = kMapDataForCurrentProject[0].projectUser;
        for (let i = 0; i < mapUserList.length; i++) {
          for (let j = 0; j < stakeholderList.length; j++) {
            if (mapUserList[i] === stakeholderList[j].projectUserId) {
              decisionMakerList.push(stakeholderList[j]);
              break;
            }
          }
        }
      }

      let myMapStakeholderList = [];
      if (kMapDataForCurrentProject.length > 0 && stakeholderList.length > 0) {
        let mapUserList = kMapDataForCurrentProject[0].projectUser;
        for (let i = 0; i < mapUserList.length; i++) {
          for (let j = 0; j < stakeholderList.length; j++) {
            if (mapUserList[i] === stakeholderList[j].projectUserId) {
              myMapStakeholderList.push(stakeholderList[j]);
              break;
            }
          }
        }
      }

      let projectMapStakeholderList = [];
      if (
        projectMapDataForCurrentProject.length > 0 &&
        stakeholderList.length > 0
      ) {
        let mapUserList = projectMapDataForCurrentProject[0].projectUser;
        for (let i = 0; i < mapUserList.length; i++) {
          for (let j = 0; j < stakeholderList.length; j++) {
            if (mapUserList[i] === stakeholderList[j].projectUserId) {
              projectMapStakeholderList.push(stakeholderList[j]);
              break;
            }
          }
        }
      }

      // console.log('myMapStakeholderList', myMapStakeholderList)
      // console.log('projectMapStakeholderList', projectMapStakeholderList)

      this.setState({
        aoQuestionList,
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
        myMapStakeholderList,
        projectMapStakeholderList,
      });
    }
  }

  handleAddNewStakeholder = (stakeholder) => {
    const { projectId, surveyId, userId } = this.props;
    this.props.addStakeholder(
      userId,
      projectId,
      surveyId,
      stakeholder,
      this.callbackAddNewStakeholder
    );
  };

  callbackAddNewStakeholder = (code) => {
    // console.log('code', code);
    if (code === 400) {
      NotificationManager.error(
        "Stakeholder is already existed",
        "Error",
        2000
      );
    } else {
      window.location.reload(false);
    }
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
          // survey_completion: (
          //   (projectUser.aoAnswered / projectUser.aoTotal) *
          //   100
          // ).toFixed(2),
          survey_completion: 0,
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
          icon: "fa-sitemap",
          name: projectUser.organisation,
        },
      ],
    };
    // console.log('*********************************');
    //       console.log(newElem);
    //       console.log(this.myMapProjectUserList);
    // console.log("*********************************");
    this.setState({ newStakeholder: newElem }, () => setTimeout(
      () => {
        // console.log(newElem.individuals[0].sh_category)
        if (!newElem.individuals[0].sh_category) return;
        const newProjectUserId = projectUser.projectUserId;
        const newShCategory = newElem.individuals[0].sh_category.current.split(
          "_"
        )[1];

        let bExist = false;

        for (let i = 0; i < this.myMapProjectUserList.length; i++) {
          if (
            parseInt(this.myMapProjectUserList[i].projectUserId, 10) ===
            parseInt(newProjectUserId, 10) &&
            parseInt(this.myMapProjectUserList[i].shCategory, 10) ===
            parseInt(newShCategory, 10)
          ) {
            bExist = true;
            break;
          }
        }
        // console.log('new', newShCategory);
        if (!bExist) {
          this.myMapProjectUserList.push({
            projectUserId: newProjectUserId,
            shCategory: parseInt(newShCategory, 10),
          });
        }
        this.setState({
          lastAddedShCategory: parseInt(newShCategory, 10)
        });
      }, 2000));
  };

  handleShowAddPage = () => {
    this.setState({
      screen: "add",
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
          // survey_completion: (
          //   (projectUser.aoAnswered / projectUser.aoTotal) *
          //   100
          // ).toFixed(2),
          survey_completion: 0,
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
          icon: "fa-sitemap",
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
          this.projectMapProjectUserList[i].projectUserId ===
          newProjectUserId &&
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

  handleStartOtherSurvey = (id) => {
    if (id.startsWith("S_")) {
      let user = {};
      for (let i = 0; i < this.state.stakeholderList.length; i++) {
        if (id.includes(`${this.state.stakeholderList[i].userId}_`)) {
          user = this.state.stakeholderList[i];
          break;
        }
      }

      this.setState((state) => ({
        screen: "aosurvey",
        toggleGraph: false,
        currentSurveyUserId: id,
        currentSurveyUser: user,
      }));
    }
  };

  handleCancelSurvey = (e) => {
    this.setState({
      screen: "list",
      currentSurveyUserId: 0,
      currentSurveyUser: {},
    });
  };

  handleSubmitSurvey = (e, answerData, isRefresh = true) => {
    const { lastAddedShCategory } = this.state;

    // console.log(lastAddedShCategory);
    for (let i = 0; i < answerData.length; i++) {
      if (answerData[i].shCategory == undefined) {
        answerData[i].shCategory = lastAddedShCategory;
      }
    }

    const updatedTemp = this.state.aoQuestionList.map(ao => {
      let response = ao.response.map((resp, idx) => {
        let temp = answerData.filter(q => q.amQuestion === resp.aoQuestion && q.subjectUser === resp.subProjectUser)
        if (temp.length === 0) {
          return resp
        }
        return {
          ...resp,
          integerValue: temp[0].integerValue,
          topicValue: temp[0].topicValue,
          commentValue: temp[0].commentValue,
          skipValue: temp[0].skipValue,
          topicTags: temp[0].topicValue,
          commentTags: temp[0].commentTags,
        }
      })
      return { ...ao, response }
    })

    // console.log('esList', this.state.esList)

    let esListTemp = this.state.esList.individuals.map(es => {
      let sentimentAnswer = 0;
      let sentimentAnswerCnt = 0;

      let totalQuestion = 0;
      let totalAnswer = 0;
      for (let k = 0; k < updatedTemp.length; k++) {
        totalQuestion++;
        const answer = updatedTemp[k].response.filter(
          (resp) =>
            /*resp.shCategory.toString() === userList[i].shCategory[j].toString() &&*/
            resp.subProjectUser.toString() === es.projectUserId.toString()
        );
        if (answer.length > 0) {
          totalAnswer++;
          if (updatedTemp[k].subdriver === "Overall Sentiment") {
            sentimentAnswer += answer[0].integerValue;
            sentimentAnswerCnt++;
          }
        }
      }

      return {
        ...es,
        survey_completion: (totalAnswer / totalQuestion).toFixed(2) * 100,
        survey_sentiment: (sentimentAnswer / sentimentAnswerCnt).toFixed(2)
      }
    })

    let projectEsListTemp = this.state.projectEsList.individuals.map(es => {
      let sentimentAnswer = 0;
      let sentimentAnswerCnt = 0;

      let totalQuestion = 0;
      let totalAnswer = 0;
      for (let k = 0; k < updatedTemp.length; k++) {
        totalQuestion++;
        const answer = updatedTemp[k].response.filter(
          (resp) =>
            /*resp.shCategory.toString() === userList[i].shCategory[j].toString() &&*/
            resp.subProjectUser.toString() === es.projectUserId.toString()
        );
        if (answer.length > 0) {
          totalAnswer++;
          if (updatedTemp[k].subdriver === "Overall Sentiment") {
            sentimentAnswer += answer[0].integerValue;
            sentimentAnswerCnt++;
          }
        }
      }

      return {
        ...es,
        survey_completion: (totalAnswer / totalQuestion).toFixed(2) * 100,
        survey_sentiment: (sentimentAnswer / sentimentAnswerCnt).toFixed(2)
      }
    })

    this.setState(state => {
      if (!state.categoryChanged) {
        return {
          aoSurveySubmitLoading: true,
          aoQuestionList: updatedTemp,
          esList: { ...this.state.esList, individuals: esListTemp },
          projectEsList: { ...this.state.projectEsList, individuals: projectEsListTemp },
        }
      } else {
        return {
          mapRefresh: true,
          aoSurveySubmitLoading: true,
          aoQuestionList: updatedTemp,
          esList: { ...this.state.esList, individuals: esListTemp },
          projectEsList: { ...this.state.projectEsList, individuals: projectEsListTemp },
        }
      }
    });

    this.props.submitAoQuestion(
      answerData,
      this.state.currentSurveyUser,
      this.props.surveyUserId,
      this.props.surveyId,
      this.callbackSubmitSurvey,
      isRefresh
    );
  };

  callbackSubmitSurvey = (isRefresh = true) => {
    // this.setState({
    //   screen: "list",
    //   currentSurveyUserId: 0,
    //   currentSurveyUser: {},
    // });

    if (isRefresh) {
      const { userId, surveyId, surveyUserId, projectId, history } = this.props;
      NotificationManager.success("Response saved successfully", "");
      if (this.state.categoryChanged) {
        Promise.all([
          this.props.getKMapData(surveyUserId, userId),
          this.props.getProjectMapData(surveyUserId, userId),
          this.props.getShCategoryList(surveyId, 0),
          this.props.getStakeholderList(surveyUserId, surveyId),
          this.props.getTeamList(projectId),
          this.props.getAoQuestionList(surveyUserId, surveyId),
          this.props.getDriverList(surveyId),
          this.props.getSkipQuestionList(),
        ]).then(setTimeout(() => {
          this.setState({
            mapRefresh: false,
            categoryChanged: false,
          })
        }, 1500))
      } else {
        this.handleSaveGraph(null, isRefresh);
      }
      // window.location.reload(false);
    }
    this.setState({
      aoSurveySubmitLoading: false
    });

    // window.location.reload(false);
  };

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

  handleSaveGraph = (e, isRefresh = true) => {
    const { userId, projectId, surveyUserId } = this.props;
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
      myProjectUser: surveyUserId,
      pu_category: mapProjectUserList,
      layout_json: {},
    };

    // console.log(newMapData); return;
    this.setState({ mapRefresh: true })
    if (mapStyle === "my-map") {
      this.props.saveKMapData(
        newMapData,
        surveyUserId,
        userId,
        isRefresh === true ? this.callbackSaveGraph : null
      );
    } else {
      this.props.saveProjectMapData(
        newMapData,
        surveyUserId,
        userId,
        isRefresh === true ? this.callbackSaveGraph : null
      );
    }
  };

  callbackSaveGraph = () => {
    // window.location.reload(false);
    const { userId, surveyId, surveyUserId, projectId } = this.props;

    Promise.all([
      this.props.getKMapData(surveyUserId, userId),
      this.props.getProjectMapData(surveyUserId, userId),
      this.props.getShCategoryList(surveyId, 0),
      this.props.getStakeholderList(surveyUserId, surveyId),
      this.props.getTeamList(projectId),
      this.props.getAoQuestionList(surveyUserId, surveyId),
      this.props.getDriverList(surveyId),
      this.props.getSkipQuestionList(),
    ]).then(setTimeout(() => {
      this.setState({
        categoryChanged: false,
        mapRefresh: false,
      })
    }, 1500))

    NotificationManager.success("Map has been saved successfully", "");
  }

  toggleGraph = (e) => {
    this.setState((state) => ({
      toggleGraph: !state.toggleGraph,
    }));
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

  handleCategoryChanged = () => {
    this.setState({
      categoryChanged: true,
    })
  }

  handleUpdateStakeholder = (pId, sId, stakeholder) => {
    this.setState({ mapRefresh: true })
    this.props.updateStakeholder(pId, sId, stakeholder, () => {
      const { userId, surveyId, surveyUserId, projectId } = this.props;
      Promise.all([
        this.props.getKMapData(surveyUserId, userId),
        this.props.getProjectMapData(surveyUserId, userId),
        this.props.getShCategoryList(surveyId, 0),
        this.props.getStakeholderList(surveyUserId, surveyId),
        this.props.getTeamList(projectId),
        this.props.getAoQuestionList(surveyUserId, surveyId),
        this.props.getDriverList(surveyId),
        this.props.getSkipQuestionList(),
      ]).then(setTimeout(() => {
        this.setState({
          mapRefresh: false,
          categoryChanged: false,
        })
      }, 1500))
    })
  }

  render() {
    const {
      projectTitle,
      optionList,
      driverList,
      skipQuestionList,
      history,
    } = this.props;

    const {
      aoQuestionList,
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
      myMapStakeholderList,
      projectMapStakeholderList,
      currentSurveyUserId,
      lastAddedShCategory,
      mapRefresh,
      expandedElements,
      toggledElements,
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
    // console.log(esList);
    return (
      <div>
        {(!searchFullHeight || toggleGraph) && (
          <div className={styles.topbar}>
            <TopNav history={history} menuTitle="My Map">
              {screen === "aosurvey" && (
                <div className={styles.section}>
                  {/* <div className={styles["graph-toggle"]}> */}
                    <h2 className={styles["project-name"]}>{projectTitle}</h2>
                  {/* </div> */}
                </div>
              )}
              {screen !== "aosurvey" && (
                <div className={styles.section}>
                  <h2 className={styles["project-name"]}>{projectTitle}</h2>
                  <div className={styles["graph-toggle"]}>
                    <Button onClick={(e) => this.toggleGraph(e)} style={{ width: 160 }}>
                      {!toggleGraph ? "Map View" : "List View"}
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
            {toggleGraph && (
              <ButtonGroup
                size="small"
                className={classnames(styles["map-selector"])}
                color="primary"
                aria-label="outlined primary button group"
              >
                <MButton
                  variant={mapStyle === "my-map" ? "contained" : "outlined"}
                  color="primary"
                  onClick={(e) => this.handleSelectMapStyle("my-map")}
                >
                  My Map
                </MButton>
                <MButton
                  variant={
                    mapStyle === "project-map" ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={(e) => this.handleSelectMapStyle("project-map")}
                >
                  Project Map
                </MButton>
              </ButtonGroup>
            )}
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
                  mapGetLoading === false &&
                  !mapRefresh && (
                    <KGraphContainer
                      setParentState={this.setState.bind(this)}
                      apList={apList}
                      esList={esList}
                      newStakeholder={newStakeholder}
                      onClickNode={(id) => this.handleStartOtherSurvey(id)}
                      layout={layout.toLowerCase()}
                      viewMode={viewMode}
                      expandedElements={expandedElements}
                      toggledElements={toggledElements}
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
                  mapGetLoading === false && !mapRefresh && (
                    <KGraphContainer
                      setParentState={this.setState.bind(this)}
                      apList={projectApList}
                      esList={projectEsList}
                      newStakeholder={newStakeholder}
                      onClickNode={(id) => this.handleStartOtherSurvey(id)}
                      layout={layout.toLowerCase()}
                      viewMode={viewMode}
                      layoutUpdated={layoutUpdated}
                      expandedElements={expandedElements}
                      toggledElements={toggledElements}
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
                <StakeholderManager
                  projectTitle={projectTitle}
                  searchKey={searchKey}
                  decisionMakers={decisionMakerList}
                  onClickDecisionMaker={(id) => this.handleStartOtherSurvey(id)}
                  allStakeholders={stakeholderList}
                  addNewStakeholder={(e) => this.handleShowAddPage(e)}
                  onSearchFocus={(e) => this.handleSearchFocus()}
                  onSearchBlur={(e) => this.handleSearchBlur()}
                  myMapStakeholderList={myMapStakeholderList}
                  projectMapStakeholderList={projectMapStakeholderList}
                  myMapES={esList}
                  projectMapES={projectEsList}
                  handleUpdateStakeholder={this.handleUpdateStakeholder}
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
                    submitLoading={this.state.aoSurveySubmitLoading}
                    questions={aoQuestionList}
                    options={optionList}
                    drivers={driverList}
                    user={currentSurveyUser}
                    myMapCategory={shCategoryList}
                    projectMapCategory={projectMapShCategoryList}
                    skipQuestionList={skipQuestionList}
                    currentSurveyUserId={currentSurveyUserId}
                    lastAddedShCategory={lastAddedShCategory}
                    allStakeholders={stakeholderList}
                    onSubmit={(e, answerData, isRefresh = true) =>
                      this.handleSubmitSurvey(e, answerData, isRefresh)
                    }
                    myMapES={esList}
                    projectMapES={projectEsList}
                    mapStyle={mapStyle}
                    onCancel={(e) => this.handleCancelSurvey()}
                    handleCategoryChanged={this.handleCategoryChanged}
                  />
                )}
            </div>
          </div>
        </div>
        <NotificationContainer />
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
  const {
    projectId,
    projectTitle,
    surveyId,
    surveyTitle,
    surveyUserId,
    user,
  } = authUser;
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
    surveyId,
    surveyTitle,
    surveyUserId,
    stakeholderList,
    teamList,
    shCategoryList,
    projectMapShCategoryList,
    userList,
    skipQuestionList,
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
  updateStakeholder,
})(MyMap);