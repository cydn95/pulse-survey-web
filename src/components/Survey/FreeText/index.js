import React, { Component } from "react";
import { DebounceInput } from 'react-debounce-input';

import TextField from "@material-ui/core/TextField";
import SkipQuestion from "../SkipQuestion";
import { replaceQuestionTextKeyWord } from "Constants/defaultValues";

import styles from "./styles.scss";

class FreeText extends Component {
  constructor(props) {
    super(props);

    const { surveyType } = props;
    const answer = surveyType === "me" ? props.question.answer : props.answer;

    this.state = {
      answer: {
        ...answer,
      },
    };
  }

  componentWillReceiveProps(props) {
    const { surveyType } = props;
    const answer = surveyType === "me" ? props.question.answer : props.answer;

    this.setState({
      answer: {
        ...answer,
        controlType: "TEXT",
      },
    });
  }

  onInputAnswer = (e) => {
    const topicValue = e.target.value;

    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          topicValue: topicValue,
          skipValue: "",
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  handleSkip = (skipAnswer) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          skipValue: skipAnswer,
          topicValue: "",
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  handleComment = (commentAnswer) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          commentValue: commentAnswer,
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  render() {
    const { question, skipQuestionList, user, projectTitle } = this.props;

    return (
      <div className={styles.root}>
        <h2 className={styles["question-text"]}>
          {replaceQuestionTextKeyWord(
            question.questionText,
            user,
            projectTitle
          )}
        </h2>
        <div className={styles["answer-section"]}>
          <DebounceInput
            element={TextField}
            multiline
            className={styles["answer-field"]}
            value={this.state.answer.topicValue}
            debounceTimeout={500}
            onChange={(e) => this.onInputAnswer(e)}
            placeholder={question.topicPrompt}
          />
        </div>
        <SkipQuestion
          answer={this.state.answer.topicValue}
          comment={this.state.answer.commentValue}
          commentPrompt={question.commentPrompt}
          skipValue={this.state.answer.skipValue}
          skipQuestionList={skipQuestionList}
          skipOption={question.skipOption}
          onSkip={(skipAnswer) => this.handleSkip(skipAnswer)}
          onComment={(commentAnswer) => this.handleComment(commentAnswer)}
        />
      </div>
    );
  }
}

export default FreeText;
