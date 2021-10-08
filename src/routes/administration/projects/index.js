import React, { useEffect, useState, useRef } from 'react'
import ProjectCard from 'Components/admin/ProjectCard'
import ProjectEdit from 'Components/admin/ProjectEdit'
import AdminStepBar from 'Components/admin/AdminStepBar'
import Input from "Components/Input";
import Button from 'Components/Button'
import styles from './styles.scss'

const projects = [
  {
    id: 33,
    name: 'Juilet Phase 3',
    manager: 'Cristophor Robinson',
    code: '07341215',
    title: 'We want to hear from you!',
    shortText: 'Watch a short video from our Project Manager.',
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
    templates: [{
      title: 'About the project',
      content: `
    <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
        Users can format their content using standard toolbar commands.</p>
    <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
    <p><b>Key features:</b></p>
    <ul>
        <li> <p>Provides IFRAME and DIV modes</p> </li>
        <li> <p>Capable of handling markdown editing.</p> </li>
        <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
        <li> <p>Provides a fully customizable toolbar.</p> </li>
        <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
        <li> <p>Supports third-party library integration.</p> </li>
    </ul>`
    }, {
      title: 'FAQ',
      content: `
    <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
        Users can format their content using standard toolbar commands.</p>
    <p><b>Key features:</b></p>`
    }],
  },
  {
    id: 32,
    name: 'Bravo Expansion Phase 1',
    manager: 'Cristophor Robinson',
    code: '02341241',
    title: 'We want to hear from you!',
    shortText: 'Watch a short video from our Project Manager.',
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
    templates: [{
      title: 'About the project',
      content: `
    <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
        Users can format their content using standard toolbar commands.</p>
    <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
    <p><b>Key features:</b></p>
    <ul>
        <li> <p>Provides IFRAME and DIV modes</p> </li>
        <li> <p>Capable of handling markdown editing.</p> </li>
        <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
        <li> <p>Provides a fully customizable toolbar.</p> </li>
        <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
        <li> <p>Supports third-party library integration.</p> </li>
    </ul>`
    }],
  },
  {
    id: 33,
    name: 'Juilet Phase 3',
    code: '07341215',
    title: 'We want to hear from you!',
    shortText: 'Watch a short video from our Project Manager.',
    manager: 'Cristophor Robinson',
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
    templates: [{
      title: 'About the project',
      content: `
    <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
        Users can format their content using standard toolbar commands.</p>
    <img alt="Logo" src="http://cdn.syncfusion.com/content/images/sales/buynow/Character-opt.png" />
    <p><b>Key features:</b></p>
    <ul>
        <li> <p>Provides IFRAME and DIV modes</p> </li>
        <li> <p>Capable of handling markdown editing.</p> </li>
        <li> <p>Contains a modular library to load the necessary functionality on demand.</p> </li>
        <li> <p>Provides a fully customizable toolbar.</p> </li>
        <li> <p>Provides HTML view to edit the source directly for developers.</p> </li>
        <li> <p>Supports third-party library integration.</p> </li>
    </ul>`
    }, {
      title: 'FAQ',
      content: `
    <p><a href="http://www.syncfusion.com">The Rich Text Editor</a> component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
        Users can format their content using standard toolbar commands.</p>
    <p><b>Key features:</b></p>`
    }],
  },
]

const Projects = ({ history, }) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const [editing, setEditing] = useState(-1)
  const [currentProject, setCurrentProject] = useState({})
  const [currentStep, setCurrentStep] = useState(0);

  const projectEditRef = useRef({})

  const handleEdit = (projectId) => {
    if (projectId >= 0) {
      setEditing(projectId)
      setCurrentProject(projects.filter(p => p.id === projectId)[0])
      setBreadcrumb('Projects > Edit Project')
    } else {
      setEditing(projectId)
      setCurrentProject({})
      setBreadcrumb('')
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Projects</h2>
          <h3 className={styles.breadcrumb}>{breadcrumb}</h3>
        </div>
        {editing < 0 ?
          <Button className={styles.button}>Create new project</Button> :
          <div className={styles.btnGroup}>
            <Button className={styles.cancelBtn} onClick={() => handleEdit(-1)}>Cancel</Button>
            <Button className={styles.button} onClick={() => console.log(projectEditRef.current)}>Save changes</Button>
          </div>
        }
      </div>
      {editing < 0 ?
        <div className={styles.projectCards}>
          {projects.map((project, index) =>
            <ProjectCard key={`${project.code}-${index}`} project={project} setEditing={(projectId) => handleEdit(projectId)} />
          )}
        </div> :
        <div>
          <AdminStepBar currentStep={currentStep} setCurrentStep={(i) => setCurrentStep(i)} />
          <ProjectEdit ref={projectEditRef} project={currentProject} currentStep={currentStep} />
        </div>
      }
    </div>
  )
}

export default Projects