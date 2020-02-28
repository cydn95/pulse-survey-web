import React, { Component } from "react";

import { connect } from 'react-redux';

import Button from '../../Button';

import {
  continueSurvey,
  submitSurvey
} from "Redux/actions";

import styles from "./styles.scss"

class Continue extends Component {

  onNextQuestion = (e) => {
    
    e.preventDefault();

    const {surveyList, pageIndex, projectId, aboutMe} = this.props;

    if (pageIndex === (surveyList.length - 1)) {
      this.props.submitSurvey(surveyList, aboutMe, projectId, this.props.history);
    }
  
    if (pageIndex < (surveyList.length - 1)) {
      this.props.continueSurvey(pageIndex + 1, 0);
    } else {
      this.props.continueSurvey(pageIndex, 0);
    }
  }

  render() {
    
    const { title } = this.props;
    
    return (
      <div className={ styles.root }>
        <Button onClick={e=>this.onNextQuestion(e)} >{title}</Button>
      </div>
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
