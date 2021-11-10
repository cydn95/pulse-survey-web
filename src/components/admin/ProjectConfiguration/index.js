import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { surveyListByProject, driverList, shCategoryList, teamList, adminSetProjectField } from 'Redux/actions';
import Loading from 'Components/Loading'
import ReorderModal from './ReorderModal'
import UserGrouping from './UserGrouping'
import MappingCategory from './MappingCategory'
import Drivers from './Drivers'
import styles from './styles.scss'

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
  teamList,
  loading,
}) => {
  const [dirverListLoading, setDriverListLoading] = useState(true)
  const [shgroup, setSHGroup] = useState('')
  const [driverReorder, setDriverReorder] = useState(false)
  const [myMapReorder, setMyMapReorder] = useState(false)
  const [projectMapReorder, setProjectMapReorder] = useState(false)

  useEffect(() => {
    getDriverList(surveyId)
    getTeamList(currentProject.project || '', surveyId)
  }, [surveyId])

  useEffect(() => {
    if (driverList && Object.keys(currentProject).length > 0) {
      setProjectField('driverList', driverList);
    }
    setDriverListLoading(false)
  }, [driverList])

  useEffect(() => {
    if (!dirverListLoading) {
      window.scrollTo(0, 0)
    }
  }, [dirverListLoading])

  return (
    <React.Fragment>
      {(loading && dirverListLoading) ?
        <Loading description="" /> :
        <div className={styles.wrapper}>
          {driverReorder && <ReorderModal items={currentProject.driverList} onClose={() => setDriverReorder(false)} setItems={(value) => setProjectField('driverList', value)} text="drivers" />}
          {myMapReorder && <ReorderModal items={currentProject.myMap} onClose={() => setMyMapReorder(false)} setItems={(value) => setProjectField('myMap', value)} text="My map Categories" />}
          {projectMapReorder && <ReorderModal items={currentProject.projectMap} onClose={() => setProjectMapReorder(false)} setItems={(value) => setProjectField('projectMap', value)} text="My map Categories" />}
          <MappingCategory styles={styles} setMyMapReorder={setMyMapReorder} setProjectMapReorder={setProjectMapReorder} />
          <Drivers styles={styles} drviers={currentProject.driverList} setDriverReorder={setDriverReorder} />
          <UserGrouping shgroup={shgroup} setSHGroup={setSHGroup} styles={styles} />
        </div>}
    </React.Fragment>
  )
}

const mapStateToProps = ({ admin, settings, common }) => {
  const { currentProject, surveyId, loading } = admin
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
    loading,
  }
}

export default connect(mapStateToProps, {
  getSurveyList: surveyListByProject,
  getDriverList: driverList,
  getShCategoryList: shCategoryList,
  setProjectField: adminSetProjectField,
  getTeamList: teamList,
})(ProjectConfiguration)