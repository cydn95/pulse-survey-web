import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

const optionChoices = [
  "Option 1",
  "Option 2"
];

class TwoOptions extends Component {

  constructor(props) {
    super(props);

    const { question } = this.props
    
    this.state = {
      answer: {
        ...question.answer
      }
    };

  }

  onSelectAnswer = (e, answerIndex) => {

    e.preventDefault();

    const topicValue = e.target.value;

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

    const { question } = this.props;
    
    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <div className="anwser-select-n mt-3">
              
              </div>
          <div className="mt-xs input-field anwser-select2">
            {
              optionChoices.map((item, index) => {
                let active = (index + 1) === this.state.answer.integerValue ? 'active' : '';
                return (
                  <a key={index}  className={"waves-effect waves-light btn select2-btn " + active}
                    onClick={e => this.onSelectAnswer(e, index + 1)}>
                    {item}
                  </a>
                )
              })
            }
          </div>
          <SkipQuestion answer={this.state.answer.integerValue} 
                onSkip={skipAnswer => this.handleSkip(skipAnswer)} 
                onComment={commentAnswer => this.handleComment(commentAnswer)}/>
        </Colxx>
      </Row>
    );
  }
}

export default TwoOptions
