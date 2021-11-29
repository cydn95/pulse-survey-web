import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import SegmentAvatar from 'Assets/img/admin/Segments.svg'
import TeamAvatar from 'Assets/img/admin/Teams.svg'
import OrganizationAvatar from 'Assets/img/admin/Organizations.svg'
import MessageBox from 'Components/MessageBox'
import Row from './Row'

const Reporting = ({ project, currentProject }) => {
  return (
    <Fragment>
      <MessageBox
        title="Coming Soon"
        subTitle="STAY TUNED!"
        imageUrl="/assets/img/comingsoon.png"
      >
        We are currently working on a super exciting feature
      </MessageBox>
      {/* {Object.keys(currentProject).length > 0 && <Fragment>
        <Row title="Segments" avatar={SegmentAvatar} project={project} />
        <Row title="Teams" avatar={TeamAvatar} project={project} />
        <Row title="Organizations" avatar={OrganizationAvatar} project={project} />
      </Fragment>} */}
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