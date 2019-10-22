import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  Welcome
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
          case 1:
            return <TwoOptions key={index} question={control}/>
          case 3:
            return <FreeText key={index} question={control}/>
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
