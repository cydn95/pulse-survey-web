import React, { Component } from "react";
import SkipQuestion from "../SkipQuestion";
import Slider from 'Components/Slider';
import styles from "./styles.scss";

import {replaceQuestionTextKeyWord} from 'Constants/defaultValues';

class RangeSlider extends Component {

  constructor(props) {
    super(props);

    const { question } = this.props
    this.state = {
      answer: {
        ...question.answer
      }
    };
  }

  componentWillReceiveProps(props) {
    const { question } = props;
    this.setState({
      answer: {
        ...question.answer,
        controlType: 'SLIDER'
      }
    })
  }

  onChangeSlide = value => {
    const percent = value;

    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'integerValue': percent,
        'skipValue': ''
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleSkip = skipAnswer => {
    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'skipValue': skipAnswer,
        'integerValue': 0
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleComment = commentAnswer => {
    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'commentValue': commentAnswer
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
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

export default RangeSlider
