import React, { Fragment, useState } from 'react'
import Select from 'Components/Select'
import styles from './styles.scss'
import SegmentAvatar from 'Assts/img/admin/Segment.svg'
import TeamAvatar from 'Assts/img/admin/Team.svg'
import OrganizationAvatar from 'Assts/img/admin/Organization.svg'

const Reporting = () => {
  const [segmentName, setSegmentName] = useState('Internal')
  return (
    <Fragment>
      <div>
        <span>Dashboard Threshold</span>
      </div>
      <div className={styles.row}>
        <div className={styles.header}>
          <span><img src={SegmentAvatar} alt="segments" /></span>
          <h2>Segments</h2>
        </div>
        <div className={styles.inputs}>
          <div>
            <label>Segment name</label>
            <Select selected={segmentName} setSelected={setSegmentName} items={['Internal', 'External']} />
          </div>
          <div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Reporting;