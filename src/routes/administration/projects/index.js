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
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
  },
  {
    id: 32,
    name: 'Bravo Expansion Phase 1',
    manager: 'Cristophor Robinson',
    code: '02341241',
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
  },
  {
    id: 33,
    name: 'Juilet Phase 3',
    code: '07341215',
    manager: 'Cristophor Robinson',
    totalIdentified: 80,
    createdAt: '01-Jan-2021',
    memberCount: 30,
    stakeholderCount: 30,
    invitedCount: 50,
    invitedPercent: 63,
    availableSeatCount: 30,
    overallSentiment: 9.2,
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
          {projects.map(project =>
            <ProjectCard project={project} setEditing={(projectId) => handleEdit(projectId)} />
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