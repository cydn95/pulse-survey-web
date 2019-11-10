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
  NewStakeholder,
  AboutMe,
  Continue
} from "Components/Survey";

import {
  inputAnswer,
} from "Redux/actions";

class Question extends Component {
  
  handleAnswer = answer => {
    this.props.inputAnswer(answer);
  }

  render() {
    
    const { surveyList, optionList, pageIndex } = this.props;
    
    const question = surveyList[pageIndex];

    let questionControl;
    let continueText = 'Continue';

    if (question.pages.pageType === "PG_WELCOME1") {

      questionControl = <Welcome/>;
      
    } else if (question.pages.pageType === "PG_NEW_STAKEHOLDER") {  
      
      questionControl = <NewStakeholder />;

    } else if (question.pages.pageType === "PG_ABOUT_ME") {  
      
      questionControl = <AboutMe />;
      continueText = "Add Stakeholder";

    } else {
        questionControl = question.pages.ampagesetting.map( (control, index) => {
        switch (control.controlType) {
          case controlType.TEXT:
            return <FreeText key={index} question={control} onAnswer={answer => this.handleAnswer(answer)}/>

          case controlType.SLIDER:
            return <RangeSlider key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} />
          
            case controlType.TWO_OPTIONS:
            return <TwoOptions key={index} options={optionList} question={control} onAnswer={answer => this.handleAnswer(answer)} />

          case controlType.MULTI_OPTIONS:
            return <MultipleOptions key={index} options={optionList} question={control} onAnswer={answer => this.handleAnswer(answer)} />

          case controlType.SMART_TEXT:
            return <SmartText key={index} question={control}  onAnswer={answer => this.handleAnswer(answer)}/>

          default:
            return <div key={index} ></div>
        }
      });
    }

    if (pageIndex === (surveyList.length - 1)) {
      continueText = "Submit";
    }

    return (
      <div>
        {questionControl}
        <Continue history={this.props.history} title={continueText} />
      </div>
    )
  }
}

const mapStateToProps = ({ survey, settings }) => {

  const { pageList, optionList, pageIndex } = survey;
  const { locale } = settings;

  return {
    surveyList: pageList,
    optionList,
    pageIndex,
    locale
  };
};

export default connect(
  mapStateToProps,
  { inputAnswer }
)(Question);
