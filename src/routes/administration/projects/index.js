import React, { useEffect, useState, useRef } from 'react'
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
} from 'Redux/admin/actions'
import ProjectCard from 'Components/admin/ProjectCard'
import ProjectEdit from 'Components/admin/ProjectEdit'
import AdminStepBar from 'Components/admin/AdminStepBar'
import Button from 'Components/Button'
import CancelImage from '../../../assets/img/admin/Cancel.png'
import SaveImage from '../../../assets/img/admin/Save.png'
import styles from './styles.scss'

// const defaultProjects = [
//   {
//     id: 33,
//     surveyId: 59,
//     name: 'Juilet Phase 3',
//     manager: 'Cristophor Robinson',
//     code: '07341215',
//     title: 'We want to hear from you!',
//     shortText: 'Watch a short video from our Project Manager.',
//     totalIdentified: 80,
//     createdAt: '01-Jan-2021',
//     memberCount: 30,
//     stakeholderCount: 30,
//     invitedCount: 50,
//     invitedPercent: 63,
//     availableSeatCount: 30,
//     overallSentiment: 9.2,
//     templates: [{
//       title: 'About the project',
//       content: `
//     <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
//         Users can format their content using standard toolbar commands.</p>
//     <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
//     <p><b>Key features:</b></p>
//     <ul>
//         <li> <p>Provides IFRAME and DIV modes</p> </li>
//         <li> <p>Capable of handling markdown editing.</p> </li>
//         <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
//         <li> <p>Provides a fully customizable toolbar.</p> </li>
//         <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
//         <li> <p>Supports third-party library integration.</p> </li>
//     </ul>`
//     }, {
//       title: 'FAQ',
//       content: `
//     <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
//         Users can format their content using standard toolbar commands.</p>
//     <p><b>Key features:</b></p>`
//     }],
//   },
//   {
//     id: 32,
//     surveyId: 59,
//     name: 'Bravo Expansion Phase 1',
//     manager: 'Cristophor Robinson',
//     code: '02341241',
//     title: 'We want to hear from you!',
//     shortText: 'Watch a short video from our Project Manager.',
//     totalIdentified: 80,
//     createdAt: '01-Jan-2021',
//     memberCount: 30,
//     stakeholderCount: 30,
//     invitedCount: 50,
//     invitedPercent: 63,
//     availableSeatCount: 30,
//     overallSentiment: 9.2,
//     templates: [{
//       title: 'About the project',
//       content: `
//     <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
//         Users can format their content using standard toolbar commands.</p>
//     <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
//     <p><b>Key features:</b></p>
//     <ul>
//         <li> <p>Provides IFRAME and DIV modes</p> </li>
//         <li> <p>Capable of handling markdown editing.</p> </li>
//         <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
//         <li> <p>Provides a fully customizable toolbar.</p> </li>
//         <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
//         <li> <p>Supports third-party library integration.</p> </li>
//     </ul>`
//     }],
//   },
//   {
//     id: 33,
//     surveyId: 59,
//     name: 'Juilet Phase 3',
//     code: '07341215',
//     title: 'We want to hear from you!',
//     shortText: 'Watch a short video from our Project Manager.',
//     manager: 'Cristophor Robinson',
//     totalIdentified: 80,
//     createdAt: '01-Jan-2021',
//     memberCount: 30,
//     stakeholderCount: 30,
//     invitedCount: 50,
//     invitedPercent: 63,
//     availableSeatCount: 30,
//     overallSentiment: 9.2,
//     templates: [{
//       title: 'About the project',
//       content: `
//     <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
//         Users can format their content using standard toolbar commands.</p>
//     <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
//     <p><b>Key features:</b></p>
//     <ul>
//         <li> <p>Provides IFRAME and DIV modes</p> </li>
//         <li> <p>Capable of handling markdown editing.</p> </li>
//         <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
//         <li> <p>Provides a fully customizable toolbar.</p> </li>
//         <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
//         <li> <p>Supports third-party library integration.</p> </li>
//     </ul>`
//     }, {
//       title: 'FAQ',
//       content: `
//     <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
//         Users can format their content using standard toolbar commands.</p>
//     <p><b>Key features:</b></p>`
//     }],
//   },
// ]

const Projects = ({
  history,
  updateUserList,
  userList,
  user,
  projectList,
  getProjectList,
  setCurrentProject,
  currentProject,
}) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const [editing, setEditing] = useState(-2)
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getProjectList(user.userId)
  }, [user])

  const projectEditRef = useRef({})

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
    updateUserList(userList, savedCallback)
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{editing < 0 ? 'Projects' : currentProject.name}</h2>
          <h3 className={styles.breadcrumb}>{breadcrumb}</h3>
        </div>
        {editing < -1 ?
          <Button className={styles.button} onClick={() => handleEdit(-1)}>Create new project</Button> :
          <div className={styles.btnGroup}>
            <span className={styles.forMobile} onClick={() => handleEdit(-2)}>
              <img src={CancelImage} alt="cancel" />
            </span>
            <span className={styles.forMobile} onClick={onSave}>
              <img src={SaveImage} alt="save" />
            </span>
            <Button className={styles.cancelBtn} onClick={() => handleEdit(-2)}>Cancel</Button>
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
          <ProjectEdit ref={projectEditRef} project={currentProject} currentStep={currentStep} setBreadcrumb={setBreadcrumb} />
        </div>
      }
      <NotificationContainer />
    </div>
  )
}

const mapStateToProps = ({ admin, authUser }) => {
  const { userList, projectList, currentProject } = admin
  const { user } = authUser
  return {
    userList,
    projectList,
    currentProject,
    user,
  }
}

export default connect(mapStateToProps, {
  updateUserList: adminUpdateUserList,
  setProjectField: adminSetProjectField,
  getProjectList: adminProjectList,
  setCurrentProject: adminSetCurrentProject
})(Projects)