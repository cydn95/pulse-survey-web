import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class TwoOptions extends Component {

  constructor(props) {
    super(props);

    const { question, options } = this.props
    
    let optionList = [];

    for (let i = 0 ; i < question.option.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (question.option[i] === options[j].id) {
          optionList.push(options[i]);
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
        controlType: 'TWO_OPTIONS'
      }
    })
  }
  
  onSelectAnswer = (e, answerIndex, answerText) => {

    e.preventDefault();

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
      <Row>
        <Colxx xs="12">
          <h2 className="mt-s">{question.questionText}</h2>
          <div className="anwser-select-n mt-3">
              
              </div>
          <div className="mt-xs input-field anwser-select2">
            {
              optionList.map((item, index) => {
                let active = item.id === this.state.answer.integerValue ? 'active' : '';
                return (
                  <a key={index}  className={"waves-effect waves-light btn select2-btn " + active}
                    onClick={e => this.onSelectAnswer(e, item.id, item.optionName)}>
                    {item.optionName}
                  </a>
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
            onComment={commentAnswer => this.handleComment(commentAnswer)}/>
        </Colxx>
      </Row>
    );
  }
}

export default TwoOptions
