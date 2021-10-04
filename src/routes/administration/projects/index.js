import React, { useState } from 'react'
import ProjectCard from 'Components/ProjectCard'
import Button from 'Components/Button'
import styles from './styles.scss'

const Projects = ({ history, }) => {
  const [breadcrumb, setBreadcrumb] = useState('')
  const projects = [
    {
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
        <Button className={styles.button}>Create new project</Button>
      </div>
      <div className={styles.projectCards}>
        {projects.map(project =>
          <ProjectCard project={project} />
        )}
      </div>
    </div>
  )
}

export default Projects