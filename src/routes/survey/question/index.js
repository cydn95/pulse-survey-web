import React, { Component } from "react";
import { connect } from 'react-redux';

import { controlType } from 'Constants/defaultValues'

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
  Continue
} from "Components/Survey";

import {
  inputAnswer,
} from "Redux/actions";

import styles from "./styles.scss";

class Question extends Component {
  
  handleAnswer = answer => {
    this.props.inputAnswer(answer);
  }

  render() {
    
    const { surveyList, optionList, pageIndex, skipQuestionList } = this.props;
    const questionList = surveyList[pageIndex];

    let continueText = 'Continue';
   
    let questionControl = questionList.amquestion.map( (control, index) => {
      switch (control.controlType_id) {
        case controlType.TEXT:
          return <FreeText
            key={index} 
            question={control}
            onAnswer={answer => this.handleAnswer(answer)}
            skipQuestionList={skipQuestionList} />

        case controlType.SLIDER:
          return <RangeSlider key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} 
            skipQuestionList={skipQuestionList} />
        
        case controlType.TWO_OPTIONS:
          return <TwoOptions key={index} options={optionList} question={control} onAnswer={answer => this.handleAnswer(answer)} 
            skipQuestionList={skipQuestionList} />

        case controlType.MULTI_OPTIONS:
          return <MultipleOptions key={index} options={optionList} question={control} onAnswer={answer => this.handleAnswer(answer)} 
            skipQuestionList={skipQuestionList} />

        case controlType.SMART_TEXT:
          return <SmartText key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} 
            skipQuestionList={skipQuestionList} />

        default:
          return <div key={index} ></div>
      }
    });

    if (pageIndex === (surveyList.length - 1)) {
      continueText = "Submit";
    }

    return (
      <div>
        { questionControl }
        <Continue history={this.props.history} title={continueText} />
      </div>
    )
  }
}

const mapStateToProps = ({ survey }) => {

  const { pageList, optionList, pageIndex } = survey;

  return {
    surveyList: pageList,
    optionList,
    pageIndex
  };
};

export default connect(
  mapStateToProps,
  { inputAnswer }
)(Question);
