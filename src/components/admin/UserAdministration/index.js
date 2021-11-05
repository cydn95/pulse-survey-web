import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { teamList, shgroupList, adminSetUserField } from 'Redux/actions'
import { faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from 'Components/AddButton'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'
import { gray } from 'd3-color';

const UserAdministration = ({ userList, currentProject, loading, getTeamList, getShGroupList, shgroupList, teamList, setUserField }) => {
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    getTeamList(currentProject.id)
    getShGroupList(currentProject.surveyId)
  }, [currentProject])

  const getStatus = useCallback((user) => {
    if (!user && !user.shGroup) {
      return {}
    }
    if (user.id === user.addByProjectUser.id) {
      return {
        text: 'Not Invited',
        color: 'gray',
      }
    } else {
      let percentage = (user.am_answered / user.am_total) * 100
      let resPercent
      if (user.shGroup) {
        resPercent = user.shGroup.responsePercent
      } else {
        resPercent = 100
      }
      if (percentage === 0) {
        return {
          text: 'Not Started',
          color: 'yello'
        }
      } else if (percentage < resPercent) {
        return {
          text: 'In Progress',
          color: 'blue'
        }
      } else {
        return {
          text: 'Complete',
          color: 'green'
        }
      }
    }
  }, [userList])

  useEffect(() => {
    setList(userList.projectUser ? userList.projectUser : [])
  }, [userList])
  return (
    <Fragment>
      {list.length > 0 && <div className={styles.horizontalWrapper}>
        <div className={styles.individual}>
          <Counter count={userList.identifiedTeamMemberCnt} description="Identified Team Members" />
          <Counter count={userList.identifiedStakeholderCnt} description="Identified Stakeholder" />
        </div>
        <div className={styles.individual}>
          <Counter count={userList.invitedTeamMemberCnt} description="Invited Team Members" />
          <Counter count={userList.invitedStakeholderCnt} description="Invited Stakeholder" />
        </div>
        <div className={styles.total}>
          <Counter count={userList.totalIdentifiedCnt} description="Total Identified" type="total" />
          <Counter count={userList.totalInvitedCnt} description="Total Invited" type="total" />
        </div>
      </div>}
      <div className={styles.header}>
        <h3>Member list</h3>
        <AddButton text="member" outlined={true} className={styles.alignRight} />
      </div>
      {list.length !== 0 ? <table style={{ textAlign: 'left' }} className={styles.dataTable}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>
              <div className={styles.arrow}>
                <span>First name</span>
                <span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span>
              </div>
            </th>
            <th>
              <div className={styles.arrow}>
                <span>Last name</span>
                <span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span>
              </div>
            </th>
            <th><div className={styles.arrow}><span>Project title</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
            <th><div className={styles.arrow}><span>Project Org</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
            <th><div className={styles.arrow}><span>Team</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
            <th><div className={styles.arrow}><span>SH Group</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
            <th><div className={styles.arrow}><span>SH Type</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
            <th><div className={styles.arrow}><span>Status</span><span><FontAwesomeIcon icon={faAngleDown} color="#6d6f94" /></span></div></th>
          </tr>
        </thead>
        <tbody>
          {list.map((user, idx) =>
            <Fragment key={user.id}>
              <tr onClick={() => {
                let temp = [...detail.filter(t => t !== user.id)]
                if (detail.filter(t => t === user.id).length === 0) {
                  temp.push(user.id)
                }
                setDetail(temp)
              }}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{user.user.first_name}</td>
                <td>{user.user.last_name}</td>
                <td>{user.projectUserTitle}</td>
                <td>{user.projectOrganization}</td>
                <td>{(user.team || {}).name}</td>
                <td>{(user.shGroup || {}).SHGroupName}</td>
                <td>{(user.shType || {}).shTypeName}</td>
                <td><div className={styles.arrow}>{getStatus(user).text}<span><FontAwesomeIcon icon={detail.includes(user.id) ? faAngleDown : faAngleRight} color="#6d6f94" /></span></div></td>
              </tr>
              {detail.includes(user.id) && <tr>
                <td colSpan={9} style={{ padding: '0px' }}>
                  <UserCard key={`${idx}-${user.id}`} user={user} teamList={teamList} shgroupList={shgroupList} setUserField={setUserField} />
                </td>
              </tr>}
            </Fragment>
          )}
        </tbody>
      </table> : <h3>No User</h3>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin, common }) => {
  const { userList, loading, currentProject } = admin;
  const { teamList, shgroupList } = common;
  return {
    userList,
    loading,
    teamList,
    shgroupList,
    currentProject,
  }
}

export default connect(mapStateToProps, {
  getTeamList: teamList,
  getShGroupList: shgroupList,
  setUserField: adminSetUserField,
})(UserAdministration)