import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { DebounceInput } from 'react-debounce-input';

import SkipQuestion from "../SkipQuestion";
import Slider from "Components/Slider";
import styles from "./styles.scss";

import { replaceQuestionTextKeyWord } from "Constants/defaultValues";

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    const { surveyType } = props;

    const answer = surveyType === "me" ? props.question.answer : props.answer;
    this.state = {
      answer: {
        ...answer,
      },
      deValue: 0
    };
  }

  componentWillReceiveProps(props) {
    const { surveyType } = props;

    const answer = surveyType === "me" ? props.question.answer : props.answer;

    this.setState({
      answer: {
        ...answer,
        controlType: "SLIDER",
      },
    });
  }

  onChangeSlide = (value) => {
    const percent = value;
    const { question } = this.props;

    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          integerValue: percent,
          skipValue: "",
        },
        deValue: percent
      }),
      () => {
        const deValueInput = document.getElementById(`deValue_${question.id}`);
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(deValueInput, this.state.deValue);
        var ev2 = new Event('input', { bubbles: true });
        deValueInput.dispatchEvent(ev2);
      }
    );
  };

  handleSkip = (skipAnswer) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          skipValue: skipAnswer,
          integerValue: 0,
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

  handleDeValue = (e) => {
    this.props.onAnswer(this.state.answer);
  }

  render() {
    const { question, skipQuestionList, user, projectTitle } = this.props;

    return (
      <div className={styles.main}>
        <h2 className={styles["question-text"]}>
          {replaceQuestionTextKeyWord(
            question.questionText,
            user,
            projectTitle
          )}
        </h2>
        <div className={styles["slider-section"]}>
          <Slider
            className={styles.slider}
            percent={this.state.answer.integerValue}
            onChange={this.onChangeSlide}
          />
          <DebounceInput
            id={`deValue_${question.id}`}
            element={TextField}
            style={{ width: 0, height: 0, display: 'none' }}
            value={this.state.deValue}
            debounceTimeout={500}
            onChange={(e) => this.handleDeValue(e)}
          />
        </div>
        <div className={styles["slider-text-section"]}>
          <div className={styles["slider-text-left"]}>
            {question.sliderTextLeft}
          </div>
          <div className={styles["slider-text-right"]}>
            {question.sliderTextRight}
          </div>
        </div>
        <div className={styles["skip-section"]}>
          <SkipQuestion
            answer={this.state.answer.integerValue}
            comment={this.state.answer.commentValue}
            commentPrompt={question.commentPrompt}
            skipValue={this.state.answer.skipValue}
            onSkip={(skipAnswer) => this.handleSkip(skipAnswer)}
            skipOption={question.skipOption}
            skipQuestionList={skipQuestionList}
            onComment={(commentAnswer) => this.handleComment(commentAnswer)}
          />
        </div>
      </div>
    );
  }
}

export default RangeSlider;
