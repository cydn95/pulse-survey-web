import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import {
  continueSurvey,
  submitSurvey
} from "Redux/actions";

class Continue extends Component {

  onNextQuestion = (e) => {
    
    e.preventDefault();

    const {surveyList, pageIndex, projectId, aboutMe} = this.props;
    let percentage = 0;

    if (pageIndex === (surveyList.length - 1)) {
      percentage = 100;

      this.props.submitSurvey(surveyList, aboutMe, projectId, this.props.history);

    } else {
      let totalQuestions = 0;
      let answeredQuestions = 0;
      
      for (let i = 0; i < surveyList.length; i++) {
        if (surveyList[i].pages.pageType === "PG_NEW_STAKEHOLDER" 
        || surveyList[i].pages.pageType === "PG_WELCOME1" 
        || surveyList[i].pages.pageType === "PG_ABOUT_ME") {
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

    }
  
    if (pageIndex < (surveyList.length - 1)) {
      this.props.continueSurvey(pageIndex + 1, percentage);
    } else {
      this.props.continueSurvey(pageIndex, percentage);
    }
  }

  render() {
    
    const { title } = this.props;
    
    return (
      <Row>
        <Colxx xs="12">
          <div className="mt-xs">
            <a href='/' onClick={e=>this.onNextQuestion(e)} 
            className="waves-effect waves-light btn black btn-continue right">{title}</a>
          </div>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ survey, settings, authUser }) => {

  const { pageList, pageIndex, aboutMe } = survey;
  const { locale } = settings;
  const { projectId } = authUser;

  return {
    projectId,
    surveyList: pageList,
    aboutMe,
    pageIndex,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    continueSurvey,
    submitSurvey
  }
)(Continue);
