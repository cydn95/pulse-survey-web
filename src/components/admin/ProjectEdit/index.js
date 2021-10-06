import React, { useState, useImperativeHandle, forwardRef } from 'react'
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from 'Components/Input'
import styles from './styles.scss'

const ProjectEdit = ({ project, currentStep }, ref) => {
  const [name, setName] = useState(project.name)

  useImperativeHandle(ref, () => ({
    name,
  }), [name])

  return (
    <div>
      <div className={styles.basicData}>
        <div>
          <p className={styles.projectName}>Project Name</p>
          <Input type="text" value={name} onChange={(value, e) => setName(value)} className={styles.input} />
          <p className={styles.projectCode}>Project Code:<span>{` ${project.code}`}</span></p>
        </div>
        <div>
          <p className={styles.projectName}>Project Name</p>
          <Select
            value={project.id}
            className={styles.select}
            name="teamId"
            label="Team*"
            onChange={(e) => this.handleInputChange(e)}
          >
            <MenuItem key={project.id} value={project.manager}>
              {project.manager}
            </MenuItem>
          </Select>

        </div>
      </div>
    </div>
  )
}

export default forwardRef(ProjectEdit);