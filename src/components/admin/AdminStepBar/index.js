import React from 'react'
import classnames from 'classnames'
import styles from './styles.scss'

import Edit from '../../../assets/img/admin/Edit.svg'
import EditActive from '../../../assets/img/admin/Edit_active.svg'
import Setting from '../../../assets/img/admin/Setting.svg'
import SettingActive from '../../../assets/img/admin/Setting_active.svg'
import User from '../../../assets/img/admin/User.svg'
import UserActive from '../../../assets/img/admin/User_active.svg'
import Configuration from '../../../assets/img/admin/Configuration.svg'
import ConfigurationActive from '../../../assets/img/admin/Configuration_active.svg'
import Reporting from '../../../assets/img/admin/Reporting.svg'
import ReportingActive from '../../../assets/img/admin/Reporting_active.svg'
import Flag from '../../../assets/img/admin/Flag.svg'
import FlagActive from '../../../assets/img/admin/Flag_active.svg'

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
  }
]

const AdminStepBar = ({ currentStep, setCurrentStep }) => {
  return (
    <div className={styles.stepBar}>
      <div className={styles.centerLine}></div>
      {
        steps.map((step, index) =>
          <div key={index} className={styles.step}>
            <div className={classnames(styles.imageWrapper, index === currentStep && styles.active)} onClick={() => setCurrentStep(index)}>
              <img src={index === currentStep ? step.active : step.icon} alt="step" />
            </div>
            <span className={index === currentStep ? styles.active : ''}>{step.text}</span>
          </div>
        )
      }
    </div>
  )
}

export default AdminStepBar