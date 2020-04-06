import React, { Component } from "react";
import { connect } from 'react-redux';

import DriverPanel from "Components/driver";
import Loading from "Components/Loading";

import Question from "../question";

import TopNav from 'Containers/TopNav';

import {
  pageList,
  teamList,
  shgroupList,
  skipQuestionList,
  selectPage
} from "Redux/actions";

import styles from './styles.scss';

class Start extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.pageIndex
    };

    this.scrollTop = false;
  }

  componentWillMount() {
    this.props.getPageList(this.props.projectUserId);
    this.props.getTeamList();
    this.props.getShgroupList();
    this.props.getSkipQuestionList();
  }

  componentWillReceiveProps(props) {
    const { pageIndex, surveyList } = props;

    if (surveyList.length > 0) {
      setTimeout(() => {
        window.scrollTo(0,0);
      }, 100);
    }

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
      projectTitle,
      driverList,
      surveyList,
      skipQuestionList,
      history
    } = this.props;

    const defaultDrvierId = driverList.length ? driverList[this.state.pageIndex].driverId : 0;

    return (
      <div className={ styles.root }>
        <div className={styles.topbar }>
          <TopNav history={ history } menuTitle="About Me" >
						<div className={ styles.section }>
							<h2 className={ styles['project-name'] }>{projectTitle}</h2>
						</div>
					</TopNav>
        </div>
        <div className={ styles['main-content'] }>
          <div className={ styles['driver-scroll']}>
            <div className={ styles['driver-section'] }>
              <DriverPanel
                defaultDriverId = { defaultDrvierId }
                data={ driverList }
                color="black"
                onClick={(e, driverId) => this.handleClickDriver(driverId) } 
              />
            </div>
            <div className={ styles['survey-container']}>
              { surveyList.length > 0 && skipQuestionList.length > 0 && 
                <Question history={this.props.history} skipQuestionList={skipQuestionList} /> }
              {surveyList.length ===0 && <Loading description=""/>}
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = ({ survey, common, authUser }) => {

  const { pageList, pageIndex } = survey;
  const { skipQuestionList, driverList } = common
  const { projectTitle, projectUserId } = authUser

  return {
    projectTitle,
    driverList,
    surveyList : pageList,
    pageIndex,
    skipQuestionList,
    projectUserId
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
