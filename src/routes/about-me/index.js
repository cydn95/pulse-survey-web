import React from "react";

import { connect } from "react-redux";

import DriverPanel from "Components/driver";
import Loading from "Components/Loading";

import TopNav from "Containers/TopNav";

import {
  pageList,
  skipQuestionList,
  selectPage,
  continueSurvey,
  submitSurvey,
} from "Redux/actions";

import {
  SURVEY_NOT_STARTED,
  SURVEY_IN_PROGRESS,
  SURVEY_COMPLETED,
  controlType,
} from "Constants/defaultValues";

import {
  MultipleOptions,
  MultiTopics,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
  Continue,
} from "Components/Survey";

import styles from "./styles.scss";

class AboutMeSurvey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.pageIndex,
      driverList: [],
    };

    this.scrollTop = false;
  }

  componentWillMount() {
    const {
      surveyId,
      surveyUserId,
      getPageList,
      getSkipQuestionList,
      history,
    } = this.props;
    if (
      surveyUserId == undefined ||
      surveyUserId == null ||
      surveyUserId <= 0
    ) {
      history.push("/app/project-not-found");
      return;
    }

    getPageList(surveyId, surveyUserId);
    getSkipQuestionList();
  }

  componentWillReceiveProps(props) {
    const { pageIndex, surveyList } = props;

    if (surveyList.length > 0) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      const driverList = [];

      for (let i = 0; i < surveyList.length; i++) {
        let answeredCount = 0;
        let driverProgress = SURVEY_NOT_STARTED;

        for (let j = 0; j < surveyList[i].amquestion.length; j++) {
          if (surveyList[i].amquestion[j].responsestatus === true) {
            answeredCount++;
          }
        }

        if (answeredCount === 0) {
          driverProgress = SURVEY_NOT_STARTED;
        } else if (answeredCount < surveyList[i].amquestion.length) {
          driverProgress = SURVEY_IN_PROGRESS;
        } else {
          driverProgress = SURVEY_COMPLETED;
        }

        const driver = {
          driverId: surveyList[i].id,
          driverName: surveyList[i].driverName,
          icon: surveyList[i].iconPath,
          percentage: 0,
          progress: driverProgress,
          amquestion: [...surveyList[i].amquestion],
        };

        driverList.push(driver);
      }

      this.setState({
        driverList,
      });
    }

    this.setState({
      pageIndex,
    });
  }

  handleClickDriver = (driverId) => {
    const { setSurveyPage } = this.props;
    const { driverList } = this.state;
    var pageIndex = driverList.findIndex((element) => {
      return element.driverId === driverId;
    });
    setSurveyPage(pageIndex);
  };

  handleAnswer = (answer) => {
    const { pageIndex } = this.state;
    const answerData = { ...answer };
    this.setState((state) => {
      const questionIndex = state.driverList[pageIndex].amquestion.findIndex(
        (element) => {
          return element.answer.questionIndex === answerData.questionIndex;
        }
      );
      state.driverList[pageIndex].amquestion[questionIndex].answer = answerData;
      state.driverList[pageIndex].amquestion[
        questionIndex
      ].responsestatus = true;

      let answeredCount = 0;
      for (let i = 0; i < state.driverList[pageIndex].amquestion.length; i++) {
        if (state.driverList[pageIndex].amquestion[i].responsestatus === true) {
          answeredCount++;
        }
      }

      if (answeredCount === state.driverList[pageIndex].amquestion.length) {
        state.driverList[pageIndex].progress = SURVEY_COMPLETED;
      } else {
        state.driverList[pageIndex].progress = SURVEY_IN_PROGRESS;
      }
      return state;
    });
  };

  handleContinue = (e) => {
    e.preventDefault();

    const { driverList, pageIndex } = this.state;
    const {
      projectId,
      surveyUserId,
      aboutMe,
      history,
      continueSurvey,
      submitSurvey,
    } = this.props;

    if (pageIndex === driverList.length - 1) {
      submitSurvey(driverList, aboutMe, projectId, surveyUserId, history);
    }

    if (pageIndex < driverList.length - 1) {
      continueSurvey(pageIndex + 1, 0);
    } else {
      continueSurvey(pageIndex, 0);
    }
  };

  render() {
    const { optionList, projectTitle, skipQuestionList, history } = this.props;

    const { driverList, pageIndex } = this.state;

    const defaultDrvierId = driverList.length
      ? driverList[pageIndex].driverId
      : 0;

    const driver = driverList.filter((d) => d.driverId === defaultDrvierId)[0];

    const user = {
      fullName: "Mike Smith",
      team: "Pulse",
    };

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle="About Me">
            <div className={styles.section}>
              <h2 className={styles["project-name"]}>{projectTitle}</h2>
            </div>
          </TopNav>
        </div>
        <div className={styles["main-content"]}>
          <div className={styles["driver-scroll"]}>
            <div className={styles["driver-section"]}>
              <DriverPanel
                defaultDriverId={defaultDrvierId}
                data={driverList}
                color="green"
                onClick={(e, driverId) => this.handleClickDriver(driverId)}
              />
            </div>
            <div className={styles["survey-container"]}>
              {driverList.length > 0 && skipQuestionList.length > 0 && (
                <div className={styles["survey-driver-container"]}>
                  <div className={styles["question-driver-container"]}>
                    {driver.amquestion.map((question) => {
                      switch (question.controlType) {
                        case controlType.TEXT:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <FreeText
                                user={user}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );
                        case controlType.SLIDER:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <RangeSlider
                                user={user}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );

                        case controlType.TWO_OPTIONS:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <TwoOptions
                                user={user}
                                options={optionList}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );

                        case controlType.MULTI_OPTIONS:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <MultipleOptions
                                type="am"
                                user={user}
                                options={optionList}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );

                        case controlType.MULTI_TOPICS:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <MultiTopics
                                type="am"
                                user={user}
                                options={optionList}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );

                        case controlType.SMART_TEXT:
                          return (
                            <div
                              key={`question-page-${question.id}`}
                              className={styles["control-container"]}
                            >
                              <SmartText
                                user={user}
                                question={question}
                                onAnswer={(answer) => this.handleAnswer(answer)}
                                skipQuestionList={skipQuestionList}
                                projectTitle={projectTitle}
                              />
                            </div>
                          );

                        default:
                          return (
                            <div key={`question-page-${question.id}`}></div>
                          );
                      }
                    })}
                  </div>
                  <Continue
                    onContinue={(e) => this.handleContinue(e)}
                    history={this.props.history}
                    title={
                      pageIndex === driverList.length - 1
                        ? "Submit"
                        : "Continue"
                    }
                  />
                </div>
              )}
              {driverList.length === 0 && <Loading description="" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, common, authUser }) => {
  const { pageList, pageIndex, optionList, aboutMe } = survey;
  const { skipQuestionList } = common;
  const { projectId, surveyTitle, surveyUserId, surveyId } = authUser;

  return {
    optionList,
    aboutMe,
    surveyList: pageList,
    pageIndex,
    skipQuestionList,
    projectId,
    surveyTitle,
    surveyUserId,
    surveyId,
  };
};

export default connect(mapStateToProps, {
  getPageList: pageList,
  getSkipQuestionList: skipQuestionList,
  setSurveyPage: selectPage,
  continueSurvey,
  submitSurvey,
})(AboutMeSurvey);
