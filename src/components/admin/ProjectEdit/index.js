import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  adminUserList,
  adminAOQuestionList,
  adminAMQuestionList,
} from 'Redux/actions'
import ProjectSetup from '../ProjectSetup'
import UserAdministration from '../UserAdministration'
import ProjectConfiguration from '../ProjectConfiguration'
import SurveyConfiguration from '../SurveyConfiguration'
import Reporting from '../Reporting'
import FlaggedResponses from '../FlaggedResponses'
import styles from './styles.scss'

const ProjectEdit = ({
  currentStep,
  setBreadcrumb,
  getUserList,
  surveyId,
  getAOQuestionList,
  getAMQuestionList,
  currentProject,
}) => {
  useEffect(() => {
    getUserList(surveyId)
    getAOQuestionList(surveyId)
    getAMQuestionList(surveyId)
    console.log("surveyId", surveyId)
  }, [surveyId])

  return (
    <div className={styles.wrapper}>
      {currentStep === 0 && <ProjectSetup
        setBreadcrumb={setBreadcrumb}
      />}
      {currentStep === 1 && <ProjectConfiguration />}
      {currentStep === 2 && <UserAdministration />}
      {currentStep === 3 && <SurveyConfiguration />}
      {currentStep === 4 && <Reporting project={currentProject} />}
      {currentStep === 5 && <FlaggedResponses project={currentProject} />}
    </div>
  )
}

const mapStateToProps = ({ admin }) => {
  const { surveyId, currentProject } = admin
  return {
    currentProject,
    surveyId,
  }
}

export default connect(mapStateToProps, {
  getUserList: adminUserList,
  getAOQuestionList: adminAOQuestionList,
  getAMQuestionList: adminAMQuestionList,
})(ProjectEdit);