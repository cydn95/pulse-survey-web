import React, { useState, Fragment, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { shgroupList, skipQuestionList } from 'Redux/actions'
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

const SurveyConfiguration = ({ currentProject, amQuestionList, aoQuestionList, loading, getShGroupList, getSkipQuestionList }) => {
  let temp = [];
  const [questions, setQuestions] = useState([])
  const [filter, setFilter] = useState('About Me')
  const [drivers, setDrivers] = useState(temp)
  const [currentDriver, setCurrentDriver] = useState(temp[0])
  const [open, setOpen] = useState(false)
  const [reorderModal, setReorderModal] = useState(false)

  useEffect(() => {
    getSkipQuestionList();
    getShGroupList(currentProject.surveyId);
  }, [currentProject.surveyId])

  useEffect(() => {
    let tempQuestion
    if (filter === 'About Me') {
      tempQuestion = (amQuestionList.filter(q => q.driver))
    } else {
      tempQuestion = (aoQuestionList.filter(q => q.driver))
    }
    temp = []
    if (Object.keys(currentProject).length > 0 && tempQuestion.length > 0) {
      console.log('tempQ', tempQuestion)
      tempQuestion.map(question => {
        if (question.driver) {
          if (!temp.includes(question.driver.driverName)) {
            temp.push(question.driver.driverName)
          }
        }
      })
    }
    setDrivers(temp)
    setCurrentDriver(temp[0])
    setQuestions(tempQuestion)
  }, [amQuestionList, aoQuestionList, filter])
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
          {questions.length > 0 ? questions.map((question, idx) => {
            console.log('question', question)
            console.log('currentDriver', currentDriver)
            if (question.driver && question.driver.driverName !== currentDriver)
              return null;
            return (
              <Question surveyId={currentProject.id} question={question} drivers={drivers} key={`${idx}-${question.controlType}`} />
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
          {reorderModal && <ReorderModal onClose={() => setReorderModal(false)} items={questions.filter(q => q.driver && q.driver.driverName === currentDriver)} setItems={(data) => { let temp = questions.filter(q => !q.driver || (q.driver && q.driver.driverName !== currentDriver)); setQuestions([...temp, ...data]) }} />}
        </Fragment>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { aoQuestionList, amQuestionList, loading, currentProject } = admin;
  return {
    aoQuestionList,
    amQuestionList,
    loading,
    currentProject,
  }
}

export default connect(mapStateToProps, {
  getShGroupList: shgroupList,
  getSkipQuestionList: skipQuestionList,
})(SurveyConfiguration)