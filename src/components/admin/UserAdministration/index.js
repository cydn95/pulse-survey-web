import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { teamList, shgroupList, adminSetUserField } from 'Redux/actions'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import { faAngleRight, faAngleDown, faAngleUp, faPaperPlane, faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from 'Components/AddButton'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'

const UserAdministration = ({ userList, currentProject, loading, getTeamList, getShGroupList, shgroupList, teamList, setUserField }) => {
  const [order, setOrder] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [sort, setSort] = useState()
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    getTeamList(currentProject.id)
    getShGroupList(currentProject.id)
  }, [currentProject])

  const valueByField = (user, field) => {
    switch (field) {
      case 'firstName':
        return user.user.first_name
      case 'lastName':
        return user.user.last_name
      case 'projectTitle':
        return user.projectUserTitle
      case 'projectOrg':
        return user.projectOrganization
      case 'team':
        return (user.team || {}).name
      case 'shGroup':
        return (user.shGroup || {}).SHGroupName
      case 'shType':
        return (user.shType || {}).shTypeName
      case 'status':
        return getStatus(user).text
      default:
        return;
    }
  }

  const toggle = (arr, d) => {
    let temp = [...arr.filter(t => t !== d)]
    if (arr.filter(t => t === d).length === 0) {
      temp.push(d)
    }
    return temp
  }

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

  const sortFunc = (field, n, o) => {
    const temp = [...list]
    temp.sort((a, b) => valueByField(a, field).toLowerCase() > valueByField(b, field).toLowerCase() ? o : -o)
    setList(temp)
  }

  const thClicked = (n, field) => {
    if (order[n] === 0 || order[n] === -1) {
      let temp = [0, 0, 0, 0, 0, 0, 0, 0]
      temp[n] = 1
      setOrder(temp)
      sortFunc(field, 0, 1)
    } else {
      let temp = [0, 0, 0, 0, 0, 0, 0, 0]
      temp[n] = -1
      setOrder(temp)
      sortFunc(field, 0, -1)
    }
  }
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
              <CheckBoxComponent
                checked={list.length === selected.length}
                indeterminate={list.length !== selected.length && selected.length !== 0}
                onChange={() => setSelected(() => {
                  if (selected.length !== list.length) {
                    return list.map(user => user.id)
                  } else {
                    return []
                  }
                })}
              />
            </th>
            <th onClick={() => thClicked(0, 'firstName')}>
              <div className={styles.arrow}>
                <span>First name</span>
                {order[0] !== 0 && <span><FontAwesomeIcon icon={order[0] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(1, 'lastName')}
            >
              <div className={styles.arrow}>
                <span>Last name</span>
                {order[1] !== 0 && <span><FontAwesomeIcon icon={order[1] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(2, 'projectTitle')}
            >
              <div className={styles.arrow}>
                <span>Project title</span>
                {order[2] !== 0 && <span><FontAwesomeIcon icon={order[2] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(3, 'projectOrg')}
            >
              <div className={styles.arrow}>
                <span>Project Org</span>
                {order[3] !== 0 && <span><FontAwesomeIcon icon={order[3] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(4, 'team')}
            >
              <div className={styles.arrow}>
                <span>Team</span>
                {order[4] !== 0 && <span><FontAwesomeIcon icon={order[4] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(5, 'shGroup')}
            >
              <div className={styles.arrow}>
                <span>SH Group</span>
                {order[5] !== 0 && <span><FontAwesomeIcon icon={order[5] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(6, 'shType')}
            >
              <div className={styles.arrow}>
                <span>SH Type</span>
                {order[6] !== 0 && <span><FontAwesomeIcon icon={order[6] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
            <th
              onClick={() => thClicked(7, 'status')}
            >
              <div className={styles.arrow}>
                <span>Status</span>
                {order[7] !== 0 && <span><FontAwesomeIcon icon={order[7] === 1 ? faAngleDown : faAngleUp} color="#6d6f94" /></span>}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((user, idx) =>
            <Fragment key={user.id}>
              <tr onClick={() => {
                let temp = toggle(detail, user.id)
                setDetail(temp)
              }}>
                <td>
                  <CheckBoxComponent
                    checked={selected.includes(user.id)}
                    onChange={(e) => {
                      let temp = toggle(selected, user.id)
                      console.log(temp)
                      setSelected(temp)
                    }}
                  />
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
      {selected.length > 0 && <div className={styles.toolbar}>
        <span className={styles.selected}>
          <CheckBoxComponent
            checked={list.length === selected.length}
            indeterminate={list.length !== selected.length && selected.length !== 0}
            onChange={() => setSelected(() => {
              if (selected.length !== list.length) {
                return list.map(user => user.id)
              } else {
                return []
              }
            })}
          />
          {`${selected.length} members selected`}
        </span>
        <div className={styles.actions}>
          <span><FontAwesomeIcon icon={faPaperPlane} className={styles.icon} />Send invite</span>
          <span><FontAwesomeIcon icon={faArchive} className={styles.icon} />Archive</span>
        </div>
      </div>}
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