import React, { Component } from "react";
import { connect } from 'react-redux';

import DriverPanel from "Components/driver";

import Question from "../question";

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import {
  pageList,
  teamList,
  shgroupList,
  skipQuestionList,
  selectPage
} from "Redux/actions";

import classnames from 'classnames';

import styles from './styles.scss';

class Start extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.pageIndex
    };
  }

  componentWillMount() {
    this.props.getPageList();
    this.props.getTeamList();
    this.props.getShgroupList();
    this.props.getSkipQuestionList();
  }

  componentWillReceiveProps(props) {
    const { pageIndex } = props;

    this.setState({
      pageIndex
    });
  }

  handleClickDriver = driverId => {
    const { driverList, setSurveyPage } =  this.props;
    var pageIndex = driverList.findIndex(element => {
      return element.driverId === driverId
    });
    setSurveyPage(pageIndex);
  }
  
  render() {
    const { 
      driverList,
      surveyList,
      skipQuestionList
    } = this.props;

    const defaultDrvierId = driverList.length ? driverList[this.state.pageIndex].driverId : 0;

    return (
      <div className={ styles.root }>
        <div className={ styles['driver-scroll']}>
          <div className={ styles['driver-section'] }>
            <DriverPanel
              defaultDriverId = { defaultDrvierId }
              data={ driverList }
              onClick={(e, driverId) => this.handleClickDriver(driverId) } 
            />
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

const mapStateToProps = ({ survey, common }) => {

  const { pageList, pageIndex } = survey;
  const { skipQuestionList, driverList } = common

  return {
    driverList,
    surveyList : pageList,
    pageIndex,
    skipQuestionList,
  };
};

export default connect(
  mapStateToProps,
  {
    getPageList: pageList,
    getTeamList: teamList,
    getShgroupList: shgroupList,
    getSkipQuestionList: skipQuestionList,
    setSurveyPage: selectPage
  }
)(Start);
