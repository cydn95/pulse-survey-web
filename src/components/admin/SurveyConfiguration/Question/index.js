import React, { useState, useRef, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import classnames from 'classnames'
import { getColorFromValue } from "Util/Utils";
import { controlType, controlTypeTag } from 'Constants/defaultValues'
import Select from 'Components/Select'
import Input from 'Components/Input'
import Button from 'Components/Button'
import AddButton from 'Components/AddButton'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DetailModal,
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from '../../UserAdministration/UserCard/usercard.styles'
import styles from './styles.scss'
import QMark from '../../../../assets/img/admin/QMark.svg'
import DeleteIcon from '../../../../assets/img/admin/delete.svg'

const Tag = styled.span`
  padding: 3px 6px 1px;
  border-radius: 4px;
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

const Question = ({ question, shgroupList, skipQuestionList, drivers }) => {
  const headerRef = useRef(null)
  const spanRef = useRef(null)
  const [detailed, setDetailed] = useState(false)
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState()
  const [survey, setSurvey] = useState(question.questionText)
  const [driver, setDriver] = useState((question.driver || {}).driverName)
  const [subDriver, setSubDriver] = useState(question.subdriver)
  const [type, setType] = useState(controlTypeTag(question.controlType))
  const [sliderLeft, setSliderLeft] = useState(question.sliderTextLeft)
  const [sliderRight, setSliderRight] = useState(question.sliderTextRight)
  const [options, setOptions] = useState(question.option)
  const [topics, setTopics] = useState(question.topics)
  const [commentPrompt, setCommentPrompt] = useState(question.commentPrompt)
  const [skipOptions, setSkipOptions] = useState(question.skipOption)

  useEffect(() => {
    setSurvey(question.questionText)
    setDriver((question.driver || {}).driverName)
    setSubDriver(question.subdriver)
    setType(controlTypeTag(question.controlType))
    setSliderLeft(question.sliderTextLeft)
    setSliderRight(question.sliderTextRight)
    setOptions(question.option)
    setTopics(question.topics)
    setCommentPrompt(question.commentPrompt)
    setSkipOptions(question.skipOption)
  }, [question])

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.basic} onClick={() => setDetailed(!detailed)}>
        <div className={styles.data}>
          <span className={styles.qmark}><img src={QMark} alt="QMark" /></span>
          <div>
            <div className={styles.headerPart}>
              <span className={styles.hide} ref={spanRef}>{survey}</span>
              <Input
                refVal={headerRef}
                value={survey}
                onBlur={() => setEdit(false)}
                onChange={
                  (value, e) => {
                    setSurvey(value); setWidth(spanRef.current.offsetWidth)
                  }}
                className={styles.header}
                style={{ width }}
              />
              {!edit && <span onClick={(e) => { e.stopPropagation(); headerRef.current.focus(); setEdit(true); }} style={{ cursor: 'pointer' }}>Edit</span>}
            </div>
            <span className={styles.survey}>{survey}</span>
            <div className={styles.function_for_mobile}>
              <span className={styles.label}>Control Type:</span>
              <Select selected={type} setSelected={setType} items={Object.keys(controlType).map(type => controlTypeTag(controlType[type]))} className={styles.controlType} />
              <span className={styles.delete} onClick={(e) => { e.stopPropagation(); }}><img src={DeleteIcon} alt="delete" /></span>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <span className={styles.label}>Driver:</span>
                <Select selected={driver} setSelected={setDriver} items={drivers} />
              </div>
              <div className={styles.input}>
                <span className={classnames(styles.label, styles.subdriver)}>Subdriver:</span>
                <Input className={styles.sub} value={subDriver} onChange={(value, e) => setSubDriver(value)} />
              </div>
              <div className={styles.input}>
                <span className={styles.label}>SH Group:</span>
                {question.shGroup.map((sh, idx) => <Tag color={getColorFromValue((idx + 4) % 5 + 5)} key={`${idx}-${sh}`} text={(shgroupList.filter(s => s.id === sh)[0] || {}).SHGroupName}>{(shgroupList.filter(s => s.id === sh)[0] || {}).SHGroupName}</Tag>)}
              </div>
              <Button onClick={() => setDetailed(true)} className={styles.viewDetails}>View Details</Button>
            </div>
          </div>
        </div>
        <div className={styles.function}>
          <span className={styles.label}>Control Type:</span>
          <Select selected={type} setSelected={setType} items={Object.keys(controlType).map(type => controlTypeTag(controlType[type]))} className={styles.controlType} />
          <span className={styles.delete} onClick={(e) => { e.stopPropagation(); }}><img src={DeleteIcon} alt="delete" /></span>
          <span className={classnames(styles.toggle, detailed && styles.active)}>{`>`}</span>
        </div>
      </div>
      {detailed && <div className={styles.others}>
        <div className={styles.slider}>
          {type === 'Slider' && <Fragment>
            <div className={styles.left}>
              <label>Slider Left (Red)</label>
              <Input value={sliderLeft} onChange={(value, e) => setSliderLeft(value)} className={styles.input} />
            </div>
            <div className={styles.right}>
              <label>Slider Right (Green)</label>
              <Input value={sliderRight} onChange={(value, e) => setSliderRight(value)} className={styles.input} />
            </div>
          </Fragment>}
          {(type === 'Two Options' || type === 'Multi Options') && <Fragment>
            {options.map((option, idx) =>
              <div key={`${idx}-${option}`}>
                <label>Option {idx + 1}</label>
                <Input className={styles.input} value={option} onChange={(value, e) => {
                  let temp = [...options]
                  temp[idx] = value
                  setOptions(temp)
                }} />
              </div>
            )}
            {type === 'Multi Options' && <AddButton text="Option" style={{ flexBasis: '100%' }} />}
          </Fragment>}
          {type === 'Multi-Topic' && <Fragment>
            {topics.map((topic, idx) =>
              <div key={`${idx}-${topic}`}>
                <label>Option {idx + 1}</label>
                <Input className={styles.input} value={topic} onChange={(value, e) => {
                  let temp = [...topics]
                  temp[idx] = value
                  setTopics(temp)
                }} />
              </div>
            )}
            <AddButton text="Topic" style={{ flexBasis: '100%' }} />
          </Fragment>}
          <div className={styles.comment}>
            <label>Comment Prompt</label>
            <Input value={commentPrompt} onChange={(value, e) => setCommentPrompt(value)} className={styles.input} />
          </div>
        </div>
        <div className={styles.skipOptions}>
          <label>Skip Options</label>
          <div className={styles.inputs}>
            {skipOptions.map((option, idx) =>
              <Input
                value={(skipQuestionList.filter(q => q.id === option)[0] || {}).optionName}
                key={`${idx}-${option}`}
                className={styles.input}
                withClose={idx === skipOptions.length - 1}
                onClickClose={() => { let temp = [...skipOptions]; temp.pop(); setSkipOptions(temp) }}
                onChange={(value, e) => {
                  let temp = [...skipOptions]
                  temp[idx] = value;
                  setSkipOptions(temp)
                }}
              />
            )}
            <AddButton text="Skip Option" />
          </div>
        </div>
      </div>}
      {detailed &&
        <ModalWrapper className={styles.modal} onClick={() => setDetailed(false)}>
          <DetailModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{survey}</h2>
              <span onClick={() => setDetailed(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
            </ModalHeader>
            <div className={classnames("editPart", styles.editPart)}>
              {controlType === 'Slider' && <Fragment>
                <div className={styles.left}>
                  <label className="bgTag">Slider Left (Red)</label>
                  <Input value={sliderLeft} onChange={(value, e) => setSliderLeft(value)} className={styles.input} />
                </div>
                <div className={styles.right}>
                  <label className="bgTag">Slider Right (Green)</label>
                  <Input value={sliderRight} onChange={(value, e) => setSliderRight(value)} className={styles.input} />
                </div>
              </Fragment>}
              {(controlType === 'Two Options' || controlType === 'Multi Options') && <Fragment>
                {options.map((option, idx) =>
                  <div key={`${idx}-${option}`}>
                    <label className="bgTag">Option {idx + 1}</label>
                    <Input className={styles.input} value={option} onChange={(value, e) => {
                      let temp = [...options]
                      temp[idx] = value
                      setOptions(temp)
                    }} />
                  </div>
                )}
                {controlType === 'Multi Options' && <AddButton text="Option" style={{ flexBasis: '100%' }} />}
              </Fragment>}
              {controlType === 'Multi-Topic' && <Fragment>
                {topics.map((topic, idx) =>
                  <div key={`${idx}-${topic}`}>
                    <label className="bgTag">Option {idx + 1}</label>
                    <Input className={styles.input} value={topic} onChange={(value, e) => {
                      let temp = [...topics]
                      temp[idx] = value
                      setTopics(temp)
                    }} />
                  </div>
                )}
                <AddButton text="Topic" style={{ flexBasis: '100%' }} />
              </Fragment>}
              <div className={styles.comment}>
                <label className="bgTag">Comment Prompt</label>
                <textarea row={3} value={commentPrompt} onChange={(value, e) => setCommentPrompt(value)} className={styles.input} />
              </div>
              <div className={styles.skipOptions}>
                <label className="bgTag">Skip Options</label>
                <div className={styles.inputs}>
                  {skipOptions.map((option, idx) =>
                    <Input
                      value={option}
                      key={`${idx}-${option}`}
                      className={styles.input}
                      withClose={idx === skipOptions.length - 1}
                      onClickClose={() => { let temp = [...skipOptions]; temp.pop(); setSkipOptions(temp) }}
                      onChange={(value, e) => {
                        let temp = [...skipOptions]
                        temp[idx] = value;
                        setSkipOptions(temp)
                      }}
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
    </div>
  )
}

const mapStateToProps = ({ common }) => {
  const { shgroupList, skipQuestionList } = common;
  return {
    shgroupList,
    skipQuestionList,
  }
}

export default connect(mapStateToProps, null)(Question)