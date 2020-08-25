import React, { Fragment } from "react";
import { connect } from "react-redux";

import { controlType } from "Constants/defaultValues";
import Button from "@material-ui/core/Button";

import AvatarComponent from "Components/avatar/Component";

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
} from "Components/Survey";

import DriverPanel from "Components/driver";

import {
  SURVEY_NOT_STARTED,
  SURVEY_IN_PROGRESS,
  SURVEY_COMPLETED,
  controlTypeText,
} from "Constants/defaultValues";

import styles from "./styles.scss";

import { selectPage, stakeholderAnswer } from "Redux/actions";

class AoSurvey extends React.Component {
  constructor(props) {
    super(props);

    const {
      questions,
      options,
      drivers,
      pageIndex,
      user,
      currentSurveyUserId,
    } = this.props;

    let totalQuestions = 0;
    let totalAnswers = 0;

    for (let i = 0; i < drivers.length; i++) {
      drivers[i] = {
        ...drivers[i],
        questions: [],
      };
    }

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < drivers.length; j++) {
        if (questions[i].driver.id === drivers[j].driverId) {
          drivers[j].questions.push(questions[i]);
          break;
        }
      }
    }

    const orderedDrivers = drivers.filter((item) => {
      return item.questions.length > 0 ? true : false;
    });

    const shCategoryId = currentSurveyUserId.split("_SHC_")[1];

    const answers = [];
    for (let i = 0; i < orderedDrivers.length; i++) {
      for (let j = 0; j < orderedDrivers[i].questions.length; j++) {
        totalQuestions++;

        const temp = orderedDrivers[i].questions[j].response.filter(
          (resp) =>
            resp.shCategory == shCategoryId &&
            resp.subProjectUser == user.projectUserId
        );

        totalAnswers += temp.length;

        if (temp.length === 0) {
          answers.push({
            pageIndex: i,
            questionIndex: j,
            integerValue: 0,
            topicValue: "",
            commentValue: "",
            skipValue: "",
            topicTags: "",
            commentTags: "",
            user: 0,
            subjectUser: 0,
            survey: orderedDrivers[i].questions[j].survey,
            amQuestion: orderedDrivers[i].questions[j].id,
            type: "other",
            controlType: controlTypeText(
              orderedDrivers[i].questions[j].controlType
            ),
            shCategory: shCategoryId
          });
        } else {
          answers.push({
            amQuestion: orderedDrivers[i].questions[j].id,
            pageIndex: i,
            questionIndex: j,
            integerValue: temp[0].integerValue,
            topicValue: temp[0].topicValue,
            commentValue: temp[0].commentValue,
            skipValue: temp[0].skipValue,
            topicTags: temp[0].topicValue,
            commentTags: temp[0].commentTags,
            user: temp[0].projectUser,
            subjectUser: temp[0].subProjectUser,
            survey: orderedDrivers[i].questions[j].survey,
            type: "other",
            controlType: controlTypeText(
              orderedDrivers[i].questions[j].controlType
            ),
            shCategory: shCategoryId,
          });
        }
      }
    }

    this.state = {
      questions,
      options,
      drivers: orderedDrivers,
      pageIndex,
      currentUser: user,
      answers,
      totalAnswers,
      totalQuestions,
    };
  }

  componentWillReceiveProps(props) {
    const { pageIndex, currentSurveyUserId, user } = props;

    if (currentSurveyUserId != this.props.currentSurveyUserId) {
      const { drivers } = this.state;

      const shCategoryId = currentSurveyUserId.split("_SHC_")[1];

      let totalQuestions = 0;
      let totalAnswers = 0;

      const answers = [];
      for (let i = 0; i < drivers.length; i++) {
        for (let j = 0; j < drivers[i].questions.length; j++) {
          totalQuestions++;

          const temp = drivers[i].questions[j].response.filter(
            (resp) =>
              resp.shCategory == shCategoryId &&
              resp.subProjectUser == user.projectUserId
          );

          totalAnswers += temp.length;

          if (temp.length === 0) {
            answers.push({
              pageIndex: i,
              questionIndex: j,
              integerValue: 0,
              topicValue: "",
              commentValue: "",
              skipValue: "",
              topicTags: "",
              commentTags: "",
              user: 0,
              subjectUser: 0,
              survey: drivers[i].questions[j].survey,
              amQuestion: drivers[i].questions[j].id,
              type: "other",
              controlType: controlTypeText(drivers[i].questions[j].controlType),
              shCategory: shCategoryId,
            });
          } else {
            answers.push({
              amQuestion: drivers[i].questions[j].id,
              pageIndex: i,
              questionIndex: j,
              integerValue: temp[0].integerValue,
              topicValue: temp[0].topicValue,
              commentValue: temp[0].commentValue,
              skipValue: temp[0].skipValue,
              topicTags: temp[0].topicValue,
              commentTags: temp[0].commentTags,
              user: temp[0].projectUser,
              subjectUser: temp[0].subProjectUser,
              survey: drivers[i].questions[j].survey,
              type: "other",
              controlType: controlTypeText(drivers[i].questions[j].controlType),
              shCategory: shCategoryId,
            });
          }
        }
      }

      this.setState({
        pageIndex,
        answers,
        totalAnswers,
        totalQuestions,
      });
    } else {
      this.setState({
        pageIndex,
      });
    }
    
  }

  handleAnswer = async (answer) => {
    const indexOf = this.state.answers.findIndex(
      (a) =>
        a.pageIndex == answer.pageIndex &&
        a.questionIndex == answer.questionIndex
    );

    await this.setState((state) => {
      state.answers[indexOf] = {
        ...answer,
      };
      return state;
    });

    const totalAnswers = this.state.answers.filter(
      (answer) =>
        answer.integerValue != 0 ||
        answer.topicValue != "" ||
        answer.commentValue != "" ||
        answer.skipValue != ""
    ).length;

    this.setState({
      totalAnswers
    });
  };

  handleCancel = (e) => {
    this.props.onCancel(e);
  };

  handleSubmit = (e) => {
    this.props.onSubmit(e, this.state.answers);
  };

  handleClickDriver = (driverId) => {
    const { setSurveyPage } = this.props;
    const { drivers } = this.state;
    var pageIndex = drivers.findIndex((element) => {
      return element.driverId == driverId;
    });
    setSurveyPage(pageIndex);
  };

  render() {
    const {
      options,
      answers,
      pageIndex,
      totalAnswers,
      totalQuestions,
    } = this.state;
    const { skipQuestionList, user, projectTitle } = this.props;

    const drivers = [...this.state.drivers];

    const defaultDrvierId = drivers.length ? drivers[pageIndex].driverId : 0;
    const driver = drivers.filter((d) => d.driverId === defaultDrvierId)[0];

    for (let i = 0; i < drivers.length; i++) {
      const answeredCount = answers.filter(
        (answer) =>
          answer.pageIndex == i &&
          (answer.integerValue != 0 ||
            answer.topicValue != "" ||
            answer.commentValue != "" ||
            answer.skipValue != "")
      ).length;

      if (answeredCount === 0) {
        drivers[i].progress = SURVEY_NOT_STARTED;
      } else if (answeredCount < drivers[i].questions.length) {
        drivers[i].progress = SURVEY_IN_PROGRESS;
      } else {
        drivers[i].progress = SURVEY_COMPLETED;
      }
    }

    // console.log(driver);
    // console.log(answers);

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <div className={styles.title}>About Others:</div>
          <AvatarComponent
            className={styles["avatar-comp"]}
            userId={user.id}
            username={user.fullName}
            description={user.organisation + " / " + user.team}
            profilePicUrl={user.userAvatar}
            userProgress={((totalAnswers / totalQuestions) * 100).toFixed(2)}
            donut={true}
          />
        </div>

        <div className={styles["driver-section"]}>
          <hr />
          <DriverPanel
            defaultDriverId={defaultDrvierId}
            data={drivers}
            color="black"
            onClick={(e, driverId) => this.handleClickDriver(driverId)}
          />
          <hr />
        </div>
        <div className={styles.questions}>
          {driver.questions.map((control, index) => {
            const answer = answers.filter(
              (answer) =>
                answer.pageIndex == pageIndex && answer.questionIndex == index
            )[0];

            switch (control.controlType) {
              case controlType.SLIDER:
                return (
                  <RangeSlider
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.MULTI_OPTIONS:
                return (
                  <MultipleOptions
                    user={user}
                    type="ao"
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    options={options}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.TWO_OPTIONS:
                return (
                  <TwoOptions
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    options={options}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.TEXT:
                return (
                  <FreeText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );
              case controlType.SMART_TEXT:
                return (
                  <SmartText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    answer={answer}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                    surveyType="other"
                  />
                );

              default:
                return <div key={`${index}`}></div>;
            }
          })}
        </div>
        <div className={styles.footer}>
          <Button
            variant="contained"
            color="default"
            onClick={(e) => this.handleCancel(e)}
          >
            Cancel
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={styles.green}
            onClick={(e) => this.handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, common, authUser }) => {
  const { pageList, pageIndex } = survey;
  const { skipQuestionList } = common;
  const { projectTitle, projectUserId } = authUser;
  return {
    surveyList: pageList,
    pageIndex,
    skipQuestionList,
    projectUserId,
    projectTitle,
  };
};

export default connect(mapStateToProps, {
  setSurveyPage: selectPage,
  stakeholderAnswer,
})(AoSurvey);
