import React, { useState, useEffect } from 'react'
import Button from 'Components/Button'
import {
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from '../UserAdministration/UserCard/usercard.styles'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './styles.scss'
import ProjectAvatar from '../../../assets/img/admin/Work.svg'
import Show from '../../../assets/img/admin/Show.svg'
import Calendar from '../../../assets/img/admin/Calendar.svg'
import User from '../../../assets/img/admin/3 User.svg'
import Folder from '../../../assets/img/admin/Folder.svg'
import Heart from '../../../assets/img/admin/Heart.svg'
import Send from '../../../assets/img/admin/Send.svg'

const ProjectCard = ({ project, setEditing }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={ProjectAvatar} alt="avatar" />
        </div>
        <div className={styles.description}>
          <h3>{project.name}</h3>
          <h6>{project.manager}</h6>
        </div>
      </div>
      <div className={styles.descriptions}>
        <div className={styles.description}>
          <img src={Show} alt="show" />
          <div className={styles.data}>
            <p className={styles.title}>Total Identified</p>
            <p className={styles.value}>{project.totalIdentified}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Calendar} alt="Calendar" />
          <div className={styles.data}>
            <p className={styles.title}>Date Created</p>
            <p className={styles.value}>{project.createdAt}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={User} alt="User" />
          <div className={styles.data}>
            <p className={styles.title}>Team Members</p>
            <p className={styles.value}>{project.memberCount}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={ProjectAvatar} alt="Work" />
          <div className={styles.data}>
            <p className={styles.title}>Stakeholders</p>
            <p className={styles.value}>{project.stakeholderCount}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Send} alt="Send" />
          <div className={styles.data}>
            <p className={styles.title}>Total Invited</p>
            <p className={styles.value}>{`${project.invitedCount} (${project.invitedPercent}%)`}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Folder} alt="Folder" />
          <div className={styles.data}>
            <p className={styles.title}>Seats Available</p>
            <p className={styles.value}>{project.availableSeatCount}</p>
          </div>
        </div>
        <div className={styles.description}>
          <img src={Heart} alt="Heart" />
          <div className={styles.data}>
            <p className={styles.title}>Overall Sentiment</p>
            <p className={styles.value}>{project.overallSentiment}</p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button className={styles.edit} onClick={(e) => setEditing(project.id)}>Edit project</Button>
        <Button className={styles.deactivate} onClick={(e) => setOpen(true)}>Deactivate</Button>
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
            <Button className="btn">OK</Button>
          </ModalFooter>
        </div>
      </ModalWrapper>}
    </div>
  )
}

export default ProjectCard