import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adminUserList } from 'Redux/actions'
import ProjectSetup from '../ProjectSetup'
import UserAdministration from '../UserAdministration'
import ProjectConfiguration from '../ProjectConfiguration'
import SurveyConfiguration from '../SurveyConfiguration'
import Reporting from '../Reporting'
import FlaggedResponses from '../FlaggedResponses'
import styles from './styles.scss'

const ProjectEdit = ({ project, currentStep, setBreadcrumb, getUserList }, ref) => {

  useEffect(() => {
    if (Object.keys(project).length > 0) {
      getUserList(project.surveyId)
    }
  }, [project])

  return (
    <div className={styles.wrapper}>
      {currentStep === 0 && <ProjectSetup
        setBreadcrumb={setBreadcrumb}
        project={project}
      />}
      {currentStep === 1 && <ProjectConfiguration />}
      {currentStep === 2 && <UserAdministration project={project} />}
      {currentStep === 3 && <SurveyConfiguration />}
      {currentStep === 4 && <Reporting />}
      {currentStep === 5 && <FlaggedResponses />}
    </div>
  )
}

export default connect(null, {
  getUserList: adminUserList
})(ProjectEdit);