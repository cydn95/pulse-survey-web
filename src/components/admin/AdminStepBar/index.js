import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.scss'

import Edit from 'Assets/img/admin/Edit.svg'
import EditActive from 'Assets/img/admin/Edit_active.svg'
import Setting from 'Assets/img/admin/Setting.svg'
import SettingActive from 'Assets/img/admin/Setting_active.svg'
import User from 'Assets/img/admin/User.svg'
import UserActive from 'Assets/img/admin/User_active.svg'
import Configuration from 'Assets/img/admin/Configuration.svg'
import ConfigurationActive from 'Assets/img/admin/Configuration_active.svg'
import Reporting from 'Assets/img/admin/Reporting.svg'
import ReportingActive from 'Assets/img/admin/Reporting_active.svg'
import Flag from 'Assets/img/admin/Flag.svg'
import FlagActive from 'Assets/img/admin/Flag_active.svg'

const steps = [
  {
    icon: Edit,
    active: EditActive,
    text: 'Project Setup',
  },
  {
    icon: Setting,
    active: SettingActive,
    text: 'Project Configuration',
  },
  {
    icon: User,
    active: UserActive,
    text: 'User Administration',
  },
  {
    icon: Configuration,
    active: ConfigurationActive,
    text: 'Survey Configuration',
  },
  {
    icon: Reporting,
    active: ReportingActive,
    text: 'Reporting',
  },
  {
    icon: Flag,
    active: FlagActive,
    text: 'Flagged Responses'
  },
  {
    icon: null,
    active: null,
    text: 'Subscription'
  }
]

const AdminStepBar = ({ currentStep, setCurrentStep, currentProject }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stepBar}>
        <div className={styles.centerLine}></div>
        {
          steps.map((step, index) =>
            (index !== 5 || (index === 5 && Object.keys(currentProject).length > 0)) && <div key={index} className={styles.step}>
              <div className={classnames(styles.imageWrapper, index === currentStep && styles.active)} onClick={() => setCurrentStep(index)}>
                <img src={index === currentStep ? step.active : step.icon} alt="step" />
              </div>
              <span className={index === currentStep ? styles.active : ''}>{step.text}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject
  }
}

export default connect(mapStateToProps, null)(AdminStepBar)