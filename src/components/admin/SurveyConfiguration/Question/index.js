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

const Question = ({ question, shgroupList, skipQuestionList, drivers, index, setQuestionByField, filter, driverList }) => {
  const headerRef = useRef(null)
  const spanRef = useRef(null)
  const [detailed, setDetailed] = useState(false)
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState()
  const [type, setType] = useState(controlTypeTag(question.controlType))

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth)
  }, [])

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
                    setQuestionByField(filter, index, 'questionText', value); setWidth(spanRef.current.offsetWidth + 10)
                  }}
                className={styles.header}
                style={{ width }}
              />
              {!edit && <span onClick={(e) => { e.stopPropagation(); headerRef.current.focus(); setEdit(true); }} style={{ cursor: 'pointer' }}>Edit</span>}
            </div>
            <div className={styles.function_for_mobile}>
              <span className={styles.label}>Control Type:</span>
              <Select selected={type} setSelected={setType} items={Object.keys(controlType).map(type => controlTypeTag(controlType[type]))} className={styles.controlType} />
              <span className={styles.delete} onClick={(e) => { e.stopPropagation(); }}><img src={DeleteIcon} alt="delete" /></span>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <span className={styles.label}>Driver:</span>
                <Select selected={(question.driver || {}).driverName} setSelected={(value) => setQuestionByField(filter, index, 'driver', driverList.filter(d => d.driverName === value)[0])} items={drivers} />
              </div>
              <div className={styles.input}>
                <span className={classnames(styles.label, styles.subdriver)}>Subdriver:</span>
                <Input className={styles.sub} value={question.subdriver} onChange={(value, e) => setQuestionByField(filter, index, 'subdriver', value)} />
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
          <Select selected={controlTypeTag(question.controlType)} setSelected={(value) => setQuestionByField(filter, index, 'controlType', value)} items={Object.keys(controlType).map(type => controlTypeTag(controlType[type]))} className={styles.controlType} />
          <span className={styles.delete} onClick={(e) => { e.stopPropagation(); }}><img src={DeleteIcon} alt="delete" /></span>
          <span className={classnames(styles.toggle, detailed && styles.active)}>{`>`}</span>
        </div>
      </div>
      {detailed && <div className={styles.others}>
        <div className={styles.slider}>
          {type === 'Slider' && <Fragment>
            <div className={styles.left}>
              <label>Slider Left (Red)</label>
              <Input value={question.sliderTextLeft} onChange={(value, e) => setQuestionByField(filter, index, 'sliderTextLeft', value)} className={styles.input} />
            </div>
            <div className={styles.right}>
              <label>Slider Right (Green)</label>
              <Input value={question.sliderTextRight} onChange={(value, e) => setQuestionByField(filter, index, 'sliderTextRight', value)} className={styles.input} />
            </div>
          </Fragment>}
          {(type === 'Two Options' || type === 'Multi Options') && <Fragment>
            {question.option.map((option, idx) =>
              <div key={`${idx}-${option}`}>
                <label>Option {idx + 1}</label>
                <Input className={styles.input} value={option} onChange={(value, e) => {
                  let temp = [...question.option]
                  temp[idx] = value
                  setQuestionByField(filter, idx, 'option', temp)
                }} />
              </div>
            )}
            {(type === 'Multi Options' || (type === "Two Options" && question.option.length < 2)) && <AddButton text="Option" style={{ flexBasis: '100%' }} />}
          </Fragment>}
          {type === 'Multi-Topic' && <Fragment>
            {question.topics.map((topic, idx) =>
              <div key={`${idx}-${topic}`}>
                <label>Option {idx + 1}</label>
                <Input className={styles.input} value={topic} onChange={(value, e) => {
                  let temp = [...question.topics]
                  temp[idx] = value
                  setQuestionByField(filter, index, 'topics', temp)
                }} />
              </div>
            )}
            <AddButton text="Topic" style={{ flexBasis: '100%' }} />
          </Fragment>}
          <div className={styles.comment}>
            <label>Comment Prompt</label>
            <Input value={question.commentPrompt} onChange={(value, e) => setQuestionByField(filter, index, 'commentPrompt', value)} className={styles.input} />
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
                onClickClose={idx === question.skipOption.length - 1 ? (() => { let temp = [...question.skipOption]; temp.pop(); setQuestionByField(filter, index, 'skipOption', temp) }) : null}
                onChange={(value, e) => {
                  let temp = [...question.skipOption]
                  temp[idx] = value;
                  setQuestionByField(filter, index, 'skipOption', temp)
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
              <h2>{question.questionText}</h2>
              <span onClick={() => setDetailed(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
            </ModalHeader>
            <div className={classnames("editPart", styles.editPart)}>
              {controlType === 'Slider' && <Fragment>
                <div className={styles.left}>
                  <label className="bgTag">Slider Left (Red)</label>
                  <Input value={question.sliderTextLeft} onChange={(value, e) => setQuestionByField(filter, index, 'sliderTextLeft', value)} className={styles.input} />
                </div>
                <div className={styles.right}>
                  <label className="bgTag">Slider Right (Green)</label>
                  <Input value={question.sliderTextRight} onChange={(value, e) => setQuestionByField(filter, index, 'sliderTextRight', value)} className={styles.input} />
                </div>
              </Fragment>}
              {(controlType === 'Two Options' || controlType === 'Multi Options') && <Fragment>
                {question.option.map((option, idx) =>
                  <div key={`${idx}-${option}`}>
                    <label>Option {idx + 1}</label>
                    <Input className={styles.input} value={option} onChange={(value, e) => {
                      let temp = [...question.option]
                      temp[idx] = value
                      setQuestionByField(filter, index, 'option', temp)
                    }} />
                  </div>
                )}
                {controlType === 'Multi Options' && <AddButton text="Option" style={{ flexBasis: '100%' }} />}
              </Fragment>}
              {controlType === 'Multi-Topic' && <Fragment>
                {question.topics.map((topic, idx) =>
                  <div key={`${idx}-${topic}`}>
                    <label>Option {idx + 1}</label>
                    <Input className={styles.input} value={topic} onChange={(value, e) => {
                      let temp = [...question.topics]
                      temp[idx] = value
                      setQuestionByField(filter, index, 'topics', temp)
                    }} />
                  </div>
                )}
                <AddButton text="Topic" style={{ flexBasis: '100%' }} />
              </Fragment>}
              <div className={styles.comment}>
                <label className="bgTag">Comment Prompt</label>
                <textarea row={3} value={question.commentPrompt} onChange={(value, e) => setQuestionByField(filter, index, 'commentPrompt', value)} className={styles.input} />
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
                      onClickClose={idx === question.skipOption.length - 1 ? (() => { let temp = [...question.skipOption]; temp.pop(); setQuestionByField(filter, index, 'skipOption', temp) }) : null}
                      onChange={(value, e) => {
                        let temp = [...question.skipOption]
                        temp[idx] = value;
                        setQuestionByField(filter, index, 'skipOption', temp)
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
  const { shgroupList, skipQuestionList, driverList } = common;
  return {
    shgroupList,
    skipQuestionList,
  }
}

export default connect(mapStateToProps, null)(Question)