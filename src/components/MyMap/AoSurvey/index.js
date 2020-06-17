import React from "react";
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
} from "Constants/defaultValues";

import styles from "./styles.scss";

import { selectPage, stakeholderAnswer } from "Redux/actions";

class AoSurvey extends React.Component {
  constructor(props) {
    super(props);

    const { questions, options, drivers, pageIndex, user } = this.props;

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

    this.state = {
      questions,
      options,
      drivers: orderedDrivers,
      pageIndex,
      currentUser: user,
    };
  }

  componentWillReceiveProps(props) {
    const { pageIndex } = props;

    this.setState({
      pageIndex,
    });
  }

  handleAnswer = (answer) => {
    this.setState((state) => {
      state.questions[answer.questionIndex].answer = {
        ...answer,
      };
      return state;
    });
    this.props.stakeholderAnswer(
      this.state.currentUser.projectUserId,
      answer.amQuestion
    );
  };

  handleCancel = (e) => {
    this.props.onCancel(e);
  };

  handleSubmit = (e) => {
    this.props.onSubmit(e, this.state.questions);
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
    const { options, currentUser } = this.state;
    const { skipQuestionList, user, projectTitle } = this.props;

    const drivers = [...this.state.drivers];

    const defaultDrvierId = drivers.length
      ? drivers[this.state.pageIndex].driverId
      : 0;
    const driver = drivers.filter((d) => d.driverId === defaultDrvierId)[0];
    for (let i = 0; i < drivers.length; i++) {
      let answeredCount = 0;
      for (let j = 0; j < drivers[i].questions.length; j++) {
        if (currentUser.aoResponse instanceof Array) {
          if (currentUser.aoResponse.indexOf(drivers[i].questions[j].id) >= 0) {
            answeredCount++;
          }
        }
      }
      if (answeredCount === 0) {
        drivers[i].progress = SURVEY_NOT_STARTED;
      } else if (answeredCount < drivers[i].questions.length) {
        drivers[i].progress = SURVEY_IN_PROGRESS;
      } else {
        drivers[i].progress = SURVEY_COMPLETED;
      }
    }
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
            userProgress={(user.aoAnswered / user.aoTotal) * 100}
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
            switch (control.controlType) {
              case controlType.TEXT:
                return (
                  <FreeText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                  />
                );
              case controlType.SLIDER:
                return (
                  <RangeSlider
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
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
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
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
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
                  />
                );

              case controlType.SMART_TEXT:
                return (
                  <SmartText
                    user={user}
                    skipQuestionList={skipQuestionList}
                    key={`${index}`}
                    question={control}
                    onAnswer={(answer) => this.handleAnswer(answer)}
                    projectTitle={projectTitle}
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
