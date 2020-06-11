import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  InputLabel,
  FormHelperText,
  FormControl,
  NativeSelect,
} from "@material-ui/core";

import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import {
  projectListByUser,
  surveyListByProject,
  setProjectID,
  setSurveyID,
} from "Redux/actions";
import styles from "./project.scss";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectId: props.projectId,
      surveyId: props.surveyId,
    };
  }

  componentDidMount() {
    this.props.getProjectListByUser(this.props.user.userId);

    const { projectId } = this.state;
    const { getSurveyListByProject } = this.props;
    getSurveyListByProject(projectId);
  }

  handleSelectProject = (event) => {
    this.setState({
      projectId: event.target.value,
    });

    const { getSurveyListByProject } = this.props;
    getSurveyListByProject(event.target.value);
  };

  handleSelectSurvey = (newSurveyId, status) => {
    if (status) {
      this.setState({
        surveyId: newSurveyId,
      });
    } else {
      this.setState({
        surveyId: 0,
      });
    }

    const { projectId } = this.state;
    const { actionSetProjectID, actionSetSurveyID, user } = this.props;
    actionSetProjectID(projectId);
    actionSetSurveyID(user.userId, status ? newSurveyId : 0);
  };

  render() {
    const { projectList, surveyList } = this.props;
    const { projectId, surveyId } = this.state;

    return (
      <div className={styles.main}>
        <FormControl className={styles["form-control"]}>
          <InputLabel htmlFor="project-native-helper">Project</InputLabel>
          <NativeSelect
            value={projectId}
            onChange={(e) => this.handleSelectProject(e)}
            inputProps={{
              name: "project",
              id: "project-native-helper",
            }}
          >
            <option aria-label="None" value={0} />
            {projectList.length > 0 &&
              projectList.map((item) => (
                <option key={`project_${item.id}`} value={item.id}>{item.projectName}</option>
              ))}
          </NativeSelect>
          <FormHelperText>Please select a Project</FormHelperText>
        </FormControl>
        {surveyList.length > 0 &&
          surveyList.map((item) => {
            return (
              <div key={`survey_${item.id}`}>
                <NavLink
                  to="#"
                  className="list-item-heading mb-1 truncate w-40 w-xs-100"
                >
                  {item.surveyTitle}
                </NavLink>
                <div className="w-15 w-xs-100 text-right">
                  <Switch
                    className="custom-switch custom-switch-primary"
                    checked={item.id == surveyId ? true : false}
                    onChange={(status) =>
                      this.handleSelectSurvey(item.id, status)
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user, projectId, surveyId } = authUser;
  const { locale, projectList, surveyList } = settings;

  return {
    user,
    projectId,
    projectList,
    surveyId,
    surveyList,
    locale,
  };
};

export default connect(mapStateToProps, {
  getProjectListByUser: projectListByUser,
  getSurveyListByProject: surveyListByProject,
  actionSetProjectID: setProjectID,
  actionSetSurveyID: setSurveyID,
})(Project);
