import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import {
  Title,
  StageBar,
  Continue
} from "Components/Survey";

import Question from "../question";

import {
  pageList,
} from "Redux/actions";

class Start extends Component {

  componentWillMount() {
    this.props.getPageList();
  }

  render() {
    const {pageIndex, surveyList} = this.props;
    return (
      <div className="survey-container">
        <div className="survey-progress-bar">
          <StageBar pages={surveyList} pageIndex={pageIndex} />
        </div>
        <div class="main-content">
          <div class="survey-content">
            <Row>
              <Colxx xs="12">
                {/* <Title title="Alfa Project" /> */}
                {surveyList.length > 0 && <Question />}
                {surveyList.length ===0 && <h1>Loading...</h1>}
                <Continue />
              </Colxx>
            </Row>
          </div>
          <div class="survey-image">
            <img className="img-survey-description" src="/assets/img/survey/survey.png"/>
            <img className="img-site-logo" src="/assets/img/survey/site-logo.png"/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, settings }) => {

  const { pageList, pageIndex } = survey;
  const { locale } = settings;

  return {
    surveyList : pageList,
    pageIndex,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    getPageList: pageList
  }
)(Start);
