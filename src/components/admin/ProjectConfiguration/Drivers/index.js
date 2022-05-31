import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { surveyListByProject, driverList, shCategoryList, teamList, adminSetProjectField } from 'Redux/actions';
import OrderComponent from '../OrderComponent'
import Reorder from 'Assets/img/admin/reorder.png'
import Button from 'Components/Button'

const Drivers = ({ styles, setDriverReorder, currentProject, drivers, setProjectField }) => {
  return (
    <div className={classnames(styles.row, styles.order)}>
      <h2>Drivers</h2>
      <span className={styles.description}>Create driver categories to group questions into meaningful categories.</span>
      <div className={styles.btnGroup}>
        <Button className={styles.resetAll} onClick={() => setProjectField('driverList', (currentProject.driverList || []).sort((a, b) => a.order < b.order))}>Reset All</Button>
        <div className={styles.reorder}>
          <span className={styles.image} onClick={() => setDriverReorder(true)}><img src={Reorder} alt="reorder" /></span>
          <span className={styles.text}>Reorder</span>
        </div>
      </div>
      <OrderComponent items={currentProject.driverList} field="driverList" />
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
})(Drivers)