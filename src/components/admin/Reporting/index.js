import React, { Fragment, useState } from 'react'
import Select from 'Components/Select'
import Input from 'Components/Input'
import styles from './styles.scss'
import SegmentAvatar from 'Assets/img/admin/Segments.svg'
import TeamAvatar from 'Assets/img/admin/Teams.svg'
import OrganizationAvatar from 'Assets/img/admin/Organizations.svg'
import Row from './Row'

const Reporting = ({ project }) => {
  return (
    <Fragment>
      <div className={styles.dashboard_threshold}>
        <span className={styles.tag}>Dashboard Threshold</span>
        <Input className={styles.threshold} />
      </div>
      <Row title="Segments" avatar={SegmentAvatar} project={project} />
      <Row title="Teams" avatar={TeamAvatar} project={project} />
      <Row title="Organizations" avatar={OrganizationAvatar} project={project} />
    </Fragment>
  )
}

export default Reporting;