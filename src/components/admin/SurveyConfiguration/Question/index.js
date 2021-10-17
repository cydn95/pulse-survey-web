import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Select from 'Components/Select'
import Input from 'Components/Input'
import styles from './styles.scss'
// import QMark from '../../../../assets/img/admin/qmark.svg'
// import DeleteIcon from '../../../../assets/img/admin/delete.svg'

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
  color: ${props => shGroups.filter(sh => sh.name === props.text)[0].color};
  background-color: ${props => shGroups.filter(sh => sh.name === props.text)[0].background};
`
const shGroups = [
  {
    name: 'Internal',
    color: '#008a37',
    background: '#c7efe3'
  },
  {
    name: 'External',
    color: '#036fb7',
    background: 'rgba(3, 111, 183, 0.19)'
  },
  {
    name: 'Other',
    color: '#d08a02',
    background: 'rgba(242, 182, 29, 0.19);'
  }
]
const controlTypes = ['Multi Options', 'SLIDER', 'Two Options', 'Multi-Topic']
const drivers = ['Sentiment', 'Support', 'Politics', 'Risks']

const Question = ({ question }) => {
  const headerRef = useRef(null)
  const spanRef = useRef(null)
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState()
  const [survey, setSurvey] = useState(question.text)
  const [driver, setDriver] = useState(question.driver)
  const [subDriver, setSubDriver] = useState(question.subDriver)
  const [controlType, setControlType] = useState(question.controlType)

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.basic}>
        <div className={styles.data}>
          {/* <span className={styles.qmark}><img src={QMark} alt="QMark" /></span> */}
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
              {!edit && <span onClick={() => { headerRef.current.focus(); setEdit(true) }}>Edit</span>}
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <span className={styles.label}>Driver:</span>
                <Select selected={driver} setSelected={setDriver} items={drivers} />
              </div>
              <div className={styles.input}>
                <span className={styles.label}>Subdriver:</span>
                <Input className={styles.sub} value={subDriver} onChagne={(value, e) => setSubDriver(value)} />
              </div>
              <div className={styles.input}>
                <span className={styles.label}>SH Group:</span>
                {question.SHGroup.map((sh, idx) => <Tag key={`${idx}-${sh}`} text={sh}>{sh}</Tag>)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.function}>
          <span className={styles.label}>Control Type:</span>
          <Select selected={controlType} setSelected={setControlType} items={controlTypes} className={styles.controlType} />
          {/* <span className={styles.delete}><img src={DeleteIcon} alt="delete" /></span> */}
          <span className={styles.toggle}>{`>`}</span>
        </div>
      </div>
    </div>
  )
}

export default Question