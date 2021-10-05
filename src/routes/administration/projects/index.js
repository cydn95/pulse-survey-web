import React, { useEffect, useState } from 'react'
import ProjectCard from 'Components/ProjectCard'
import ProjectEdit from 'Components/ProjectEdit'
import Button from 'Components/Button'
import styles from './styles.scss'

const steps = [
  'Project Setup',
  'Project Configuration',
  'User Administration',
  'Survey Configuration',
  'Reporting',
  'Flagged Responses'
]

const Projects = ({ history, }) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const [editing, setEditing] = useState(-1)
  const [currentProject, setCurrentProject] = useState({})
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (editing >= 0) {
      setCurrentProject(projects.filter(p => p.id === editing)[0])
      setBreadcrumb('Projects > Edit Project')
    } else {
      setBreadcrumb('')
    }
  }, [editing])
  const projects = [
    {
      id: 33,
      name: 'Juilet Phase 3',
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
    {
      id: 32,
      name: 'Bravo Expansion Phase 1',
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
    {
      id: 33,
      name: 'Juilet Phase 3',
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
            <Button className={styles.cancelBtn} onClick={() => setEditing(-1)}>Cancel</Button>
            <Button className={styles.button}>Save changes</Button>
          </div>
        }
      </div>
      <div className={styles.projectCards}>
        {editing < 0 ?
          projects.map(project =>
            <ProjectCard project={project} setEditing={(projectId) => setEditing(projectId)} />
          ) :
          <ProjectEdit project={currentProject} />
        }
      </div>
    </div>
  )
}

export default Projects