import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'Components/Select'
import Input from 'Components/Input'
import styles from './styles.scss'
import SegmentAvatar from 'Assets/img/admin/Segments.svg'
import TeamAvatar from 'Assets/img/admin/Teams.svg'
import OrganizationAvatar from 'Assets/img/admin/Organizations.svg'
import Row from './Row'

const Reporting = ({ project, currentProject }) => {
  return (
    <Fragment>
      <div className={styles.dashboard_threshold}>
        <span className={styles.tag}>Dashboard Threshold</span>
        <Input className={styles.threshold} />
      </div>
      {Object.keys(currentProject).length > 0 && <Fragment>
        <Row title="Segments" avatar={SegmentAvatar} project={project} />
        <Row title="Teams" avatar={TeamAvatar} project={project} />
        <Row title="Organizations" avatar={OrganizationAvatar} project={project} />
      </Fragment>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject
  }
}

export default connect(mapStateToProps, null)(Reporting);