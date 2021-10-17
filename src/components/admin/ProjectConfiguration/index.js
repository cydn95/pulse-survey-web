import React, { useState } from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import classnames from 'classnames'
import Input from 'Components/Input'
import Select from 'Components/Select'
import Button from 'Components/Button'
import OrderComponent from './OrderComponent'
import ReorderModal from './ReorderModal'
import styles from './styles.scss'
import Help from '../../../assets/img/admin/help.svg'
import Sentiment from '../../../assets/img/admin/sentiment-dark.svg'
import Egagement from '../../../assets/img/admin/engagement-dark.svg'
import Influence from '../../../assets/img/admin/influence-dark.svg'
import Interest from '../../../assets/img/admin/interest-dark.svg'
import Confidence from '../../../assets/img/admin/confidence-dark.svg'
import Culture from '../../../assets/img/admin/culture-dark.svg'
import Relationships from '../../../assets/img/admin/relationships-dark.svg'
import Improvement from '../../../assets/img/admin/trophy-dark.svg'
import Reorder from '../../../assets/img/admin/reorder.png'
import MyLeaders from '../../../assets/img/admin/MyLeaders.svg'
import MyPeers from '../../../assets/img/admin/MyPeers.svg'
import MyDirectReports from '../../../assets/img/admin/MyDirectReports.svg'
import WhoNeedsMe from '../../../assets/img/admin/WhoNeedsMe.svg'
import DecisionMakers from '../../../assets/img/admin/DecisionMakers.svg'
import InternalStakeholders from '../../../assets/img/admin/InternalStakeholders.svg'
import KeySuppliers from '../../../assets/img/admin/KeySuppliers.svg'
import ExternalStakeholders from '../../../assets/img/admin/ExternalStakeholders.svg'

const defaultMyMap = [
  {
    text: 'My Leaders',
    image: MyLeaders
  },
  {
    text: 'My Peers',
    image: MyPeers
  },
  {
    text: 'My Direct Reports',
    image: MyDirectReports
  },
  {
    text: 'Who Needs Me',
    image: WhoNeedsMe
  }
]
const defaultprojectMap = [
  {
    text: 'Decision Makers',
    image: DecisionMakers
  },
  {
    text: 'Internal Stakeholders',
    image: InternalStakeholders
  },
  {
    text: 'External Stakeholders',
    image: ExternalStakeholders
  },
  {
    text: 'Key Suppliers',
    image: KeySuppliers
  },
]

const defaultDrivers = [
  {
    text: 'Sentiment',
    image: Sentiment
  },
  {
    text: 'Egagement',
    image: Egagement
  },
  {
    text: 'Influence',
    image: Influence
  },
  {
    text: 'Interest',
    image: Interest
  },
  {
    text: 'Confidence',
    image: Confidence
  },
  {
    text: 'Culture',
    image: Culture
  },
  {
    text: 'Relationships',
    image: Relationships
  },
  {
    text: 'Improvement',
    image: Improvement
  }
]

const ProjectConfiguration = () => {
  const [shgroup, setSHGroup] = useState('')
  const [driverReorder, setDriverReorder] = useState(false)
  const [myMapReorder, setMyMapReorder] = useState(false)
  const [projectMapReorder, setProjectMapReorder] = useState(false)
  const [drivers, setDrivers] = useState(defaultDrivers)
  const [myMap, setMyMap] = useState(defaultMyMap)
  const [projectMap, setProjectMap] = useState(defaultprojectMap)
  const [projectTeams, setProjectTeams] = useState(['Management', 'Engineering'])
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <h2>User Grouping</h2>
        <div className={styles.threshold_wrapper}>
          <div className={styles.anonymity}>
            <div className={styles.left_part}>
              <span>Anonymity Threshold&nbsp;</span>
              <TooltipComponent
                content="To ensure all responses remain safe and anonymous the minimum threshold is 3">
                <img src={Help} alt="help" />
              </TooltipComponent>
            </div>
            <Input type="number" className={styles.threshold} />
          </div>
          <div className={styles.completion}>
            <span className={styles.text}>Completion Threshold(%)</span>
            <Input className={styles.threshold} />
          </div>
        </div>
        <div className={styles.detailed}>
          <div className={styles.column}>
            <span className={styles.header}>Stakeholder Groups / Segments</span>
            <span className={styles.description}>Create meaningful groupings to specify which
              questions the users are asked.</span>
            <Select selected={shgroup} noSelected="Choose Group" setSelected={setSHGroup} items={[]} className={styles.withOutline} />
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Project Teams</span>
            <span className={styles.description}>Define the teams that will be used to
              categorise user responses. Users in different
              organisations can be in the same team.</span>
            {projectTeams.map((pt, idx) =>
              <Select key={`${idx}-select`} keyValue={`${idx}-select`} selected={pt} noSelected="Choose Group" setSelected={setSHGroup} items={['Management', 'Engineering']} className={styles.withOutline} />
            )}
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Custom Groups</span>
            <span className={styles.description}>Create up to three custom groups</span>
            <Input type="text" className={styles.customGroup} />
            <div className={styles.add}>
              <span className={styles.plus}>+</span>
              <span>Add new</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classnames(styles.row, styles.order)}>
        <h2>Drivers</h2>
        <span className={styles.description}>Create driver categories to group questions into meaningful categories.</span>
        <div className={styles.btnGroup}>
          <Button className={styles.resetAll} onClick={() => setProjectMap(defaultDrivers)}>Reset All</Button>
          <div className={styles.reorder}>
            <span className={styles.image} onClick={() => setDriverReorder(true)}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
        <OrderComponent items={drivers} />
      </div>
      <div className={classnames(styles.row, styles.order)}>
        <h2>Mapping Categories</h2>
        <span className={styles.description}>Create / manage categories for About Others mapping.</span>
        <div className={styles.btnGroup}>
          <Button className={styles.resetAll} onClick={() => setMyMap(defaultMyMap)}>Reset All</Button>
          <div className={styles.reorder}>
            <span className={styles.image} onClick={() => setMyMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
        <OrderComponent items={myMap} title="My Map" />
        <div className={styles.btnGroup}>
          <Button className={styles.resetAll} onClick={() => setProjectMap(defaultprojectMap)}>Reset All</Button>
          <div className={styles.reorder}>
            <span className={styles.image} onClick={() => setProjectMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
        <OrderComponent items={projectMap} title="Project Map" />
      </div>
      {driverReorder && <ReorderModal items={drivers} onClose={() => setDriverReorder(false)} setItems={setDrivers} />}
      {myMapReorder && <ReorderModal items={myMap} onClose={() => setMyMapReorder(false)} setItems={setMyMap} />}
      {projectMapReorder && <ReorderModal items={projectMap} onClose={() => setProjectMapReorder(false)} setItems={setProjectMap} />}
    </div>
  )
}

export default ProjectConfiguration