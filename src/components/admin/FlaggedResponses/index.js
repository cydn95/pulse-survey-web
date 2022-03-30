import React, { Fragment, useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames'
import Loading from 'Components/Loading'
import styles from './styles.scss'
import {
  flaggedResponseList
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

const FlaggedResponses = ({ project, surveyId, flaggedResponseList }) => {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState([])
  useEffect(() => {
    setLoading(true)
    flaggedResponseList(surveyId, callback)
  }, [surveyId])

  const callback = (data) => {
    console.log(data)
    setLoading(false)
    setResponses(data)
  }
  return (
    <Fragment>
      <div className={styles.tags}>
        <span className={classnames(styles.col_1, styles.tag)}><FontAwesomeIcon size="lg" icon={faEye} color="rgb(180,180,180)" />SELECT TO MAKE FLAGGED REPONSE VISIBLE</span>
        <span className={classnames(styles.col_2, styles.tag)}>FLAGGED BY</span>
        <span className={classnames(styles.col_3, styles.tag)}>DATE</span>
        <span className={classnames(styles.col_4, styles.tag)}>FLAG TYPE</span>
        <span className={classnames(styles.col_5, styles.tag)}>STATUS</span>
      </div>
      {loading ? 
        <Loading description="" /> : 
        responses ? responses.map((response, idx) =>
          <div key={`${idx}-flagged-response`} className={styles.response}>
            <div className={styles.col_1}>
              <span
                onClick={() => {
                  let temp = [...visible];
                  if (!visible.includes(response.id)) {
                    temp.push(response.id)
                  } else {
                    temp = temp.filter(id => id !== response.id)
                  }
                  setVisible(temp)
                }}
                className={classnames(styles.check, styles[`${visible.includes(response.id) ? 'visible' : 'hidden' }`])}>
                <FontAwesomeIcon icon={faCheck} color="white" />
              </span>
              <div className={styles.data}>
                <span className={styles.bgText} style={{paddingRight: '10px'}}>{response.amResponse.topicValue}</span>
                <span className={styles.tag}>FLAGGED BY</span>
                <span className={styles.smText}>{response.flaggedBy}</span>
                <span className={styles.tag}>DATE</span>
                <span className={styles.smText}>{response.updated_at}</span>
                <span className={styles.tag}>FLAG TYPE</span>
                <span className={styles.smText} style={{paddingRight: '10px'}}><img src={flag[response.flagStatus].img} alt="avatar" />{flag[response.flagStatus].title}</span>
                <span className={styles.tag}>STATUS</span>
                <span className={styles.smText}><div className={styles[`${visible.includes(response.id) ? 'visible' : 'hidden' }`]}></div>{visible.includes(response.id) ? 'Visible' : 'Hidden'}</span>
              </div>
            </div>
            <span className={classnames(styles.col_2, styles.smText)}>
              {response.projectUser.user.first_name} {response.projectUser.user.last_name}
            </span>
            <span className={classnames(styles.col_3, styles.smText)}>{(new Date(response.updated_at).toLocaleString('default', { month: 'short' })) + "-" + new Date(response.updated_at).getDate()  + "-" + new Date(response.updated_at).getFullYear()}</span>
            <span className={classnames(styles.col_4, styles.smText)} style={{paddingRight: '10px'}}>
              <img src={flag[response.flagStatus].img} alt="avatar" style={{width: '18px', height: '17px'}} />
              {flag[response.flagStatus].title}
            </span>
            <span className={classnames(styles.col_5, styles.smText)}><div className={styles[`${visible.includes(response.id) ? 'visible' : 'hidden' }`]}></div>{visible.includes(response.id) ? 'Visible' : 'Hidden'}</span>
          </div>
        ) : <h3>No Response</h3>
      }
    </Fragment>
  )
}

const mapStateToProps = ({admin}) => {
  const { surveyId } = admin
  return {
    surveyId,
  }
}

export default connect(mapStateToProps, {
  flaggedResponseList
})(FlaggedResponses);