import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adminSetProjectField } from 'Redux/actions';
import Input from 'Components/Input'
import Loading from 'Components/Loading'
import ReorderModal from './ReorderModal'
import UserGrouping from './UserGrouping'
import MappingCategory from './MappingCategory'
import Drivers from './Drivers'
import styles from './styles.scss'

const ProjectConfiguration = ({
  currentProject,
  setProjectField,
  loading,
}) => {
  const [shgroup, setSHGroup] = useState('')
  const [driverReorder, setDriverReorder] = useState(false)
  const [myMapReorder, setMyMapReorder] = useState(false)
  const [projectMapReorder, setProjectMapReorder] = useState(false)

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0)
    }
  }, [loading])

  return (
    <React.Fragment>
      {loading ?
        <Loading description="" /> :
        <div className={styles.wrapper}>
          {driverReorder && <ReorderModal items={currentProject.driverList} onClose={() => setDriverReorder(false)} setItems={(value) => setProjectField('driverList', value)} text="drivers" />}
          {myMapReorder && <ReorderModal items={currentProject.myMap} onClose={() => setMyMapReorder(false)} setItems={(value) => setProjectField('myMap', value)} text="My map Categories" />}
          {projectMapReorder && <ReorderModal items={currentProject.projectMap} onClose={() => setProjectMapReorder(false)} setItems={(value) => setProjectField('projectMap', value)} text="My map Categories" />}
          <MappingCategory styles={styles} setMyMapReorder={setMyMapReorder} setProjectMapReorder={setProjectMapReorder} />
          <Drivers styles={styles} drviers={currentProject.driverList} setDriverReorder={setDriverReorder} />
          <UserGrouping shgroup={shgroup} setSHGroup={setSHGroup} styles={styles} />
          <div className={styles.dashboard_threshold}>
            <span className={styles.tag}>Dashboard Threshold</span>
            <Input className={styles.threshold} />
          </div>
        </div>}
    </React.Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject, loading } = admin
  return {
    currentProject,
    loading,
  }
}

export default connect(mapStateToProps, {
  setProjectField: adminSetProjectField,
})(ProjectConfiguration)