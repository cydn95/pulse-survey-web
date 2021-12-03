import React, { useEffect, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import "react-notifications/lib/notifications.css";
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  adminUpdateUserList,
  adminSetProjectField,
  adminProjectList,
  adminSetCurrentProject,
  adminAddSurvey,
  adminUpdateSurvey,
  adminSetUserList,
  adminSetQuestionListBlank
} from 'Redux/admin/actions'
import TopNav from "Containers/TopNav";
import ProjectCard from 'Components/admin/ProjectCard'
import ProjectEdit from 'Components/admin/ProjectEdit'
import AdminStepBar from 'Components/admin/AdminStepBar'
import Button from 'Components/Button'
import styles from './styles.scss'

const Projects = ({
  history,
  updateUserList,
  userList,
  user,
  projectList,
  getProjectList,
  setCurrentProject,
  currentProject,
  loading,
  amQuestionList,
  aoQuestionList,
  surveyId,
  addSurvey,
  updateSurvey,
  setUserList,
  setQuestionListBlank,
}) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const [editing, setEditing] = useState(-2)
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getProjectList(user.userId)
  }, [user])

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0)
    }
  }, [loading, editing])


  const handleEdit = (projectId) => {
    if (projectId >= 0) {
      setEditing(projectId)
      setCurrentProject(projectList.filter(p => p.id === projectId)[0] || {})
      setBreadcrumb('Projects > Edit Project')
    } else {
      if (projectId === -1) {
        setBreadcrumb('Projects > Create Project')
      } else {
        setBreadcrumb('')
      }
      setEditing(projectId)
      setCurrentProject({})
      setUserList({})
      setQuestionListBlank()
    }
    setCurrentStep(0)
  }

  const savedCallback = (status) => {
    if (status) {
      NotificationManager.success("Response saved successfully", "");
    } else {
      NotificationManager.error("Something went wrong", "");
    }
    handleEdit(-2)
  }

  const onSave = () => {
    console.log('save button clicked')
    console.log('currentProject', currentProject)
    console.log('userList', userList)
    if (!currentProject.surveyTitle || currentProject.surveyTitle === '') {
      NotificationManager.error("Please fill out required fields", "");
      return;
    }
    const data = {
      projectSetup: {
        surveyTitle: currentProject.surveyTitle,
        projectManager: currentProject.projectManager,
        projectLogo: currentProject.projectLogo,
        companyLogo: currentProject.companyLogo,
        tour: currentProject.tour,
        moreInfo: currentProject.moreInfo,
      },
      projectConfiguration: {
        anonymityThreshold: currentProject.anonymityThreshold,
        shGroup: currentProject.shGroup,
        projectTeam: currentProject.projectTeam,
        customGroup1: currentProject.customGroup1,
        customGroup2: currentProject.customGroup2,
        customGroup3: currentProject.customGroup3,
        driverList: currentProject.driverList,
        myMap: currentProject.myMap,
        projectMap: currentProject.projectMap,
      },
      userAdministration: {
        ...userList
      },
      surveyConfiguration: {
        aoQuestionList,
        amQuestionList,
      }
    }
    console.log('data', data)
    if (surveyId) {
      updateSurvey(surveyId, data, savedCallback)
    } else {
      addSurvey(data, savedCallback)
    }
    // updateUserList(userList, savedCallback)
  }

  const actions = editing < - 1 ?
    <Button autofocus className={classnames(styles.button, styles.actions)} onClick={() => handleEdit(-1)}>Create new project</Button> :
    <div className={classnames(styles.btnGroup, styles.actions)}>
      <span className={styles.forMobile} onClick={() => handleEdit(-2)}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="rgb(180, 180, 180)" />
      </span>
      <span className={styles.forMobile} onClick={onSave}>
        <FontAwesomeIcon icon={faCheck} size="lg" color="rgb(98, 181,166)" />
      </span>
      <Button className={styles.cancelBtn} onClick={() => { handleEdit(-2); setCurrentProject({}) }}>Cancel</Button>
      <Button className={styles.button} onClick={onSave}>{`Save ${editing !== -1 ? 'changes' : ''}`}</Button>
    </div>

  return (
    <div className={styles.main}>
      <div className={styles.header} id="header">
        <div className={styles.topbar}>
          <TopNav history={history} withProfile={false} actions={actions} menuTitle={editing < 0 ? 'Projects' : currentProject.surveyTitle}>
            <div className={styles.section}>
              <h2 className={styles.breadcrumb}>{breadcrumb}</h2>
            </div>
          </TopNav>
        </div>
        {/* <div>
          <h2 className={styles.title}>{editing < 0 ? 'Projects' : currentProject.surveyTitle}</h2>
          <h3 className={styles.breadcrumb}>{breadcrumb}</h3>
        </div> */}

      </div>
      {editing < -1 ?
        <div className={styles.projectCards}>
          {projectList.length > 0 && projectList.map((project, index) =>
            <ProjectCard key={`${project.code}-${index}`} project={project} setEditing={(projectId) => handleEdit(projectId)} />
          )}
        </div> :
        <div>
          <AdminStepBar currentStep={currentStep} setCurrentStep={(i) => setCurrentStep(i)} />
          <ProjectEdit project={currentProject} currentStep={currentStep} setBreadcrumb={setBreadcrumb} />
        </div>
      }
      <NotificationContainer />
    </div>
  )
}

const mapStateToProps = ({ admin, authUser }) => {
  const { userList, projectList, currentProject, loading, aoQuestionList, amQuestionList, surveyId } = admin
  const { user } = authUser
  return {
    userList,
    projectList,
    currentProject,
    user,
    loading,
    aoQuestionList,
    amQuestionList,
    surveyId
  }
}

export default connect(mapStateToProps, {
  updateUserList: adminUpdateUserList,
  setProjectField: adminSetProjectField,
  getProjectList: adminProjectList,
  setCurrentProject: adminSetCurrentProject,
  addSurvey: adminAddSurvey,
  updateSurvey: adminUpdateSurvey,
  setUserList: adminSetUserList,
  setQuestionListBlank: adminSetQuestionListBlank,
})(Projects)