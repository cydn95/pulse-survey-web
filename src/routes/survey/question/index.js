import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { controlType } from 'Constants/defaultValues'

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  Welcome,
  SmartText,
  RangeSlider
} from "Components/Survey";

class Question extends Component {

  render() {
    
    const { surveyList, pageIndex } = this.props;
    
    const question = surveyList[pageIndex];

    if (question.pages.pageType === "PG_WELCOME1") {
      return (
        <div>
          <Welcome/>
        </div>
      )
    } else {
      let controlList = question.pages.ampagesetting.map( (control, index) => {
        switch (control.controlType) {
          case controlType.TEXT:
            return <FreeText key={index} question={control}/>

          case controlType.SLIDER:
            return <RangeSlider key={index} question={control} />
          
            case controlType.TWO_OPTIONS:
            return <TwoOptions key={index} question={control} />

          case controlType.MULTI_OPTIONS:
            return <TwoOptions key={index} question={control} />

          case controlType.SMART_TEXT:
            return <SmartText key={index} question={control} />

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
