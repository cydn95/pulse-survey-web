import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import {
  selectPage,
} from "Redux/actions";

class Continue extends Component {

  onNextQuestion = (e) => {
    
    e.preventDefault();

    const {surveyList, pageIndex} = this.props;

    if (pageIndex < (surveyList.length - 1)) {
      this.props.setSurveyPage(pageIndex + 1);
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
    setSurveyPage: selectPage
  }
)(Continue);
