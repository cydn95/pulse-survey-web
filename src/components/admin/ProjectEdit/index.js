import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  adminUserList,
  adminAOQuestionList,
  adminAMQuestionList,
  adminSurveySetup,
  adminSurveyConfiguration,
  driverList,
  adminSetProjectField
} from 'Redux/actions'
import Loading from 'Components/Loading'
// import ProjectSetup from '../ProjectSetup'
// import UserAdministration from '../UserAdministration'
// import ProjectConfiguration from '../ProjectConfiguration'
// import SurveyConfiguration from '../SurveyConfiguration'
// import Reporting from '../Reporting'
// import FlaggedResponses from '../FlaggedResponses'
// import Subscription from '../Subscription'
import styles from './styles.scss'

const ProjectSetup = React.lazy(() => import('../ProjectSetup'))
const UserAdministration = React.lazy(() => import('../UserAdministration'))
const ProjectConfiguration = React.lazy(() => import('../ProjectConfiguration'))
const SurveyConfiguration = React.lazy(() => import('../SurveyConfiguration'))
const Reporting = React.lazy(() => import('../Reporting'))
const FlaggedResponses = React.lazy(() => import('../FlaggedResponses'))
const Subscription = React.lazy(() => import('../Subscription'))

const ProjectEdit = ({
  currentStep,
  setBreadcrumb,
  getUserList,
  surveyId,
  getAOQuestionList,
  getAMQuestionList,
  getAdminSurveySetup,
  currentProject,
  getAdminSurveyConfiguration,
  getDriverList,
  driverList,
  setProjectField,
  validateError,
  setValidateError
}) => {
  useEffect(() => {
    if (surveyId) {
      getDriverList(surveyId)
      getUserList(surveyId)
      getAOQuestionList(surveyId)
      getAMQuestionList(surveyId)
      getAdminSurveySetup(surveyId)
      getAdminSurveyConfiguration(surveyId)
    }
  }, [surveyId])

  useEffect(() => {
    if (driverList && Object.keys(currentProject).length > 0) {
      setProjectField('driverList', driverList);
    }
  }, [driverList])

  return (
    <React.Suspense fallback={<Loading description="" />}>
      <div className={styles.wrapper}>
        {currentStep === 0 && <ProjectSetup
          validateError={validateError}
          setValidateError={setValidateError}
          setBreadcrumb={setBreadcrumb}
        />}
        {currentStep === 1 && <ProjectConfiguration />}
        {currentStep === 2 && <UserAdministration />}
        {currentStep === 3 && <SurveyConfiguration />}
        {currentStep === 4 && <Reporting project={currentProject} />}
        {currentStep === 5 && <FlaggedResponses project={currentProject} />}
        {currentStep === 6 && <Subscription />}
      </div>
    </React.Suspense>
  )
}

const mapStateToProps = ({ admin, common }) => {
  const { surveyId, currentProject } = admin
  const { driverList } = common
  return {
    currentProject,
    surveyId,
    driverList
  }
}

export default connect(mapStateToProps, {
  getUserList: adminUserList,
  getDriverList: driverList,
  getAOQuestionList: adminAOQuestionList,
  getAMQuestionList: adminAMQuestionList,
  getAdminSurveySetup: adminSurveySetup,
  setProjectField: adminSetProjectField,
  getAdminSurveyConfiguration: adminSurveyConfiguration,
})(ProjectEdit);