import React, { Fragment, useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames'
import Loading from 'Components/Loading'
import styles from './styles.scss'
import {
  flaggedResponseList,
  setVisible
} from 'Redux/actions'

const defaultResponses = [
  {
    text: 'Effective leadership includes exhibiting a strong character. Leaders exhibit honesty, integrity, trustworthiness, and ethics.',
    flaggedBy: 'Joe Bloggs',
    updated_at: '2021-11-25T17:32:31.517466+08:00',
    flagStatus: 1,
    status: 'Hidden'
  },
  {
    text: 'Satisfied, no problems ahead.',
    flaggedBy: 'Joe Bloggs',
    updated_at: '2021-11-25T17:32:31.517466+08:00',
    flagStatus: 4,
    status: 'Hidden'
  }
]

const flag = {
  1: {
    img: "/assets/img/admin/individual-can-be-identified.svg",
    title: "Individual can be identified",
  },
  2: {
    img: "/assets/img/admin/commenter-can-be-identified.svg",
    title: "Commenter can be identified",
  },
  3: { img: "/assets/img/admin/flag-non-constructive-dark.png", title: "Non-Constructive Feedback" },
  4: { img: "/assets/img/admin/flag-out-of-policy-dark.png", title: "Out of Policy" },
  5: { img: "/assets/img/admin/flag-aggressive-dark.png", title: "Aggressive or Hostile" },
};

const FlaggedResponses = ({ project, surveyId, flaggedResponseList, setVisible, flaggedResponses }) => {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    flaggedResponseList(surveyId, callback)
  }, [surveyId])

  const callback = (data) => {
    // console.log(data)
    setLoading(false)
    setResponses(data)
  }
  return (
    <Fragment>
      <div className={styles.tags}>
        <span className={classnames(styles.col_1, styles.tag)}><FontAwesomeIcon size="lg" icon={faEye} color="rgb(180,180,180)" />FLAGGED RESPONSE</span>
        <span className={classnames(styles.col_2, styles.tag)}>CURRENT RESPONSE</span>
        <span className={classnames(styles.col_3, styles.tag)}>FLAGGED BY</span>
        <span className={classnames(styles.col_4, styles.tag)}>DATE</span>
        <span className={classnames(styles.col_5, styles.tag)}>FLAG TYPE</span>
        <span className={classnames(styles.col_6, styles.tag)}>STATUS</span>
      </div>
      {loading ? 
        <Loading description="" /> : 
        (responses && responses.length > 0) ? responses.map((response, idx) =>
          <div key={`${idx}-flagged-response`} className={styles.response}>
            <div className={styles.col_1}>
              <span
                onClick={() => setVisible(response.id)}
                className={classnames(styles.check, styles[`${flaggedResponses.includes(response.id) ? 'visible' : 'hidden' }`])}>
                <FontAwesomeIcon icon={faCheck} color="white" />
              </span>
              <div className={styles.data}>
                <span className={styles.bgText} style={{paddingRight: '10px'}}>{((response.orgAmResponse || {}).topicValue || response.amResponse.topicValue)}</span>
                <span className={styles.tag}>CURRENT RESPONSE</span>
                <span className={styles.bgText}>{((response.orgAmResponse || {}).topicValue === response.amResponse.topicValue || !(response.orgAmResponse || {}).topicValue) ? '' : response.amResponse.topicValue}</span>
                <span className={styles.tag}>FLAGGED BY</span>
                <span className={styles.smText}>{response.projectUser.user.first_name} {response.projectUser.user.last_name}</span>
                <span className={styles.tag}>DATE</span>
                <span className={styles.smText}>{response.updated_at}</span>
                <span className={styles.tag}>FLAG TYPE</span>
                <span className={styles.smText} style={{paddingRight: '10px'}}><img src={flag[response.flagStatus].img} alt="avatar" />{flag[response.flagStatus].title}</span>
                <span className={styles.tag}>STATUS</span>
                <span className={styles.smText}><div className={styles[`${flaggedResponses.includes(response.id) ? 'visible' : 'hidden' }`]}></div>{flaggedResponses.includes(response.id) ? 'Visible' : 'Hidden'}</span>
              </div>
            </div>
            <span className={classnames(styles.col_2, styles.bgText)}>
              {((response.orgAmResponse || {}).topicValue === response.amResponse.topicValue || !(response.orgAmResponse || {}).topicValue) ? '' : response.amResponse.topicValue}
            </span>
            <span className={classnames(styles.col_3, styles.smText)}>
              {response.projectUser.user.first_name} {response.projectUser.user.last_name}
            </span>
            <span className={classnames(styles.col_4, styles.smText)}>{(new Date(response.updated_at).toLocaleString('default', { month: 'short' })) + "-" + new Date(response.updated_at).getDate()  + "-" + new Date(response.updated_at).getFullYear()}</span>
            <span className={classnames(styles.col_5, styles.smText)} style={{paddingRight: '10px'}}>
              <img src={flag[response.flagStatus].img} alt="avatar" style={{width: '18px', height: '17px'}} />
              {flag[response.flagStatus].title}
            </span>
            <span className={classnames(styles.col_6, styles.smText)}><div className={styles[`${flaggedResponses.includes(response.id) ? 'visible' : 'hidden' }`]}></div>{flaggedResponses.includes(response.id) ? 'Visible' : 'Hidden'}</span>
          </div>
        ) : <h4 style={{padding: '0px 21px'}}>No Flagged Response</h4>
      }
    </Fragment>
  )
}

const mapStateToProps = ({admin}) => {
  const { surveyId, flaggedResponses } = admin
  return {
    surveyId,
    flaggedResponses,
  }
}

export default connect(mapStateToProps, {
  flaggedResponseList,
  setVisible
})(FlaggedResponses);