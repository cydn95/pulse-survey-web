import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames'
import styles from './styles.scss'
import Individual from 'Assets/img/admin/individual-can-be-identified.svg'
import Commenter from 'Assets/img/admin/commenter-can-be-identified.svg'

const defaultResponses = [
  {
    text: 'Effective leadership includes exhibiting a strong character. Leaders exhibit honesty, integrity, trustworthiness, and ethics.',
    flaggedBy: 'Joe Bloggs',
    date: '01-Jan-2021',
    flagType: 0,
    status: 'Hidden'
  },
  {
    text: 'Satisfied, no problems ahead.',
    flaggedBy: 'Joe Bloggs',
    date: '01-Jan-2021',
    flagType: 1,
    status: 'Hidden'
  }
]

const flagTypes = [
  {
    text: 'Individual can be identified',
    avatar: Individual
  },
  {
    text: 'Commenter can be identified',
    avatar: Commenter
  }
]

const FlaggedResponses = ({ project }) => {
  const [responses, setResponses] = useState(Object.keys(project).length && defaultResponses)
  return (
    <Fragment>
      <div className={styles.tags}>
        <span className={classnames(styles.col_1, styles.tag)}><FontAwesomeIcon size="lg" icon={faEye} color="rgb(180,180,180)" />SELECT TO MAKE FLAGGED REPONSE VISIBLE</span>
        <span className={classnames(styles.col_2, styles.tag)}>FLAGGED BY</span>
        <span className={classnames(styles.col_3, styles.tag)}>DATE</span>
        <span className={classnames(styles.col_4, styles.tag)}>FLAG TYPE</span>
        <span className={classnames(styles.col_5, styles.tag)}>STATUS</span>
      </div>
      {responses ? responses.map((response, idx) =>
        <div key={`${idx}-${response.flaggedBy}`} className={styles.response}>
          <div className={styles.col_1}>
            <span
              onClick={() => {
                let temp = [...responses];
                temp[idx].status = temp[idx].status === 'Visible' ? 'Hidden' : 'Visible';
                setResponses(temp)
              }}
              className={classnames(styles.check, styles[response.status.toLowerCase()])}>
              <FontAwesomeIcon icon={faCheck} color="white" />
            </span>
            <div className={styles.data}>
              <span className={styles.bgText}>{response.text}</span>
              <span className={styles.tag}>FLAGGED BY</span>
              <span className={styles.smText}>{response.flaggedBy}</span>
              <span className={styles.tag}>DATE</span>
              <span className={styles.smText}>{response.date}</span>
              <span className={styles.tag}>FLAG TYPE</span>
              <span className={styles.smText}><img src={flagTypes[response.flagType].avatar} alt="avatar" />{flagTypes[response.flagType].text}</span>
              <span className={styles.tag}>STATUS</span>
              <span className={styles.smText}><div className={styles[response.status.toLowerCase()]}></div>{response.status}</span>
            </div>
          </div>
          <span className={classnames(styles.col_2, styles.smText)}>
            {response.flaggedBy}
          </span>
          <span className={classnames(styles.col_3, styles.smText)}>{response.date}</span>
          <span className={classnames(styles.col_4, styles.smText)}>
            <img src={flagTypes[response.flagType].avatar} alt="avatar" />
            {flagTypes[response.flagType].text}
          </span>
          <span className={classnames(styles.col_5, styles.smText)}><div className={styles[response.status.toLowerCase()]}></div>{response.status}</span>
        </div>
      ) : <h3>No Response</h3>}
    </Fragment>
  )
}

export default FlaggedResponses;