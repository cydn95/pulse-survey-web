import React, { useState } from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Input from 'Components/Input'
import Select from 'Components/Select'
import Help from '../../../assets/img/admin/help.svg'
import styles from './styles.scss'

const ProjectConfiguration = () => {
  const [shgroup, setSHGroup] = useState('')
  const [projectTeams, setProjectTeams] = useState(['Management', 'Engineering'])
  return (
    <div className={styles.wrapper}>
      <div className={styles.user_group}>
        <h2>User Grouping</h2>
        <div className={styles.threshold_wrapper}>
          <div className={styles.left_part}>
            <span>Anonymity Threshold&nbsp;</span>
            <TooltipComponent
              content="To ensure all responses remain safe and anonymous the minimum threshold is 3">
              <img src={Help} alt="help" />
            </TooltipComponent>
          </div>
          <Input type="number" className={styles.threshold} />
        </div>
        <div className={styles.detailed}>
          <div className={styles.column}>
            <span className={styles.header}>Stakeholder Groups / Segments</span>
            <span className={styles.description}>Create meaningful groupings to specify which
              questions the users are asked.</span>
            <Select selected={shgroup} noSelected="Choose Group" setSelected={setSHGroup} items={[]} className={styles.withOutline} />
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Project Teams</span>
            <span className={styles.description}>Define the teams that will be used to
              categorise user responses. Users in different
              organisations can be in the same team.</span>
            {projectTeams.map((pt, idx) =>
              <Select selected={pt} noSelected="Choose Group" setSelected={setSHGroup} items={['Management', 'Engineering']} className={styles.withOutline} />
            )}
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Custom Groups</span>
            <span className={styles.description}>Create up to three custom groups</span>
            <Input type="text" className={styles.customGroup} />
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectConfiguration