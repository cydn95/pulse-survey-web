import React, { Component } from "react";
import { connect } from 'react-redux';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import {
  StageBar
} from "Components/Survey";

import Question from "../question";

import {
  pageList,
  teamList,
  shgroupList,
  skipQuestionList
} from "Redux/actions";

class Start extends Component {

  componentWillMount() {
    this.props.getPageList();
    this.props.getTeamList();
    this.props.getShgroupList();
    this.props.getSkipQuestionList();
  }

  render() {
    const {pageIndex, surveyList, skipQuestionList} = this.props;
    
    return (
      <div className="survey-container">
        <div className="survey-progress-bar">
          <StageBar pages={surveyList} pageIndex={pageIndex} />
        </div>
        <div className="main-content">
          <div className="survey-content">
            <Row>
              <Colxx xs="12">
                {/* <Title title="Alfa Project" /> */}
                { surveyList.length > 0 && skipQuestionList.length > 0 && 
                  <Question history={this.props.history} skipQuestionList={skipQuestionList} /> }
                {surveyList.length ===0 && <h1>Loading...</h1>}
              </Colxx>
            </Row>
          </div>
          <div className="survey-image">
            <img alt="survey-description" className="img-survey-description" src="/assets/img/survey/survey.png"/>
            <img alt="site-logo" className="img-site-logo" src="/assets/img/survey/site-logo.png"/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, settings, common }) => {

  const { pageList, pageIndex } = survey;
  const { locale } = settings;
  const { skipQuestionList } = common

  return {
    surveyList : pageList,
    pageIndex,
    skipQuestionList,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    getPageList: pageList,
    getTeamList: teamList,
    getShgroupList: shgroupList,
    getSkipQuestionList: skipQuestionList
  }
)(Start);
