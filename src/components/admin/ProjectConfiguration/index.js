import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import classnames from 'classnames'
import { surveyListByProject, driverList, shCategoryList, teamList } from 'Redux/actions';
import Input from 'Components/Input'
import Select from 'Components/Select'
import AddButton from 'Components/AddButton'
import Button from 'Components/Button'
import { adminSetProjectField } from 'Redux/admin/actions';
import OrderComponent from './OrderComponent'
import ReorderModal from './ReorderModal'
import styles from './styles.scss'
import Help from '../../../assets/img/admin/help.svg'
import Reorder from '../../../assets/img/admin/reorder.png'

const ProjectConfiguration = ({
  currentProject,
  surveyList,
  getSurveyList,
  getDriverList,
  driverList,
  surveyId,
  shCategoryList,
  getShCategoryList,
  projectMapShCategoryList,
  setProjectField,
  getTeamList,
  teamList
}) => {
  const [shgroup, setSHGroup] = useState('')
  const [driverReorder, setDriverReorder] = useState(false)
  const [myMapReorder, setMyMapReorder] = useState(false)
  const [projectMapReorder, setProjectMapReorder] = useState(false)
  const [drivers, setDrivers] = useState(driverList)
  const [myMap, setMyMap] = useState([])
  const [projectMap, setProjectMap] = useState([])

  useEffect(() => {
    getDriverList(surveyId)
    getShCategoryList(surveyId, 0)
    if (currentProject.project) {
      getTeamList(currentProject.project, surveyId)
    }
  }, [surveyId])

  useEffect(() => {
    setDrivers(driverList);
  }, [driverList])

  useEffect(() => {
    console.log('shcategorylist', shCategoryList)
    setMyMap(shCategoryList)
    setProjectMap(projectMapShCategoryList)
  }, [shCategoryList])

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
            <Input type="number" className={styles.threshold} value={currentProject.anonymityThreshold} />
          </div>
        </div>
        <div className={styles.detailed}>
          <div className={styles.column}>
            <span className={styles.header}>Stakeholder Groups / Segments</span>
            <span className={styles.description}>Create meaningful groupings to specify which
              questions the users are asked.</span>
            <Select
              selected={shgroup}
              noSelected="Choose Group"
              setSelected={setSHGroup}
              items={(() => currentProject.shGroup.map(sh => sh.SHGroupName))()}
              className={styles.withOutline}
            />
            {currentProject.shGroup.filter(sh => sh.SHGroupName === shgroup).length > 0 && <div className={styles.completion}>
              <span className={styles.text}>Completion Threshold(%)</span>
              <Input
                className={styles.completion_input}
                value={(currentProject.shGroup.filter(sh => sh.SHGroupName === shgroup)[0] || {}).responsePercent || 0}
                onChange={(value, e) => {
                  let temp = [...currentProject.shGroup]
                  temp.filter(sh => sh.SHGroupName === shgroup)[0].responsePercent = value
                  setProjectField('shGroup', temp)
                }}
              />
            </div>}
            <AddButton />
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Project Teams</span>
            <span className={styles.description}>Define the teams that will be used to
              categorise user responses. Users in different
              organisations can be in the same team.</span>
            {currentProject.projectTeam.map((pt, idx) =>
              <Select
                key={`${idx}-select`}
                keyValue={`${idx}-select`}
                selected={pt.name}
                noSelected="Choose Group"
                setSelected={(value) => {
                  let temp = [...currentProject]
                  temp[idx] = teamList.filter(team => team.name === value)[0]
                  setProjectField('projectTeam', temp)
                }}
                items={(teamList || []).filter(team => !currentProject.projectTeam.map(pt => pt.name).includes(team.name)).map(team => team.name)}
                className={styles.withOutline}
                onClose={() => {
                  let temp = currentProject.projectTeam.filter(p => p !== pt)
                  setProjectField('projectTeam', temp)
                }}
              />
            )}
            <AddButton />
          </div>
          <div className={styles.column}>
            <span className={styles.header}>Custom Groups</span>
            <span className={styles.description}>Create up to three custom groups</span>
            {Object.keys(currentProject).filter(key => key.includes('customGroup')).map((key, idx) =>
              currentProject[key] && <Input
                type="text"
                className={styles.customGroup}
                value={currentProject[key]}
                onChange={(value, e) => {
                  setProjectField(`customGroup${idx + 1}`, value)
                }}
                onClickClose={() => {
                  setProjectField(`customGroup${idx + 1}`, '')
                }} />
            )}
            {Object.keys(currentProject).filter(key => key.includes('customGroup')).length > 2 && <AddButton />}
          </div>
        </div>
      </div>
      <div className={classnames(styles.row, styles.order)}>
        <h2>Drivers</h2>
        <span className={styles.description}>Create driver categories to group questions into meaningful categories.</span>
        <div className={styles.btnGroup}>
          <Button className={styles.resetAll} onClick={() => setDrivers(driverList)}>Reset All</Button>
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
          <Button className={styles.resetAll} onClick={() => setMyMap(shCategoryList.filter(sh => sh.mapType === 2))}>Reset All</Button>
          <div className={styles.reorder}>
            <span className={styles.image} onClick={() => setMyMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
        <OrderComponent items={myMap} title="My Map" />
        <div className={styles.btnGroup}>
          <Button className={styles.resetAll} onClick={() => setProjectMap(shCategoryList.filter(sh => sh.mapType === 3))}>Reset All</Button>
          <div className={styles.reorder}>
            <span className={styles.image} onClick={() => setProjectMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
            <span className={styles.text}>Reorder</span>
          </div>
        </div>
        <OrderComponent items={projectMap} title="Project Map" />
      </div>
      {driverReorder && <ReorderModal items={drivers} onClose={() => setDriverReorder(false)} setItems={setDrivers} text="drivers" />}
      {myMapReorder && <ReorderModal items={myMap} onClose={() => setMyMapReorder(false)} setItems={setMyMap} text="My map Categories" />}
      {projectMapReorder && <ReorderModal items={projectMap} onClose={() => setProjectMapReorder(false)} setItems={setProjectMap} text="My map Categories" />}
    </div>
  )
}

const mapStateToProps = ({ admin, settings, common }) => {
  const { currentProject, surveyId } = admin
  const { surveyList } = settings;
  const { driverList, shCategoryList, projectMapShCategoryList, teamList } = common
  return {
    currentProject,
    surveyList,
    driverList,
    surveyId,
    shCategoryList,
    projectMapShCategoryList,
    teamList,
  }
}

export default connect(mapStateToProps, {
  getSurveyList: surveyListByProject,
  getDriverList: driverList,
  getShCategoryList: shCategoryList,
  setProjectField: adminSetProjectField,
  getTeamList: teamList
})(ProjectConfiguration)