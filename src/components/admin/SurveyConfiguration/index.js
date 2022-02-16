import React, { useState, Fragment, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { shgroupList, skipQuestionList, adminSetQuestionListByField, adminSetQuestionList, } from 'Redux/actions'
import classnames from 'classnames'
import Select from 'Components/Select'
import Loading from 'Components/Loading'
import { faTimes, faCog, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReorderModal from '../ProjectConfiguration/ReorderModal'
import Question from './Question'
import {
  DetailModal,
  ModalWrapper,
  ModalHeader,
} from '../UserAdministration/UserCard/usercard.styles'
import AddButton from 'Components/AddButton'
import styles from './styles.scss'
import AboutOthers from 'Assets/img/admin/AboutOthers.svg'
import AboutMe from 'Assets/img/admin/AboutMe.svg'
import Reorder from 'Assets/img/admin/reorder.png'

const SurveyConfiguration = ({
  currentProject,
  amQuestionList,
  aoQuestionList,
  loading,
  getShGroupList,
  getSkipQuestionList,
  setQuestionByField,
  setQuestionList,
  surveyId
}) => {
  let temp = [];
  const [qChanged, setQChanged] = useState(false)
  const [questions, setQuestions] = useState([])
  const [filter, setFilter] = useState('About Me')
  const [drivers, setDrivers] = useState((currentProject.driverList || []).map(d => d.driverName))
  const [currentDriver, setCurrentDriver] = useState((currentProject.driverList || []).map(d => d.driverName)[0])
  const [open, setOpen] = useState(false)
  // const [addNew, setAddNew] = useState(false)
  // const [newQuestion, setNewQuestion] = useState({})
  const [reorderModal, setReorderModal] = useState(false)

  useEffect(() => {
    getSkipQuestionList();
    getShGroupList(surveyId);
  }, [surveyId])

  useEffect(() => {
    let tempQuestion
    if (filter === 'About Me') {
      tempQuestion = (amQuestionList.filter(q => q.driver))
    } else {
      tempQuestion = (aoQuestionList.filter(q => q.driver))
    }
    temp = []
    if (Object.keys(currentProject).length > 0 && tempQuestion.length > 0) {
      tempQuestion.map(question => {
        if (question.driver) {
          if (!temp.includes(question.driver.driverName)) {
            temp.push(question.driver.driverName)
          }
        }
      })
    }
    // setDrivers(temp)
    // setCurrentDriver(temp[0])
    setQuestions(tempQuestion)
    setQChanged(!qChanged)
  }, [amQuestionList, aoQuestionList, filter])

  // const modalContent = () => <div>
  //   <div>
  //     <span>Question Text</span>
  //     <Input
  //       value={newQuestion.questionText}
  //       onChange={(value) => {
  //         return {
  //           ...newQuestion,
  //           questionText: value
  //         }
  //       }}
  //     />
  //   </div>
  //   <div>
  //     <span>Driver</span>
  //     <Select
  //       selected={(newQuestion.driver || {}).driverName}
  //       setSelected={(value) => {
  //         return {
  //           ...newQuestion,
  //           questionText: value
  //         }
  //       }}
  //     />
  //   </div>
  //   <div>
  //     <span>Subdriver</span>
  //     <Input
  //       value={newQuestion.subdriver}
  //       onChange={(value) => {
  //         return {
  //           ...newQuestion,
  //           questionText: value
  //         }
  //       }}
  //     />
  //   </div>
  //   <div>
  //     <span>Control Type</span>
  //     <Select
  //       selected={(newQuestion.driver || {}).driverName}
  //       setSelected={(value) => {
  //         return {
  //           ...newQuestion,
  //           questionText: value
  //         }
  //       }}
  //     />
  //   </div>
  // </div>

  return (
    <Fragment>
      {loading ? <Loading description="" /> :
        <Fragment>
          <div className={styles.header}>
            <h2>Questions</h2>
            <div className={styles.rightPart}>
              <AddButton
                text="question"
                outlined={true}
                className={styles.alignRight}
                setOpen={() => {
                  setQuestionList(filter, {
                    "id": 4901,
                    "subdriver": "",
                    "questionText": "",
                    "sliderTextLeft": "",
                    "sliderTextRight": "",
                    "skipOptionYN": true,
                    "topicPrompt": "",
                    "commentPrompt": "",
                    "survey": null,
                    "driver": currentProject.driverList.filter(d => d.driverName === currentDriver)[0],
                    "controlType": null,
                    "shGroup": [],
                    "option": [],
                    "skipOption": [],
                  })
                }}
              // open={addNew}
              // setOpen={() => setAddNew(true)}
              // setClose={() => setAddNew(false)}
              // handleAdd={() => {
              //   setAddNew(false)
              // }}
              // content={modalContent}
              />
              <div className={styles.actions} onClick={() => setReorderModal(true)}>
                <span className={styles.image}><img src={Reorder} alt="reorder" /></span>
                <span className={styles.text}>Reorder</span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.filters}>
              <div className={classnames(styles.filter, filter === 'About Me' && styles.active)} onClick={() => {setFilter('About Me'); setCurrentDriver((currentProject.driverList || []).map(d => d.driverName)[0])}}>
                <img className={styles.icon} src={AboutMe} alt="About me" />
                <span>About Me</span>
              </div>
              <div className={classnames(styles.filter, filter === 'About Others' && styles.active)} onClick={() => {setFilter('About Others'); setCurrentDriver('About Others')}}>
                <img className={styles.icon} src={AboutOthers} alt="About Others" />
                <span>About Others</span>
              </div>
            </div>
          </div>
          <div className={styles.drivers}>
            {drivers.length > 0 ? filter === 'About Me' && drivers.map((driver, idx) =>
              driver !== 'About Others' && <span key={`${idx}-${driver}`} className={driver === currentDriver ? styles.active : ''} onClick={() => setCurrentDriver(driver)}>{driver}</span>
            ) : <h3>No Drivers. Please add drivers on project configuration tab.</h3>}
          </div>
          <div className={styles.filter_for_mobile}>
            <Select className={styles.select} selected={filter} setSelected={(s) => {setFilter(s); setCurrentDriver(s==='About Others'?'About Others':(currentProject.driverList || []).map(d => d.driverName)[0])}} items={['About Me', 'About Others']} />
            {filter === 'About Me' && <span onClick={() => setOpen(true)}>{currentDriver}<FontAwesomeIcon icon={faCog} color="#6d6f94" /></span>}
          </div>
          {questions.length > 0 ? questions.sort((a, b) => a.amqOrder - b.amqOrder).map((question, idx) => {
            if (question.driver && question.driver.driverName !== currentDriver)
              return null;
            return (
              <Question qChanged={qChanged} surveyId={currentProject.id} question={question} index={idx} filter={filter} setQuestionByField={setQuestionByField} setQuestionList={setQuestionList} drivers={drivers} key={`${idx}-${question.controlType}`} />
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
                  driver !== 'About Others' && <span key={`${idx}-${driver}`} className={driver === currentDriver ? styles.active : ''} onClick={() => setCurrentDriver(driver)}>{driver}</span>
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
  const { aoQuestionList, amQuestionList, loading, currentProject, surveyId } = admin;
  return {
    aoQuestionList,
    amQuestionList,
    loading,
    currentProject,
    surveyId,
  }
}

export default connect(mapStateToProps, {
  getShGroupList: shgroupList,
  getSkipQuestionList: skipQuestionList,
  setQuestionByField: adminSetQuestionListByField,
  setQuestionList: adminSetQuestionList,
})(SurveyConfiguration)