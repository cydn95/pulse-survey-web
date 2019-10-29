import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { controlType } from 'Constants/defaultValues'

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  Welcome,
  SmartText,
  RangeSlider,
  NewStakeholder
} from "Components/Survey";


class Question extends Component {
  
  handleAnswer = answer => {
    console.log(answer);
  }

  render() {
    
    const { surveyList, pageIndex } = this.props;
    
    const question = surveyList[pageIndex];

    if (question.pages.pageType === "PG_WELCOME1") {
      return (
        <div>
          <Welcome/>
        </div>
      )
    } else if (question.pages.pageType === "PG_NEW_STAKEHOLDER") {  
      return (
        <div>
          <NewStakeholder />          
        </div>
      )
    } else {
      let controlList = question.pages.ampagesetting.map( (control, index) => {
        switch (control.controlType) {
          case controlType.TEXT:
            return <FreeText key={index} question={control} onAnswer={answer => this.handleAnswer(answer)}/>

          case controlType.SLIDER:
            return <RangeSlider key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} />
          
            case controlType.TWO_OPTIONS:
            return <TwoOptions key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} />

          case controlType.MULTI_OPTIONS:
            return <MultipleOptions key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} />

          case controlType.SMART_TEXT:
            return <SmartText key={index} question={control}  onAnswer={answer => this.handleAnswer(answer)}/>

          default:
            return <div key={index} ></div>
        }
      });
      
      return (
        <div>{controlList}</div>
      )
    }
  }
}

const mapStateToProps = ({ survey, settings }) => {

  const { pageList, pageIndex } = survey;
  const { locale } = settings;

  return {
    surveyList: pageList,
    pageIndex,
    locale
  };
};

export default connect(
  mapStateToProps,
  {}
)(Question);
