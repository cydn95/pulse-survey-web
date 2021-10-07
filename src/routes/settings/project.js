import React, { Component } from "react";
import { connect } from "react-redux";

import {
  InputLabel,
  FormHelperText,
  FormControl,
  NativeSelect,
} from "@material-ui/core";

import "rc-switch/assets/index.css";

import Button from "Components/Button";

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
    getSurveyListByProject(event.target.value, this.callbackSelectProject);
  };

  callbackSelectProject = (data) => {
    const activeSurveys = data.filter(d => d.isActive === true);
    if (activeSurveys.length > 0) {
      const survey = activeSurveys[0];
      // console.log(survey);

      const { actionSetProjectID, actionSetSurveyID, user } = this.props;
      actionSetProjectID(survey.project);
      actionSetSurveyID(user.userId, survey.id);
      this.setState({
        surveyId: survey.id,
      });
    }
  }

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

  handleGotoSurvey = () => {
    const { history } = this.props;
    const { surveyId } = this.state;
    if (surveyId > 0) {
      history.push("/app/about-me");
    }
  };

  render() {
    const { projectList } = this.props;
    const { projectId, surveyId } = this.state;

    return (
      <div className={styles.main}>
        <FormControl className={styles["form-control"]}>
          <InputLabel htmlFor="project-native-helper">Project</InputLabel>
          <NativeSelect
            value={projectId ? projectId : 0}
            onChange={(e) => this.handleSelectProject(e)}
            inputProps={{
              name: "project",
              id: "project-native-helper",
            }}
          >
            <option aria-label="None" value={0} />
            {projectList.length > 0 &&
              projectList.map((item) => (
                <option key={`project_${item.id}`} value={item.id}>
                  {item.projectName}
                </option>
              ))}
          </NativeSelect>
          <FormHelperText>Please select a Project</FormHelperText>
        </FormControl>
        {surveyId > 0 && (
          <div className={styles.actions}>
            <Button default={true} onClick={(e) => this.handleGotoSurvey()}>
              Goto Survey
            </Button>
          </div>
        )}
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
