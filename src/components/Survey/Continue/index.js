import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import {
  continueSurvey,
} from "Redux/actions";

class Continue extends Component {

  onNextQuestion = (e) => {
    
    e.preventDefault();

    const {surveyList, pageIndex} = this.props;
    let percentage = 0;

    if (pageIndex === (surveyList.length - 1)) {
      percentage = 100;
    } else {
      let totalQuestions = 0;
      let answeredQuestions = 0;
      
      for (let i = 0; i < surveyList.length; i++) {
        if (surveyList[i].pages.pageType === "PG_NEW_STAKEHOLDER" || surveyList[i].pages.pageType === "PG_WELCOME1") {
          totalQuestions++;
          if (pageIndex >= i) {
            answeredQuestions++;
          }
        } else {
          totalQuestions += surveyList[i].pages.ampagesetting.length + surveyList[i].pages.aopagesetting.length;
          if (pageIndex >= i) {
            answeredQuestions += surveyList[i].pages.ampagesetting.length + surveyList[i].pages.aopagesetting.length;
          }
        }

        percentage = Math.round(answeredQuestions / totalQuestions * 100);
      }

      console.log(totalQuestions, answeredQuestions);
    }
  
    if (pageIndex < (surveyList.length - 1)) {
      this.props.continueSurvey(pageIndex + 1, percentage);
    } else {
      this.props.continueSurvey(pageIndex, percentage);
    }
  }

  render() {

    return (
      <Row>
        <Colxx xs="12">
          <div className="mt-xs">
            <a href='/' onClick={e=>this.onNextQuestion(e)} 
            className="waves-effect waves-light btn black btn-continue right">Continue</a>
          </div>
        </Colxx>
      </Row>
    );
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
  {
    continueSurvey
  }
)(Continue);
