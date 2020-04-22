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

import {
  SURVEY_NOT_STARTED,
  SURVEY_IN_PROGRESS,
  SURVEY_COMPLETED,
} from "Constants/defaultValues";

import styles from './styles.scss';

class Start extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageIndex: props.pageIndex,
      driverList: [],
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

      const driverList = [];

      for (let i = 0; i < surveyList.length; i++) {
        let answeredCount = 0;
        let driverProgress = SURVEY_NOT_STARTED;

        for (let j = 0; j < surveyList[i].amquestion.length; j++) {
          if (surveyList[i].amquestion[j].responsestatus === true) {
            answeredCount++;
          }
        }

        if (answeredCount === 0) {
          driverProgress = SURVEY_NOT_STARTED;
        } else if (answeredCount < surveyList[i].amquestion.length) {
          driverProgress = SURVEY_IN_PROGRESS;
        } else {
          driverProgress = SURVEY_COMPLETED;
        }

        const driver = {
          driverId: surveyList[i].id,
          driverName: surveyList[i].driverName,
          icon: surveyList[i].iconPath,
          percentage: 0,
          progress: driverProgress,
        };

        driverList.push(driver);
      }

      this.setState({
        driverList,
      });
    }

    this.setState({
      pageIndex,
    });
  }

  handleClickDriver = driverId => {
    const { setSurveyPage } =  this.props;
    const { driverList } = this.state;
    var pageIndex = driverList.findIndex(element => {
      return element.driverId === driverId
    });
    setSurveyPage(pageIndex);
  }
  
  render() {
    const {
      surveyList,
      projectTitle,
      skipQuestionList,
      history
    } = this.props;

    const { driverList } = this.state;

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
                color="green"
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
