import React, { useEffect, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import "react-notifications/lib/notifications.css";
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
} from 'Redux/admin/actions'
import Loading from 'Components/Loading'
import ProjectCard from 'Components/admin/ProjectCard'
import ProjectEdit from 'Components/admin/ProjectEdit'
import AdminStepBar from 'Components/admin/AdminStepBar'
import Button from 'Components/Button'
import CancelImage from '../../../assets/img/admin/Cancel.png'
import SaveImage from '../../../assets/img/admin/Save.png'
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
  updateSurvey
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
      addSurvey(surveyId, data, savedCallback)
    }
    // updateUserList(userList, savedCallback)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header} id="header">
        <div>
          <h2 className={styles.title}>{editing < 0 ? 'Projects' : currentProject.surveyTitle}</h2>
          <h3 className={styles.breadcrumb}>{breadcrumb}</h3>
        </div>
        {editing < -1 ?
          <Button autofocus className={styles.button} onClick={() => handleEdit(-1)}>Create new project</Button> :
          <div className={styles.btnGroup}>
            <span className={styles.forMobile} onClick={() => handleEdit(-2)}>
              <img src={CancelImage} alt="cancel" />
            </span>
            <span className={styles.forMobile} onClick={onSave}>
              <img src={SaveImage} alt="save" />
            </span>
            <Button className={styles.cancelBtn} onClick={() => { handleEdit(-2); setCurrentProject({}) }}>Cancel</Button>
            <Button className={styles.button} onClick={onSave}>{`Save ${editing !== -1 ? 'changes' : ''}`}</Button>
          </div>
        }
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
})(Projects)