import React, { useState } from 'react'
import { connect } from 'react-redux'
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Button from 'Components/Button'
import classnames from 'classnames'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminSetActive } from 'Redux/actions'
import {
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from '../UserAdministration/UserCard/usercard.styles'
import styles from './styles.scss'
import ProjectAvatar from '../../../assets/img/admin/Work.svg'
import Show from '../../../assets/img/admin/Show.svg'
import Calendar from '../../../assets/img/admin/Calendar.svg'
import User from '../../../assets/img/admin/3 User.svg'
import Folder from '../../../assets/img/admin/Folder.svg'
import Heart from '../../../assets/img/admin/Heart.svg'
import Send from '../../../assets/img/admin/Send.svg'

const ProjectCard = ({ project, setEditing, setActive, loading, error }) => {
  const [open, setOpen] = useState(false)
  const [survey, setSurvey] = useState(project)

  const handleActive = () => {
    setActive(survey.id, { isActive: !survey.isActive }, callbackActive)
  }

  const callbackActive = (result) => {
    if (error === '') {
      NotificationManager.success("Response saved successfully", "");
      setSurvey(result)
    } else {
      NotificationManager.error("Something went wrong", "");
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={ProjectAvatar} alt="avatar" />
        </div>
        <div className={styles.description}>
          <h3>{survey.surveyTitle}</h3>
          <h6>{survey.projectManager}</h6>
        </div>
      </div>
      <div className={styles.descriptions}>
        <div className={styles.description}>
          <img src={Show} alt="show" />
          <div className={styles.data}>
            <p className={styles.title}>Total Identified</p>
            <p className={styles.value}>{survey.totalIdentified}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Calendar} alt="Calendar" />
          <div className={styles.data}>
            <p className={styles.title}>Date Created</p>
            <p className={styles.value}>{(() => {
              const date = new Date(survey.createdAt);
              return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`
            })()}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={User} alt="User" />
          <div className={styles.data}>
            <p className={styles.title}>Team Members</p>
            <p className={styles.value}>{survey.teamMembers}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={ProjectAvatar} alt="Work" />
          <div className={styles.data}>
            <p className={styles.title}>Stakeholders</p>
            <p className={styles.value}>{survey.stakeholders}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Send} alt="Send" />
          <div className={styles.data}>
            <p className={styles.title}>Total Invited</p>
            <p className={styles.value}>{`${survey.totalInvited} (${(survey.totalInvited * 100 / survey.totalIdentified).toFixed()}%)`}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Folder} alt="Folder" />
          <div className={styles.data}>
            <p className={styles.title}>Seats Available</p>
            <p className={styles.value}>{survey.seatsAvailable}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Heart} alt="Heart" />
          <div className={styles.data}>
            <p className={styles.title}>Overall Sentiment</p>
            <p className={styles.value}>{survey.overallSentiment}</p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button className={styles.edit} onClick={(e) => setEditing(survey.id)}>Edit project</Button>
        <Button className={classnames(survey.isActive && styles.deactivate, styles.btn)} onClick={(e) => setOpen(true)}>{survey.isActive ? "Deactivate" : "Activate"}</Button>
      </div>
      {open && <ModalWrapper onClick={() => setOpen(false)}>
        <div className={styles.modalBody}>
          <ModalHeader className={styles.header}>
            <h2>Confirm</h2>
            <span onClick={() => setOpen(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <p className={styles.content}>Do you really want to deactivate this project?</p>
          <ModalFooter className={styles.footer}>
            <span onClick={() => setOpen(false)}>Cancel</span>
            <Button className="btn" onClick={handleActive}>OK</Button>
          </ModalFooter>
        </div>
      </ModalWrapper>}
      <NotificationContainer />
    </div>
  )
}

const mapStateToProps = ({ admin }) => {
  const { error, loading } = admin;
  return {
    error,
    loading,
  }
}

export default connect(mapStateToProps, {
  setActive: adminSetActive
})(ProjectCard)