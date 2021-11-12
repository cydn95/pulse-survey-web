import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { teamList, shgroupList, adminSetUserField, adminAddNewUSer } from 'Redux/actions'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import { faAngleRight, faAngleDown, faAngleUp, faPaperPlane, faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from 'Components/AddButton'
import Loading from 'Components/Loading'
import Input from 'Components/Input'
import Select from 'Components/Select'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'

const UserAdministration = ({ userList, currentProject, loading, getTeamList, getShGroupList, shgroupList, teamList, setUserField, addNewUser, profile }) => {
  const [order, setOrder] = useState([0, 0])
  const [filter, setFilter] = useState(['', '', '', '', '', ''])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState([])
  const [list, setList] = useState([])
  const [newUser, setNewUser] = useState({})
  useEffect(() => {
    getTeamList(currentProject.project, currentProject.id)
    getShGroupList(currentProject.id)
  }, [currentProject])

  const teamListManual = useCallback(() => {
    let temp = [];
    (userList.projectUser ? userList.projectUser : []).map(user => {
      if (valueByField(user, 'team') && !temp.includes(valueByField(user, 'team'))) {
        temp.push(valueByField(user, 'team'))
      }
    })
    return temp
  }, [userList])

  const shGroupListManual = useCallback(() => {
    let temp = [];
    (userList.projectUser ? userList.projectUser : []).map(user => {
      if (valueByField(user, 'shGroup') && !temp.includes(valueByField(user, 'shGroup'))) {
        temp.push(valueByField(user, 'shGroup'))
      }
    })
    return temp
  }, [userList])

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
    if (!user) {
      return {
        text: ''
      }
    }

    if (!user.shGroup || !user.id) {
      return {
        text: 'Not Started'
      }
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
    let temp = (userList.projectUser ? userList.projectUser : []).filter(
      user => (filter[0] === '' || valueByField(user, 'projectTitle') === filter[0])
        && (filter[1] === '' || valueByField(user, 'projectOrg') === filter[1])
        && (filter[2] === '' || valueByField(user, 'team') === filter[2])
        && (filter[3] === '' || valueByField(user, 'shGroup') === filter[3])
        && (filter[4] === '' || valueByField(user, 'shType') === filter[4])
        && (filter[5] === '' || valueByField(user, 'status') === filter[5])
    )
    setList(temp)
  }, [userList, filter])

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

  const setNewUserField = (field, value) => {
    let temp = { ...newUser }
    temp[field] = value
    setNewUser(temp)
  }

  const modalContent = () =>
    <div className={styles.modal}>
      <div>
        <p>First Name</p>
        <Input className={styles.input} value={(newUser.user || {}).first_name} onChange={(value, e) => {
          let temp = {
            ...(newUser.user || {}),
            first_name: value
          }
          setNewUserField('user', temp)
        }} />
      </div>
      <div>
        <p>Last Name</p>
        <Input className={styles.input} value={(newUser.user || {}).last_name} onChange={(value, e) => {
          let temp = {
            ...(newUser.user || {}),
            last_name: value
          }
          setNewUserField('user', temp)
        }} />
      </div>
      <div>
        <p>Email</p>
        <Input className={styles.input} value={(newUser.user || {}).email} onChange={(value, e) => {
          let temp = {
            ...(newUser.user || {}),
            email: value
          }
          setNewUserField('user', temp)
        }} />
      </div>
      <div>
        <p>User Org</p>
        <Input className={styles.input} value={((newUser.user || {}).organization || {}).name} onChange={(value, e) => {
          let temp = {
            ...(newUser.user || {}),
            organization: {
              name: value
            }
          }
          setNewUserField('user', temp)
        }} />
      </div>
      <div>
        <p>Project Org</p>
        <Input className={styles.input} value={(newUser.projectOrganization)} onChange={(value, e) => setNewUserField('projectOrganization', value)} />
      </div>
      <div>
        <p>Job Title</p>
        <Input className={styles.input} value={newUser.projectUserTitle} onChange={(value, e) => setNewUserField('projectUserTitle', value)} />
      </div>
      <div>
        <p>Role Description</p>
        <Input className={styles.input} value={newUser.projectUserRoleDesc} onChange={(value, e) => setNewUserField('projectUserRoleDesc', value)} />
      </div>
      <div>
        <p>Team</p>
        <Select className={styles.input} value={(newUser.team || {}).name} setSelected={(item) => {
          let temp = { ...newUser }
          temp.team = teamList.filter(team => team.name === item)[0]
          setNewUser(temp)
        }} items={teamList.map(team => team.name)} />
      </div>
      <div>
        <p>SH Group</p>
        <Select selected={(newUser.shGroup || {}).SHGroupName}
          noSelected="SH Group"
          setSelected={(item) => {
            let temp = { ...newUser }
            temp.shGroup = shgroupList.filter(sh => sh.SHGroupName === item)[0]
            setNewUser(temp)
          }}
          items={shgroupList.map(sh => sh.SHGroupName)}
        />
      </div>
      <CheckBoxComponent checked={newUser.sendInvite} label="Send Invite" onChange={(e) => {
        let temp = { ...newUser }
        if (e.target.checked) {
          temp.addByProjectUser = { user: profile }
        }
        temp.sendInvite = e.target.checked
        setNewUser(temp)
      }} />
    </div>
  return (
    <Fragment>
      {loading ?
        <Loading description="" /> :
        <Fragment>
          {(userList.projectUser ? userList.projectUser : []).length > 0 && <div className={styles.horizontalWrapper}>
            <div className={styles.individual}>
              <Counter count={userList.identifiedTeamMemberCnt ? userList.identifiedTeamMemberCnt : 0} description="Identified Team Members" />
              <Counter count={userList.identifiedStakeholderCnt ? userList.identifiedStakeholderCnt : 0} description="Identified Stakeholder" />
            </div>
            <div className={styles.individual}>
              <Counter count={userList.invitedTeamMemberCnt ? userList.invitedTeamMemberCnt : 0} description="Invited Team Members" />
              <Counter count={userList.invitedStakeholderCnt ? userList.invitedStakeholderCnt : 0} description="Invited Stakeholder" />
            </div>
            <div className={styles.total}>
              <Counter count={userList.totalIdentifiedCnt ? userList.totalIdentifiedCnt : 0} description="Total Identified" type="total" />
              <Counter count={userList.totalInvitedCnt ? userList.totalInvitedCnt : 0} description="Total Invited" type="total" />
            </div>
          </div>}
          <div className={styles.header}>
            <h3>Member list</h3>
            <AddButton
              text="member"
              outlined={true}
              className={styles.alignRight}
              open={open}
              setOpen={() => setOpen(true)}
              setClose={() => setOpen(false)}
              handleAdd={() => {
                setOpen(false)
                setNewUser({})
                addNewUser({ ...newUser, created_at: new Date(), updated_at: new Date() })
              }}
              content={modalContent}
            />
          </div>
          {(userList.projectUser ? userList.projectUser : []).length !== 0 ? <table style={{ textAlign: 'left' }} className={styles.dataTable}>
            <thead>
              <tr>
                <th>
                  <CheckBoxComponent
                    checked={(userList.projectUser ? userList.projectUser : []).length === selected.length}
                    indeterminate={list.length !== selected.length && selected.length !== 0}
                    onChange={() => setSelected(() => {
                      if (selected.length !== list.length) {
                        return list.map((user, idx) => idx)
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
                <th>
                  <Select selected={filter[0]}
                    noSelected="Project title"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[0] = item
                      setFilter(temp)
                    }}
                    items={(() => {
                      let temp = [];
                      (userList.projectUser ? userList.projectUser : []).map(user => {
                        if (valueByField(user, 'projectTitle') && !temp.includes(valueByField(user, 'projectTitle'))) {
                          temp.push(valueByField(user, 'projectTitle'))
                        }
                      })
                      return temp
                    })()}
                  />
                </th>
                <th>
                  <Select selected={filter[1]}
                    noSelected="Project Org"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[1] = item
                      setFilter(temp)
                    }}
                    items={(() => {
                      let temp = [];
                      (userList.projectUser ? userList.projectUser : []).map(user => {
                        if (valueByField(user, 'projectOrg') && !temp.includes(valueByField(user, 'projectOrg'))) {
                          temp.push(valueByField(user, 'projectOrg'))
                        }
                      })
                      return temp
                    })()}
                  />
                </th>
                <th>
                  <Select selected={filter[2]}
                    noSelected="Team"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[2] = item
                      setFilter(temp)
                    }}
                    items={teamList.map(team => team.name)}
                  />
                </th>
                <th>
                  <Select selected={filter[3]}
                    noSelected="SH Group"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[3] = item
                      setFilter(temp)
                    }}
                    items={(() => {
                      let temp = [];
                      (userList.projectUser ? userList.projectUser : []).map(user => {
                        if (valueByField(user, 'shGroup') && !temp.includes(valueByField(user, 'shGroup'))) {
                          temp.push(valueByField(user, 'shGroup'))
                        }
                      })
                      return temp
                    })()}
                  />
                </th>
                <th>
                  <Select selected={filter[4]}
                    noSelected="SH Type"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[4] = item
                      setFilter(temp)
                    }}
                    items={(() => {
                      let temp = [];
                      (userList.projectUser ? userList.projectUser : []).map(user => {
                        if (valueByField(user, 'shType') && !temp.includes(valueByField(user, 'shType'))) {
                          temp.push(valueByField(user, 'shType'))
                        }
                      })
                      return temp
                    })()}
                  />
                </th>
                <th>
                  <Select selected={filter[5]}
                    noSelected="Status"
                    setSelected={(item) => {
                      let temp = [...filter]
                      temp[5] = item
                      setFilter(temp)
                    }}
                    items={(() => {
                      let temp = [];
                      (userList.projectUser ? userList.projectUser : []).map(user => {
                        if (valueByField(user, 'status') && !temp.includes(valueByField(user, 'status'))) {
                          temp.push(valueByField(user, 'status'))
                        }
                      })
                      return temp
                    })()}
                  />
                </th>
              </tr>
            </thead>
            {list.length > 0 ? <tbody>
              {list.map((user, idx) =>
                <Fragment key={idx}>
                  <tr onClick={() => {
                    let temp = toggle(detail, idx)
                    setDetail(temp)
                  }}>
                    <td>
                      <CheckBoxComponent
                        checked={selected.includes(idx)}
                        onChange={(e) => {
                          let temp = toggle(selected, idx)
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
                    <td><div className={styles.arrow}>{getStatus(user).text}<span><FontAwesomeIcon icon={detail.includes(idx) ? faAngleDown : faAngleRight} color="#6d6f94" /></span></div></td>
                  </tr>
                  {detail.includes(idx) && <tr>
                    <td colSpan={9} style={{ padding: '0px' }}>
                      <UserCard key={`${idx}-${idx}`} user={user} idx={idx} setUserField={setUserField} />
                    </td>
                  </tr>}
                </Fragment>
              )}
            </tbody> : <tr><td colSpan={9}><h3 style={{ padding: '16px 24px' }}>No User</h3></td></tr>}
          </table> : <h3>No User</h3>}
          {selected.length > 0 && <div className={styles.toolbar}>
            <span className={styles.selected}>
              <CheckBoxComponent
                checked={list.length === selected.length}
                indeterminate={list.length !== selected.length && selected.length !== 0}
                onChange={() => setSelected(() => {
                  if (selected.length !== list.length) {
                    return list.map((user, idx) => idx)
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
      }
    </Fragment>
  )
}

const mapStateToProps = ({ admin, common, account }) => {
  const { userList, loading, currentProject } = admin;
  const { teamList, shgroupList } = common;
  const { profile } = account;
  return {
    userList,
    loading,
    teamList,
    shgroupList,
    currentProject,
    profile,
  }
}

export default connect(mapStateToProps, {
  getTeamList: teamList,
  getShGroupList: shgroupList,
  setUserField: adminSetUserField,
  addNewUser: adminAddNewUSer,
})(UserAdministration)