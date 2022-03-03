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
  adminSetQuestionListBlank,
  adminUploadImages,
} from 'Redux/admin/actions'
import {
  shgroupList,
  teamList,
  organizationList,
} from 'Redux/actions'
// import TopNav from "Containers/TopNav";
// import ProjectCard from 'Components/admin/ProjectCard'
// import ProjectEdit from 'Components/admin/ProjectEdit'
// import AdminStepBar from 'Components/admin/AdminStepBar'
import Loading from 'Components/Loading'
import {serverUrl} from 'Constants/defaultValues'
// import CheckoutForm from 'Components/admin/Subscription/CheckoutForm'
import Button from 'Components/Button'
import styles from './styles.scss'

const TopNav = React.lazy(() => import("Containers/TopNav"));
const ProjectCard = React.lazy(() => import('Components/admin/ProjectCard'));
const AdminStepBar = React.lazy(() => import('Components/admin/AdminStepBar'));
const ProjectEdit = React.lazy(() => import('Components/admin/ProjectEdit'));

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
  uploadImages,
  setUserList,
  setQuestionListBlank,
  getShGroupList,
  getTeamList,
  getOrganizationList
}) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const [editing, setEditing] = useState(-2)
  const [currentStep, setCurrentStep] = useState(0);
  const [validateError, setValidateError] = useState({})

  useEffect(() => {
    getProjectList(user.userId)
  }, [user])

  useEffect(() => {
    if(currentProject.id) {
      getShGroupList(currentProject.id);
      getTeamList(currentProject.project, currentProject.id);
      getOrganizationList(currentProject.id)
    }
  }, [currentProject.id, currentProject.project])


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

  const savedCallback2 = (status) => {
    if (status) {
      console.log("Images Uploaded");
    } else {
      console.log("There was a problem uploading the image.");
    }
  }

  const onSave = () => {
    console.log('currentProject', currentProject)
    console.log('userList', userList)
    if ((currentProject.surveyTitle || '').length < 2 || (currentProject.surveyTitle || '').length > 200) {
      setCurrentStep(0);
      setValidateError({ pname: 'Project Name must be a minimum of 2 characters and a maximum of 200 charactres.' })
      NotificationManager.error("Please fill out required fields", "");
      return;
    }
    if ((currentProject.projectManager || '').length > 0 && ((currentProject.projectManager || '').length < 2 || (currentProject.projectManager || '').length > 50)) {
      setCurrentStep(0);
      setValidateError({ pmanager: 'Project Manager must be a minimum of 2 characters and a maximum of 50 charactres.' })
      NotificationManager.error("Please fill out required fields", "");
      return;
    }
    
    const data = {
      projectSetup: {
        surveyTitle: currentProject.surveyTitle,
        projectManager: currentProject.projectManager,
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
        driverList: (() => currentProject.driverList.map((d, idx) => ({...d, driveOrder: idx})))(),
      },
      userAdministration: {
        ...userList
      },
      surveyConfiguration: {
        aoQuestionList: aoQuestionList.map((d, idx) => {
          let temp = ({...d, aoqOrder: idx, controlType_id:d.controlType, survey_id: currentProject.id})
          delete temp['controlType']
          if('survey' in temp)
            delete temp['survey']
          return temp
        }),
        amQuestionList: amQuestionList.map((d, idx) => {
          let temp = ({...d, amqOrder: idx, controlType_id:d.controlType, survey_id: currentProject.id, driver_id: (d.driver || {}).id})
          delete temp['controlType']
          delete temp['driver']
          if('survey' in temp)
            delete temp['survey']
          return temp
        }),
      },
      segments: currentProject.segments
    }
    
    const create = {
      project: '1',
      surveyTitle: currentProject.surveyTitle,
      projectManager: currentProject.projectManager,
      projectLogo: currentProject.projectLogo,
      companyLogo: currentProject.companyLogo,
      customGroup1: currentProject.customGroup1,
      customGroup2: currentProject.customGroup2,
      customGroup3: currentProject.customGroup3,
      anonymityThreshold: currentProject.anonymityThreshold,
      projectCode: currentProject.projectCode,
      seatsPurchased: currentProject.seatsPurchased
    }
    let form_data = new FormData();
    console.log('data', data)
    if (surveyId) {
      console.log('server_url', serverUrl)
      form_data.append("survey", currentProject.id)
      if(currentProject.companyLogo)
        form_data.append("companyLogo", typeof currentProject.companyLogo === 'string' ? currentProject.companyLogo.replace(`${serverUrl}/media/`, ''): currentProject.companyLogo)
      if(currentProject.projectLogo)
        form_data.append("projectLogo", typeof currentProject.projectLogo === 'string' ? currentProject.projectLogo.replace(`${serverUrl}/media/`, ''): currentProject.projectLogo)
      form_data.append("video", currentProject.video)
      for ( let d in (currentProject.myMap || [])) {
        console.log(d)
        if(currentProject.myMap[d].id) {
          form_data.append(currentProject.myMap[d].id, currentProject.myMap[d].icon)
        }
        
      }
      for ( let d in (currentProject.myMap || [])) {
        if(currentProject.myMap[d].id)
          form_data.append(currentProject.myMap[d].id, currentProject.myMap[d].icon)
      }
      console.log('form_data', form_data)
      updateSurvey(surveyId, data, savedCallback)
      uploadImages(form_data, savedCallback2)
    } else {
      for ( let key in create ) {
        if((key !== "projectLogo" && key !== "companyLogo") || create[key]) {
          form_data.append(key, create[key]);
        }
      }
      addSurvey(form_data, savedCallback)
    }
    // updateUserList(userList, savedCallback)
  }

  const actions = editing < - 1 ?
    <Button autoFocus className={classnames(styles.button, styles.actions)} onClick={() => handleEdit(-1)}>Create new project</Button> :
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
    <React.Suspense fallback={<Loading description="" />}>
      <div className={styles.main}>
        <div className={styles.header} id="header">
          <div className={styles.topbar}>
            <TopNav history={history} withProfile={false} actions={actions} menuTitle={editing < 0 ? 'Projects' : currentProject.surveyTitle}>
              <div className={styles.section}>
                <h2 className={styles.breadcrumb}>{breadcrumb}</h2>
              </div>
            </TopNav>
          </div>
        </div>
        {editing < -1 ?
          <div className={styles.projectCards}>
            {projectList.length > 0 && projectList.map((project, index) =>
              <ProjectCard key={`${project.code}-${index}`} project={project} setEditing={(projectId) => handleEdit(projectId)} />
            )}
          </div> :
          <div>
            {editing > -1 && <AdminStepBar currentStep={currentStep} setCurrentStep={(i) => setCurrentStep(i)} />}
            <ProjectEdit project={currentProject} editing={editing} validateError={validateError} setValidateError={setValidateError} currentStep={currentStep} setBreadcrumb={setBreadcrumb} />
          </div>
        }
        {/* <CheckoutForm /> */}
        <NotificationContainer />
      </div>
    </React.Suspense>
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
  uploadImages: adminUploadImages,
  getTeamList: teamList,
  getOrganizationList: organizationList,
  getShGroupList: shgroupList,
})(Projects)