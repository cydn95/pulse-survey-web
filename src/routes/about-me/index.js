import React, { Fragment, useState, useEffect, useRef } from "react";
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

const AboutMeSurvey = ({
  optionList,
  aboutMe,
  surveyList,
  pageIndex,
  skipQuestionList,
  projectId,
  projectTitle,
  surveyTitle,
  surveyUserId,
  surveyId,
  history,

  getPageList,
  getSkipQuestionList,
  setSurveyPage,
  continueSurvey,
  submitSurvey,
}) => {
  // const [pageIndex , setPageIndex] = useState(pageIndex);
  const [driverList, setDriverList] = useState([]);

  const moveScrollToTop = () => {
    const divRef = document.querySelector("#back-to-top-anchor");

    if (divRef) {
      divRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
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
  }, [surveyId, surveyUserId]);

  useEffect(() => {
    if (surveyList.length > 0) {
      setTimeout(() => {
        moveScrollToTop();
      }, 100);

      const driverListTemp = [];

      for (let i = 0; i < surveyList.length; i++) {
        let answeredCount = 0;
        let driverProgress = SURVEY_NOT_STARTED;

        for (let j = 0; j < surveyList[i].amquestion.length; j++) {
          if (
            surveyList[i].amquestion[j].responsestatus === true ||
            (surveyList[i].amquestion[j].controlType ===
              controlType.MULTI_TOPICS &&
              surveyList[i].amquestion[j].topic &&
              surveyList[i].amquestion[j].topic.length > 0)
          ) {
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

        if (surveyList[i].amquestion.length > 0) {
          const driver = {
            driverId: surveyList[i].id,
            driverName: surveyList[i].driverName,
            icon: surveyList[i].iconPath,
            percentage: 0,
            progress: driverProgress,
            amquestion: [...surveyList[i].amquestion],
          };
          driverListTemp.push(driver);
        }
      }

      setDriverList([...driverListTemp]);
    }
  }, [pageIndex, surveyList]);

  const handleClickDriver = (driverId) => {
    var pageIndex = driverList.findIndex((element) => {
      return element.driverId === driverId;
    });

    setSurveyPage(pageIndex);
  };

  const handleAnswer = (answer) => {
    const answerData = { ...answer };

    const oldDriverList = [...driverList];

    const questionIndex = oldDriverList[pageIndex].amquestion.findIndex(
      (element) => {
        return element.answer.amQuestion === answerData.amQuestion;
      }
    );

    oldDriverList[pageIndex].amquestion[questionIndex].answer = answerData;

    // For <FreeText> component, set response_status to false if no answers
    let responsestatus = true;
    if (
      oldDriverList[pageIndex].amquestion[questionIndex].controlType ===
      controlType.TEXT
    ) {
      if (
        answerData.topicValue === "" &&
        answerData.commentValue === "" &&
        answerData.skipValue === ""
      ) {
        responsestatus = false;
      }
    }

    oldDriverList[pageIndex].amquestion[
      questionIndex
    ].responsestatus = responsestatus;

    let answeredCount = 0;
    for (let i = 0; i < oldDriverList[pageIndex].amquestion.length; i++) {
      if (oldDriverList[pageIndex].amquestion[i].responsestatus === true) {
        answeredCount++;
      }
    }

    if (answeredCount === oldDriverList[pageIndex].amquestion.length) {
      oldDriverList[pageIndex].progress = SURVEY_COMPLETED;
    } else {
      oldDriverList[pageIndex].progress = SURVEY_IN_PROGRESS;
    }

    setDriverList([...oldDriverList]);

    // Update Survey
    submitSurvey(
      oldDriverList,
      aboutMe,
      projectId,
      surveyUserId,
      surveyId,
      history,
      false
    );
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (pageIndex === driverList.length - 1) {
      submitSurvey(
        driverList,
        aboutMe,
        projectId,
        surveyUserId,
        surveyId,
        history,
        true
      );
    }

    if (pageIndex < driverList.length - 1) {
      continueSurvey(pageIndex + 1, 0);
    } else {
      continueSurvey(pageIndex, 0);
    }
  };

  const defaultDrvierId = driverList.length
    ? driverList[pageIndex].driverId
    : 0;
  const driver = driverList.filter((d) => d.driverId === defaultDrvierId)[0];
  const user = { fullName: "Mike Smith", team: "Pulse" };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="About Me">
          <div className={styles.section}>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      {surveyList.length > 0 && (
        <div className={styles["main-content"]}>
          {driverList.length > 0 && skipQuestionList.length > 0 && (
            <Fragment>
              <div className={styles["driver-scroll"]}>
                <div className={styles["driver-section"]}>
                  <DriverPanel
                    defaultDriverId={defaultDrvierId}
                    data={driverList}
                    color="green"
                    onClick={(e, driverId) => handleClickDriver(driverId)}
                  />
                </div>
                <div className={styles["survey-container"]}>
                  <div className={styles["survey-driver-container"]}>
                    <div className={styles["question-driver-container"]}>
                      <div id="back-to-top-anchor"></div>
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                                  onAnswer={(answer) => handleAnswer(answer)}
                                  skipQuestionList={skipQuestionList}
                                  projectTitle={projectTitle}
                                  surveyType="me"
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
                      onContinue={(e) => handleContinue(e)}
                      history={history}
                      title={
                        pageIndex === driverList.length - 1
                          ? "Submit"
                          : "Continue"
                      }
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {driverList.length === 0 && (
            <h2 className={styles["no-questions"]}>No Questions</h2>
          )}
        </div>
      )}
      {surveyList.length === 0 && <Loading description="" />}
    </div>
  );
};

const mapStateToProps = ({ survey, common, authUser }) => {
  const { pageList, pageIndex, optionList, aboutMe } = survey;
  const { skipQuestionList } = common;
  const {
    projectId,
    projectTitle,
    surveyTitle,
    surveyUserId,
    surveyId,
  } = authUser;

  return {
    optionList,
    aboutMe,
    surveyList: pageList,
    pageIndex,
    skipQuestionList,
    projectId,
    projectTitle,
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
