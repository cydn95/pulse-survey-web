import React, { Component } from "react";
import { connect } from 'react-redux';

import DriverPanel from "Components/driver";

import Question from "../question";

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import {
  driverList,



  pageList,
  teamList,
  shgroupList,
  skipQuestionList,
} from "Redux/actions";

import classnames from 'classnames';

import styles from './styles.scss';

class Start extends Component {

  componentWillMount() {
    this.props.getPageList();
    this.props.getTeamList();
    this.props.getShgroupList();
    this.props.getSkipQuestionList();
    const { getDriverList } = this.props;
    getDriverList();
  }

  render() {
    const { 
      driverList,
      surveyList,

      pageIndex,
      skipQuestionList
    } = this.props;
    
    return (
      <div className={ styles.root }>
        <div className={ styles['driver-scroll']}>
          <div className={ styles['driver-section'] }>
            <DriverPanel data={ driverList } />
          </div>
          <div className={ styles['survey-container']}>
            <Colxx xs="12">
              { surveyList.length > 0 && skipQuestionList.length > 0 && 
                <Question history={this.props.history} skipQuestionList={skipQuestionList} /> }
              {surveyList.length ===0 && <h1></h1>}
            </Colxx>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, settings, common }) => {

  const { pageList, pageIndex } = survey;
  const { locale } = settings;
  const { skipQuestionList, driverList } = common

  return {
    driverList,


    surveyList : pageList,
    pageIndex,
    skipQuestionList,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    getDriverList: driverList,

    getPageList: pageList,
    getTeamList: teamList,
    getShgroupList: shgroupList,
    getSkipQuestionList: skipQuestionList
  }
)(Start);
