import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";
import Radio from "Components/Radio";

import styles from "./styles.scss";

class MultipleOptions extends Component {

  constructor(props) {
    super(props);

    const { question, options } = props

    let optionList = [];
    
    for (let i = 0 ; i < question.option.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (question.option[i] === options[j].id) {
          optionList.push(options[j]);
          break;
        }
      }
    }

    this.state = {
      answer: {
        ...question.answer,
      },
      optionList
    };

  }

  componentWillReceiveProps(props) {
    const { question } = props;
    
    this.setState({
      answer: {
        ...question.answer,
        controlType: 'MULTI_OPTIONS'
      }
    })
  }
  
  onSelectAnswer = (answerIndex, answerText) => {

    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'integerValue': answerIndex,
        'topicValue': answerText,
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

    const { question, skipQuestionList } = this.props;
    const { optionList } = this.state
    
    return (
      <div className={styles.main}>
        <div>
          <h1 className={styles["question-text"]}>{question.questionText}</h1>
        </div>
        <div className="anwser-select-n mt-3">

        </div>
        <div>
        {
          optionList.map((item, index) => {
            const active = item.id === this.state.answer.integerValue;
            return (
              <Radio key={item.id} checked={active}
              onChange={() => this.onSelectAnswer(item.id, item.optionName)}>
              {item.optionName}
              </Radio>
            )
          })
        }
        </div>
        <SkipQuestion
          answer={this.state.answer.integerValue}
          comment={this.state.answer.commentValue}
          skipValue={this.state.answer.skipValue}
          onSkip={skipAnswer => this.handleSkip(skipAnswer)} 
          skipOption={question.skipOption}
          skipQuestionList={skipQuestionList}
          onComment={commentAnswer => this.handleComment(commentAnswer)}
        />
      </div>
    );
  }
}

export default MultipleOptions
