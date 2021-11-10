import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { surveyListByProject, driverList, shCategoryList, teamList, adminSetProjectField } from 'Redux/actions';
import OrderComponent from '../OrderComponent'
import Reorder from 'Assets/img/admin/reorder.png'
import Button from 'Components/Button'

const MappingCategory = ({ styles, currentProject, setProjectField, setMyMapReorder, setProjectMapReorder }) => {
  return (
    <div className={classnames(styles.row, styles.order)}>
      <h2>Mapping Categories</h2>
      <span className={styles.description}>Create / manage categories for About Others mapping.</span>
      <div className={styles.btnGroup}>
        <Button className={styles.resetAll} onClick={() => setProjectField('myMap', shCategoryList.filter(sh => sh.mapType === 2))}>Reset All</Button>
        <div className={styles.reorder}>
          <span className={styles.image} onClick={() => setMyMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
          <span className={styles.text}>Reorder</span>
        </div>
      </div>
      <OrderComponent items={currentProject.myMap} title="My Map" />
      <div className={styles.btnGroup}>
        <Button className={styles.resetAll} onClick={() => setProjectField('projectMap', shCategoryList.filter(sh => sh.mapType === 3))}>Reset All</Button>
        <div className={styles.reorder}>
          <span className={styles.image} onClick={() => setProjectMapReorder(true)}><img src={Reorder} alt="reorder" /></span>
          <span className={styles.text}>Reorder</span>
        </div>
      </div>
      <OrderComponent items={currentProject.projectMap} title="Project Map" />
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
})(MappingCategory)