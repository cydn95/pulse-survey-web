import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Switch from "rc-switch";

import "rc-switch/assets/index.css";

import styles from './project.scss';

import {
  projectListByUser,
  setProjectID
} from "Redux/actions";

class Project extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectStatus: []
    };
  }

  componentWillMount() {
    this.props.getProjectListByUser(this.props.user.userId);
  }

  componentWillReceiveProps(props) {
    let projectStatus = [];

    const { projectList, projectId } = props;

    for (let i = 0; i < projectList.length; i++) {

      if (projectList[i].project.id == projectId) {

        projectStatus.push(true)
      } else {
        projectStatus.push(false)
      }
    }

    this.setState({
      'projectStatus': projectStatus
    })
  }

  changeProjectStatus = (status, index) => {

    let projectStatus = this.state.projectStatus;

    let projectId = 0;

    for (let i = 0; i < projectStatus.length; i++) {
      if (i === index) {
        projectStatus[i] = status;
        projectId = this.props.projectList[index].project.id;
      } else {
        projectStatus[i] = false;
      }
    }

    this.setState({
      'projectStatus': projectStatus
    }, () => {
      console.log(projectStatus)
    })

    localStorage.setItem('projectId', projectId);
    this.props.setSurveyProjectID(projectId);
  }

  render() {
    const { projectList } = this.props;

    return (
      <div className={styles.main}>
        {projectList.length > 0 &&
          projectList.map((item, index) => {
            return (
              <div key={index}>
                <NavLink to="#" className="list-item-heading mb-1 truncate w-40 w-xs-100">
                  {item.project.projectName}
                </NavLink>
                <div className="w-15 w-xs-100 text-right">
                  <Switch
                    className="custom-switch custom-switch-primary"
                    checked={this.state.projectStatus[index]}
                    onChange={(status) => this.changeProjectStatus(status, index)}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {

  const { user, projectId } = authUser;
  const { locale, projectList } = settings;

  return {
    projectId,
    user,
    projectList,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    getProjectListByUser: projectListByUser,
    setSurveyProjectID: setProjectID
  }
)(Project);