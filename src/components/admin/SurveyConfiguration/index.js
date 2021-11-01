import React, { useState, Fragment, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Select from 'Components/Select'
import Loading from 'Components/Loading'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReorderModal from '../ProjectConfiguration/ReorderModal'
import Question from './Question'
import {
  DetailModal,
  ModalWrapper,
  ModalHeader,
} from '../UserAdministration/UserCard/usercard.styles'
import styles from './styles.scss'
import AboutOthers from 'Assets/img/admin/AboutOthers.svg'
import AboutMe from 'Assets/img/admin/AboutMe.svg'
import Setting from 'Assets/img/admin/Setting_filled.png'
import Reorder from '../../../assets/img/admin/reorder.png'

const defaultQuestions = [
  {
    id: 1,
    text: "Does the team have enough experience to succeed?",
    controlType: 'Slider',
    driver: 'Sentiment',
    subDriver: 'Experience',
    SHGroup: ['Internal', 'Other'],
    sliderLeft: 'Not at all',
    sliderRight: 'Absolutely',
    commentPrompt: 'Add a comment to describe why you feel that way.',
    skipOptions: ["I don't know", "I'm afraid to say", "I don't understand"]
  },
  {
    id: 2,
    text: "Do you feel like management is supporting the project team?",
    controlType: 'Multi Options',
    driver: 'Support',
    subDriver: 'Experience',
    SHGroup: ['Other'],
    commentPrompt: 'Add a comment to describe why you feel that way.',
    options: ["Excellent", "Vey Good", "Good", "Fair", "Poor"],
    skipOptions: ["I don't know", "I'm afraid to say", "I don't understand"]
  },
  {
    id: 3,
    text: "Do you feel like orgaisational politics is getting the way?",
    controlType: 'Two Options',
    driver: 'Politics',
    subDriver: 'Experience',
    SHGroup: ['External', 'Other'],
    options: ['Option1', 'Option2'],
    commentPrompt: 'Add a comment to describe why you feel that way.',
    skipOptions: ["I don't know", "I'm afraid to say", "I don't understand"]
  },
  {
    id: 4,
    text: "What do you see as the main risks to the project?",
    controlType: 'Multi-Topic',
    driver: 'Politics',
    subDriver: 'Experience',
    SHGroup: ['Internal', 'External', 'Other'],
    topics: [],
    commentPrompt: 'Add a comment to describe why you feel that way.',
    skipOptions: ["I don't know", "I'm afraid to say", "I don't understand"]
  }
]

const SurveyConfiguration = ({ project, amQuestionList, aoQuestionList, loading }) => {
  const temp = [];
  const [questions, setQuestions] = useState([])
  const [filter, setFilter] = useState('About Me')
  const [drivers, setDrivers] = useState(temp)
  const [currentDriver, setCurrentDriver] = useState(temp[0])
  const [open, setOpen] = useState(false)
  const [reorderModal, setReorderModal] = useState(false)

  useMemo(() => {
    if (Object.keys(project).length) {
      questions.map(question => {
        if (!temp.includes(question.driver.driverName)) {
          temp.push(question.driver.driverName)
        }
      })
    }
    console.log('temp', temp)
    setDrivers(temp)
    setCurrentDriver(temp[0])
  }, [questions])

  useEffect(() => {
    if (filter === 'About Me') {
      setQuestions(amQuestionList)
    } else {
      setQuestions(aoQuestionList)
    }
  }, [amQuestionList, aoQuestionList])
  return (
    <Fragment>
      {loading ? <Loading description="" /> :
        <Fragment>
          <div className={styles.header}>
            <h2>Questions</h2>
            <div className={styles.rightPart}>
              <div>
                <span className={styles.image}>+</span>
                <span className={styles.text}>Add question</span>
              </div>
              <div onClick={() => setReorderModal(true)}>
                <span className={styles.image}><img src={Reorder} alt="reorder" /></span>
                <span className={styles.text}>Reorder</span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.filters}>
              <div className={classnames(styles.filter, filter === 'About Me' && styles.active)} onClick={() => setFilter('About Me')}>
                <img className={styles.icon} src={AboutMe} alt="About me" />
                <span>About Me</span>
              </div>
              <div className={classnames(styles.filter, filter === 'About Others' && styles.active)} onClick={() => setFilter('About Others')}>
                <img className={styles.icon} src={AboutMe} alt="About Others" />
                <span>About Others</span>
              </div>
            </div>
          </div>
          <div className={styles.drivers}>
            {drivers.map((driver, idx) =>
              <span key={`${idx}-${driver}`} className={driver === currentDriver ? styles.active : ''} onClick={() => setCurrentDriver(driver)}>{driver}</span>
            )}
          </div>
          <div className={styles.filter_for_mobile}>
            <Select className={styles.select} selected={filter} setSelected={setFilter} items={['About Me', 'About Others']} />
            <span onClick={() => setOpen(true)}>{currentDriver}<img src={Setting} alt="drivers" /></span>
          </div>
          {questions ? questions.map((question, idx) => {
            if (question.driver !== currentDriver)
              return null;
            return (
              <Question question={question} key={`${idx}-${question.controlType}`} />
            )
          }) : <h3>No Question</h3>}
          {open && <ModalWrapper onClick={() => setOpen(false)}>
            <DetailModal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>Filter</h2>
                <span onClick={() => setOpen(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
              </ModalHeader>
              <div className={styles.drivers_for_mobile}>
                {drivers.map((driver, idx) =>
                  <span key={`${idx}-${driver}`} className={driver === currentDriver ? styles.active : ''} onClick={() => setCurrentDriver(driver)}>{driver}</span>
                )}
              </div>
            </DetailModal>
          </ModalWrapper>}
          {reorderModal && <ReorderModal onClose={() => setReorderModal(false)} items={questions.filter(q => q.driver === currentDriver)} setItems={(data) => { let temp = questions.filter(q => q.driver !== currentDriver); setQuestions([...temp, ...data]) }} />}
        </Fragment>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { aoQuestionList, amQuestionList, loading } = admin;
  return {
    aoQuestionList,
    amQuestionList,
    loading,
  }
}

export default connect(mapStateToProps, null)(SurveyConfiguration)