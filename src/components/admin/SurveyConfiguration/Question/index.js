import React, { useState, useRef, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import classnames from 'classnames'
import { getColorFromValue } from "Util/Utils";
import { controlType, controlTypeTag, controlTypeByTag } from 'Constants/defaultValues'
import Select from 'Components/Select'
import Input from 'Components/Input'
import Button from 'Components/Button'
import AddButton from 'Components/AddButton'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { adminDeleteQuestion } from 'Redux/actions'
import {
  DetailModal,
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from '../../UserAdministration/UserCard/usercard.styles'
import styles from './styles.scss'
import QMark from 'Assets/img/admin/QMark.svg'
import DeleteIcon from 'Assets/img/admin/delete.svg'

const Tag = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 12px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : '4px'};
  font-family: Poppins;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: normal;
  text-align: center;
  color: ${props => `${props.color}`};
  background-color: ${props => `${props.color}50`};
`

const Question = ({
  question,
  skipQuestionList,
  drivers,
  setQuestionByField,
  filter,
  driverList,
  setQuestionList,
  deleteQuestion,
  currentProject,
  qChanged,
}) => {
  const headerRef = useRef(null)
  const spanRef = useRef(null)
  const subRef = useRef(null)
  const [detailed, setDetailed] = useState(false)
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState()
  const [open, setOpen] = useState(false)
  const [addTag, setAddTag] = useState(false)
  const [newTag, setNewTag] = useState()
  const [subDriver, setSubDriver] = useState(question.subdriver)
  const [newSkip, setNewSkip] = useState({})
  const [addOption, setAddOption] = useState(false)
  const [newOption, setNewOption] = useState()

  const modalContent = () => <div>
    <Select
      items={skipQuestionList.filter(q => !question.skipOption.includes(q)).map(q => q.optionName)}
      selected={(newSkip || {}).optionName}
      setSelected={(value) => setNewSkip(skipQuestionList.filter(q => q.optionName === value)[0])}
      className={styles.skipSelect}
    />
  </div>

  const addOptionModal = () => <div>
    <Input
      value={newOption}
      onChange={(value, e) => setNewOption(value)}
      className={styles.newOption}
    />
  </div>

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth)
    setSubDriver(question.subdriver)
  }, [question.questionText, question.subdriver])

  return (
    <div className={styles.wrapper}>
      <div className={styles.basic} onClick={() => setDetailed(!detailed)}>
        <div className={styles.data}>
          <span className={styles.qmark}><img src={QMark} alt="QMark" /></span>
          <span className={styles.header_mobile}>{question.questionText}</span>
          <div>
            <div className={styles.headerPart}>
              <span className={styles.hide} ref={spanRef}>{question.questionText}</span>
              <Input
                refVal={headerRef}
                value={question.questionText}
                onBlur={() => setEdit(false)}
                onChange={
                  (value, e) => {
                    setQuestionByField(filter, question.id, 'questionText', value); setWidth(spanRef.current.offsetWidth + 10)
                  }}
                className={styles.header}
                style={{ width }}
              />
              {!edit && <span onClick={(e) => { e.stopPropagation(); headerRef.current.focus(); setEdit(true); }} style={{ cursor: 'pointer' }}>Edit</span>}
            </div>
            <div className={styles.function_for_mobile}>
              <span className={styles.label}>Control Type:</span>
              <Select selected={controlTypeTag(question.controlType)} setSelected={(value) => setQuestionByField(filter, question.id, 'controlType', controlTypeByTag(value))} items={Object.keys(controlType).map(type => controlTypeTag(controlType[type]))} className={styles.controlType} />
              <span 
                className={styles.delete} 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(filter, question.questionText, question.id)
                }}>
                  <img src={DeleteIcon} alt="delete" />
                </span>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <span className={styles.label}>Driver:</span>
                <Select
                  selected={(question.driver || {}).driverName}
                  setSelected={(value) =>
                    setQuestionByField(
                      filter,
                      question.id,
                      'driver',
                      drivers.filter(d => d.driverName === value)[0]
                    )}
                  items={drivers}
                />
              </div>
              <div className={styles.input}>
                <span className={classnames(styles.label, styles.subdriver)}>Subdriver:</span>
                <Input
                  refVal={subRef}
                  className={styles.sub}
                  value={question.subdriver}
                  onChange={(value, e) => {
                    setQuestionByField(filter, question.id, 'subdriver', value);
                    setSubDriver(value)
                  }}
                />
              </div>
              <div className={classnames(styles.shGroups, styles.input)}>
                <span className={styles.label}>SH Group:</span>
                {question.shGroup.sort().map((sh, idx) =>
                  <Tag
                    color={getColorFromValue((sh + 4) % 5 + 5)}
                    key={`${idx}-${sh}`}
                    text={(currentProject.shGroup.filter(s => s.id === sh)[0] || {}).SHGroupName}
                  >
                    {(currentProject.shGroup.filter(s => s.id === sh)[0] || {}).SHGroupName}
                    <FontAwesomeIcon
                      style={{ cursor: 'pointer' }}
                      icon={faTimes}
                      color={getColorFromValue((sh + 4) % 5 + 5)}
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuestionByField(filter, question.id, 'shGroup', question.shGroup.filter((sh, i) => i !== idx))
                      }}
                    />
                  </Tag>
                )}
                {currentProject.shGroup.length > question.shGroup.length && <Tag
                  color={getColorFromValue((question.shGroup.length + 4) % 5 + 5)}
                  key={`plus`}
                  borderRadius={'100%'}
                >
                  <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    icon={faPlus}
                    color={getColorFromValue((question.shGroup.length + 4) % 5 + 5)}
                    onClick={(e) => {
                      console.log('add')
                      e.stopPropagation();
                      setAddTag(true);
                    }}
                  />
                </Tag>}
              </div>
              <Button onClick={() => setDetailed(true)} className={styles.viewDetails}>View Details</Button>
            </div>
          </div>
        </div>
        <div className={styles.function}>
          <span className={styles.label}>Control Type:</span>
          <Select
            selected={controlTypeTag(question.controlType)}
            setSelected={(value) =>
              setQuestionByField(
                filter,
                question.id,
                'controlType',
                controlTypeByTag[value]
              )}
            items={Object.keys(controlType).
              map(type =>
                controlTypeTag(controlType[type])
              )}
            className={styles.controlType}
          />
          <span
            className={styles.delete}
            onClick={(e) => {
              e.stopPropagation();
              deleteQuestion(filter, question.questionText, question.id)
            }}>
            <img src={DeleteIcon} alt="delete" />
          </span>
          <span className={classnames(styles.toggle, detailed && styles.active)}>{`>`}</span>
        </div>
      </div>
      {detailed && <div className={styles.others}>
        <div className={styles.slider}>
          {controlTypeTag(question.controlType) === 'Slider' && <Fragment>
            <div className={styles.left}>
              <label>Slider Left (Red)</label>
              <Input
                value={question.sliderTextLeft}
                onChange={(value, e) =>
                  setQuestionByField(
                    filter,
                    question.id,
                    'sliderTextLeft',
                    value
                  )}
                className={styles.input}
              />
            </div>
            <div className={styles.right}>
              <label>Slider Right (Green)</label>
              <Input
                value={question.sliderTextRight}
                onChange={(value, e) =>
                  setQuestionByField(
                    filter,
                    question.id,
                    'sliderTextRight',
                    value
                  )}
                className={styles.input}
              />
            </div>
          </Fragment>}
          {(controlTypeTag(question.controlType) === 'Two Options'
            || controlTypeTag(question.controlType) === 'Multi Options')
            &&
            <Fragment>
              {question.option.map((option, idx) =>
                <div key={`${idx}-${option}`}>
                  <label>Option {idx + 1}</label>
                  <Input
                    className={styles.input}
                    value={option}
                    onChange={(value, e) => {
                      let temp = [...question.option]
                      temp[idx] = value
                      setQuestionByField(filter, idx, 'option', temp)
                    }}
                  />
                </div>
              )}
              {(controlTypeTag(question.controlType) === 'Multi Options'
                || (controlTypeTag(question.controlType) === "Two Options"
                  && question.option.length < 2)) &&
                <AddButton
                  text="Option"
                  content={addOptionModal}
                  open={addOption}
                  setOpen={() => setAddOption(true)}
                  setClose={() => setAddOption(false)}
                  handleAdd={() => {
                    setQuestionByField(filter, question.id, 'option', [...question.option, newOption])
                    setAddOption(false)
                    setNewOption('')
                  }}
                  style={{ flexBasis: '100%' }}
                />}
            </Fragment>}
          {controlTypeTag(question.controlType) === 'Multi Topics' &&
            <div className={styles.comment}>
              <label>Topic Prompt</label>
              <Input className={styles.input} value={question.topicPrompt} onChange={(value, e) => {
                setQuestionByField(filter, question.id, 'topicPrompt', value)
              }} />
            </div>}
          <div className={styles.comment}>
            <label>Comment Prompt</label>
            <Input
              value={question.commentPrompt}
              onChange={(value, e) =>
                setQuestionByField(filter, question.id, 'commentPrompt', value)
              }
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.skipOptions}>
          <label>Skip Options</label>
          <div className={styles.inputs}>
            {question.skipOption.map((option, idx) =>
              <Input
                value={(skipQuestionList.filter(q => q.id === option)[0] || {}).optionName}
                key={`${idx}-${option}`}
                className={styles.input}
                withClose={idx === question.skipOption.length - 1}
                onClickClose={idx === question.skipOption.length - 1 ? (() => { let temp = [...question.skipOption]; temp.pop(); setQuestionByField(filter, question.id, 'skipOption', temp) }) : null}
                onChange={(value, e) => {
                  let temp = [...question.skipOption]
                  temp[idx] = value;
                  setQuestionByField(filter, question.id, 'skipOption', temp)
                }}
                readOnly="readonly"
              />
            )}
            <AddButton
              text="Skip Option"
              content={modalContent}
              open={open}
              setOpen={() => setOpen(true)}
              setClose={() => setOpen(false)}
              handleAdd={() => {
                setQuestionByField(filter, question.id, 'skipOption', [...question.skipOption, newSkip.id])
                setOpen(false)
                setNewSkip({})
              }}
            />
          </div>
        </div>
      </div>}
      {detailed &&
        <ModalWrapper
          className={styles.modal}
          onClick={() =>
            setDetailed(false)
          }
        >
          <DetailModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{question.questionText}</h2>
              <span onClick={() => setDetailed(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
            </ModalHeader>
            <div className={classnames("editPart", styles.editPart)}>
              {controlTypeTag(question.controlType) === 'Slider' &&
                <Fragment>
                  <div className={styles.left}>
                    <label className="bgTag">Slider Left (Red)</label>
                    <Input value={question.sliderTextLeft} onChange={(value, e) => setQuestionByField(filter, question.id, 'sliderTextLeft', value)} className={styles.input} />
                  </div>
                  <div className={styles.right}>
                    <label className="bgTag">Slider Right (Green)</label>
                    <Input value={question.sliderTextRight} onChange={(value, e) => setQuestionByField(filter, question.id, 'sliderTextRight', value)} className={styles.input} />
                  </div>
                </Fragment>}
              {(controlTypeTag(question.controlType) === 'Two Options'
                || controlTypeTag(question.controlType) === 'Multi Options') &&
                <Fragment>
                  {question.option.map((option, idx) =>
                    <div key={`${idx}-${option}`}>
                      <label>Option {idx + 1}</label>
                      <Input className={styles.input} value={option} onChange={(value, e) => {
                        let temp = [...question.option]
                        temp[idx] = value
                        setQuestionByField(filter, question.id, 'option', temp)
                      }} />
                    </div>
                  )}
                  {controlTypeTag(question.controlType) === 'Multi Options' &&
                    <AddButton
                      text="Option"
                      content={addOptionModal}
                      open={addOption}
                      setOpen={() => setAddOption(true)}
                      setClose={() => setAddOption(false)}
                      handleAdd={() => {
                        setQuestionByField(filter, question.id, 'option', [...question.option, newOption])
                        setAddOption(false)
                        setNewOption('')
                      }}
                      style={{ flexBasis: '100%' }}
                    />
                  }
                </Fragment>}
              {controlTypeTag(question.controlType) === 'Multi Topics' &&
                <div className={styles.comment}>
                  <label className="bgTag">Topic Prompt</label>
                  <textarea
                    row={3}
                    value={question.topicPrompt}
                    onChange={(value, e) =>
                      setQuestionByField(filter, question.id, 'topicPrompt', value)
                    }
                    className={styles.input}
                  />
                </div>}
              <div className={styles.comment}>
                <label className="bgTag">Comment Prompt</label>
                <textarea
                  row={3}
                  value={question.commentPrompt}
                  onChange={(value, e) =>
                    setQuestionByField(filter, question.id, 'commentPrompt', value)
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles.skipOptions}>
                <label className="bgTag">Skip Options</label>
                <div className={styles.inputs}>
                  {question.skipOption.map((option, idx) =>
                    <Input
                      value={(skipQuestionList.filter(q => q.id === option)[0] || {}).optionName}
                      key={`${idx}-${option}`}
                      className={styles.input}
                      withClose={idx === question.skipOption.length - 1}
                      onClickClose={idx === question.skipOption.length - 1 ? (() => {
                        let temp = [...question.skipOption]; temp.pop();
                        setQuestionByField(filter, question.id, 'skipOption', temp)
                      }) : null}
                    />
                  )}
                  <AddButton text="Skip Option" />
                </div>
              </div>
            </div>
            <ModalFooter>
              <span onClick={() => setDetailed(false)}>Cancel</span>
              <Button className="btn">Save</Button>
            </ModalFooter>
          </DetailModal>
        </ModalWrapper>
      }
      {addTag &&
        <ModalWrapper onClick={() => setAddTag(false)}>
          <DetailModal
            style={{ width: '330px', overflow: 'unset' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h2>Add SH Group</h2>
              <span
                onClick={() => setAddTag(false)}>
                <FontAwesomeIcon icon={faTimes} color="#6d6f94" />
              </span>
            </ModalHeader>
            <div className={styles.addModal}>
              <Select
                selected={newTag || ''}
                setSelected={(value) => setNewTag(value)}
                items={currentProject.shGroup.filter(s => !question.shGroup.includes(s.id)).map(sh => sh.SHGroupName)}
                className={styles.addTag}
              />
            </div>
            <ModalFooter>
              <span onClick={() => setAddTag(false)}>Cancel</span>
              <Button
                className="btn"
                onClick={() => {
                  setQuestionByField(
                    filter,
                    question.id,
                    'shGroup',
                    [
                      ...question.shGroup,
                      currentProject.shGroup.filter(sh => sh.SHGroupName === newTag)[0].id
                    ]
                  )
                  setAddTag(false)
                  setNewTag('')
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </DetailModal>
        </ModalWrapper>
      }
    </div>
  )
}

const mapStateToProps = ({ common, admin }) => {
  const { currentProject } = admin
  const { skipQuestionList } = common;
  return {
    currentProject,
    skipQuestionList,
  }
}

export default connect(mapStateToProps, {
  deleteQuestion: adminDeleteQuestion,
})(Question)