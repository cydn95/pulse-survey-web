import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class FreeText extends Component {

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
        ...question.answer
      }
    })
  }
  
  onInputAnswer = e => {

    const topicValue = e.target.value;

    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'topicValue': topicValue,
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
        'topicValue': ''
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
    
    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <textarea className="materialize-textarea" rows="1" value={this.state.answer.topicValue} onChange={e => this.onInputAnswer(e)}></textarea>
          <SkipQuestion 
              answer={this.state.answer.topicValue}
              comment={this.state.answer.commentValue}
              skipValue={this.state.answer.skipValue}
              skipQuestionList={skipQuestionList}
              skipOption={question.skipOption}
              onSkip={skipAnswer => this.handleSkip(skipAnswer)} 
              onComment={commentAnswer => this.handleComment(commentAnswer)}/>
        </Colxx>
      </Row>
    );
  }
}

export default FreeText
