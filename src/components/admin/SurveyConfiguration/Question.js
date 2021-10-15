import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'Components/Select'
import Input from 'Components/Input'

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
  const [driver, setDriver] = useState(question.driver)
  const [subDriver, setSubDriver] = useState(question.subDriver)
  return (
    <div>
      <div>
        <h2>{question.text}</h2>
        <span>Driver</span><Select selected={driver} setSelected={setDriver} items={drivers} />
        <span>Subdriver</span><Input value={subDriver} onChagne={(e, value) => setSubDriver(value)} />
        <span>SH Group</span>{question.SHGroup.map((sh, idx) => <Tag key={`${idx}-${sh}`} text={sh}>{sh}</Tag>)}
      </div>
    </div>
  )
}

export default Question