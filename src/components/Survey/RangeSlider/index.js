import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

import { SliderTooltip } from "Components/SliderTooltip";
import "rc-slider/assets/index.css";

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
    const { question, skipQuestionList } = this.props;
    
    return (
      <div>
        <Row>
          <Colxx xs="12">
            <h1 className="mt-s">{question.questionText}</h1>
          </Colxx>
        </Row>
        <Row>
          <Colxx xs="12">
            <SliderTooltip
              min={0}
              max={100}
              value={this.state.answer.integerValue}
              tipFormatter={null}
              className="mb-5"
              onChange={value => this.onChangeSlide(value)}/>
          </Colxx>
          <Colxx xs="6" className="slider-text-left">
            {question.sliderTextLeft}
          </Colxx>
          <Colxx xs="6" className="slider-text-right">
            {question.sliderTextRight}
          </Colxx>
        </Row>
        <Row>
          <Colxx xs="12">
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
      </div>
    );
  }
}

export default RangeSlider
