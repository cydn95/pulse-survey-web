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
    // console.log(surveyList);
    return (
      <Fragment>
        <StageBar pages={surveyList} pageIndex={pageIndex} />
        <Row>
          <Colxx xs="12" md="6" className="survey-content">
            <Title title="Alfa Project" />
            {surveyList.length > 0 && <Question />}
            {surveyList.length ===0 && <h1>Loading...</h1>}
            <Continue />
          </Colxx>
          <Colxx xs="12" md="6" className="survey-image type-survey">

          </Colxx>
        </Row>
        
      </Fragment>
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
