import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

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
        ...question.answer
      }
    })
  }
  
  onSelectAnswer = (e, answerIndex) => {

    e.preventDefault();

    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'integerValue': answerIndex,
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
          <h1 className="mt-s">{question.questionText}</h1>
          <div className="anwser-select-n mt-3">
              
              </div>
          <div className="mt-xs input-field anwser-select-n">
            {
              optionList.map((item, index) => {
                let active = item.id === this.state.answer.integerValue ? 'active' : '';
                return (
                  <a key={index}  className={"waves-effect waves-light btn select2-btn " + active}
                    onClick={e => this.onSelectAnswer(e, item.id)}>
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

export default MultipleOptions
