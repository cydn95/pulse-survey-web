import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  adminUserList,
  adminAOQuestionList,
  adminAMQuestionList,
  adminReportAccessList,
  adminSurveySetup,
  adminSurveyConfiguration,
  adminGetDriverList,
  adminSetProjectField,
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
  getAdminReportAccessList,
  getAdminSurveySetup,
  currentProject,
  getAdminSurveyConfiguration,
  getDriverList,
  driverList,
  setProjectField,
  validateError,
  setValidateError,
  editing
}) => {
  useEffect(() => {
    if (surveyId) {
      getDriverList(surveyId)
      getUserList(surveyId)
      getAOQuestionList(surveyId)
      getAMQuestionList(surveyId)
      getAdminSurveySetup(surveyId)
      getAdminSurveyConfiguration(surveyId)
      getAdminReportAccessList(surveyId)
    }
  }, [surveyId])

  // useEffect(() => {
  //   if (driverList && Object.keys(currentProject).length > 0) {
  //     console.log('driver', driverList)
  //     setProjectField('driverList', driverList);
  //   }
  // }, [driverList])

  return (
    <React.Suspense fallback={<Loading description="" />}>
      <div className={styles.wrapper}>
        {currentStep === 0 && <ProjectSetup
          validateError={validateError}
          setValidateError={setValidateError}
          setBreadcrumb={setBreadcrumb}
          editing={editing}
        />}
        {(currentStep === 1 && editing !== -1) && <ProjectConfiguration />}
        {(currentStep === 2 && editing !== -1) && <UserAdministration />}
        {(currentStep === 3 && editing !== -1) && <SurveyConfiguration />}
        {(currentStep === 4 && editing !== -1) && <Reporting project={currentProject} />}
        {(currentStep === 5 && editing !== -1) && <FlaggedResponses project={currentProject} />}
        {(currentStep === 6 && editing !== -1) && <Subscription />}
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
  getDriverList: adminGetDriverList,
  getAOQuestionList: adminAOQuestionList,
  getAMQuestionList: adminAMQuestionList,
  getAdminReportAccessList: adminReportAccessList,
  getAdminSurveySetup: adminSurveySetup,
  setProjectField: adminSetProjectField,
  getAdminSurveyConfiguration: adminSurveyConfiguration,
})(ProjectEdit);