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

const ProjectEdit = ({ project, currentStep, setBreadcrumb, getUserList, surveyId, getAOQuestionList, getAMQuestionList }, ref) => {

  useEffect(() => {
    getUserList(surveyId)
    getAOQuestionList(surveyId)
    getAMQuestionList(surveyId)
  }, [surveyId])

  return (
    <div className={styles.wrapper}>
      {currentStep === 0 && <ProjectSetup
        setBreadcrumb={setBreadcrumb}
        project={project}
      />}
      {currentStep === 1 && <ProjectConfiguration project={project} />}
      {currentStep === 2 && <UserAdministration project={project} />}
      {currentStep === 3 && <SurveyConfiguration project={project} />}
      {currentStep === 4 && <Reporting project={project} />}
      {currentStep === 5 && <FlaggedResponses project={project} />}
    </div>
  )
}

const mapStateToProps = ({ admin }) => {
  const { surveyId } = admin
  return {
    surveyId
  }
}

export default connect(mapStateToProps, {
  getUserList: adminUserList,
  getAOQuestionList: adminAOQuestionList,
  getAMQuestionList: adminAMQuestionList,
})(ProjectEdit);