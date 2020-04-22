import React, { Component } from "react";
import { connect } from "react-redux";

import { controlType } from "Constants/defaultValues";

import {
  MultipleOptions,
  MultiTopics,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
  Continue,
} from "Components/Survey";

import { inputAnswer } from "Redux/actions";

import styles from "./styles.scss";

class Question extends Component {
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();

    this.state = {
      surveyList: this.props.surveyList
    }
  }

  handleAnswer = (answer) => {
    this.props.inputAnswer(answer);
  };

  componentWillReceiveProps(props) {
    const { surveyList } = props;
    this.setState({
      surveyList
    });
  }

  render() {
    const { surveyList } = this.state;
    const { optionList, pageIndex, skipQuestionList } = this.props;
    const questionList = surveyList[pageIndex];

    let continueText = "Continue";

    let user = {
      fullName: "Mike Smith",
      team: "Pulse",
    };

    let questionControl = questionList.amquestion.map((control, index) => {
      switch (control.controlType) {
        case controlType.TEXT:
          return (
            <div key={index} className={styles["question-container"]}>
              <FreeText
                user={user}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );
        case controlType.SLIDER:
          return (
            <div key={index} className={styles["question-container"]}>
              <RangeSlider
                user={user}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );

        case controlType.TWO_OPTIONS:
          return (
            <div key={index} className={styles["question-container"]}>
              <TwoOptions
                user={user}
                options={optionList}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );

        case controlType.MULTI_OPTIONS:
          return (
            <div key={index} className={styles["question-container"]}>
              <MultipleOptions
                type="am"
                user={user}
                options={optionList}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );

        case controlType.MULTI_TOPICS:
          return (
            <div key={index} className={styles["question-container"]}>
              <MultiTopics
                type="am"
                user={user}
                options={optionList}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );

        case controlType.SMART_TEXT:
          return (
            <div key={index} className={styles["question-container"]}>
              <SmartText
                user={user}
                question={control}
                onAnswer={(answer) => this.handleAnswer(answer)}
                skipQuestionList={skipQuestionList}
              />
            </div>
          );

        default:
          return <div key={index}></div>;
      }
    });

    if (pageIndex === surveyList.length - 1) {
      continueText = "Submit";
    }

    return (
      <div className={styles.root} ref={this.scrollRef}>
        {questionControl}
        <Continue history={this.props.history} title={continueText} />
      </div>
    );
  }
}

const mapStateToProps = ({ survey }) => {
  const { pageList, optionList, pageIndex } = survey;

  return {
    surveyList: pageList,
    optionList,
    pageIndex,
  };
};

export default connect(mapStateToProps, { inputAnswer })(Question);
