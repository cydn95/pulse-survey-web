import React, { Fragment, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { adminSetUserField, adminAddNewUSer, adminSendBulkInvitation, adminBulkArchiveUser } from 'Redux/actions'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import { faAngleRight, faAngleDown, faAngleUp, faPaperPlane, faArchive, faCog, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from 'Components/AddButton'
import Loading from 'Components/Loading'
import "react-notifications/lib/notifications.css";
import {
  NotificationManager,
} from "react-notifications";
import Input from 'Components/Input'
import Button from 'Components/Button'
import Select from 'Components/Select'
import {
  ModalWrapper,
  ModalHeader,
  ModalFooter,
} from './UserCard/usercard.styles'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'

const UserAdministration = ({
  userList,
  currentProject,
  loading,
  shgroupList,
  teamList,
  setUserField,
  addNewUser,
  profile,
  sendBulkInvitation,
  sendBulkArchiveUser,
  surveyId
}) => {
  const shTypes = useMemo(() => {
    return [
      {
        "id": 55,
        "shTypeName": "Team Member",
        "survey": 59
      },
      {
        "id": 56,
        "shTypeName": "Stakeholder",
        "survey": 59
      },
    ]
  }, [surveyId])
  const tableRef = useRef(null)
  const tableWrapperRef = useRef(null)
  const [order, setOrder] = useState([0, 0])
  const [config, setConfig] = useState(false)
  const [filter, setFilter] = useState(['', '', '', '', '', ''])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState(null)
  const [list, setList] = useState([])
  const [newUser, setNewUser] = useState({})
  const [confirm, setConfirm] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollX, setScrollX] = useState(0)
  const [clientX, setClientX] = useState(0)
  const [validation, setValidation] = useState({})

  const onMouseDown = e => {
    setIsScrolling(true)
    setClientX(e.clientX)
  };

  const onMouseUp = () => {
    setIsScrolling(false)
  };

  const onMouseMove = e => {
    if (isScrolling) {
      if (scrollX + e.clientX - clientX >= tableWrapperRef.current.offsetWidth) {
        return;
      }
      if (scrollX + e.clientX - clientX <= 0) {
        setScrollX(0)
        setClientX(e.clientX)
        tableWrapperRef.current.scrollLeft = 0;
        return;
      }
      tableWrapperRef.current.scrollLeft = scrollX + e.clientX - clientX;
      setScrollX(scrollX + e.clientX - clientX);
      setClientX(e.clientX);
    }
  };

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

    if (!user.id) {
      return {
        text: 'Unsaved'
      }
    }

    if (!user.shGroup) {
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

  const callbackSendInvte = (success) => {
    if (success) {
      NotificationManager.success(`Invitation sent to ${selected.length === 1 ? "a user" : selected.length + "users"} successfully`, "");
      setSelected([])
    } else {
      NotificationManager.error("Something went wrong", "");
    }
  }

  const callbackArchiveUser = (success) => {
    if (success) {
      NotificationManager.success(`Archived ${selected.length === 1 ? "a user" : selected.length + "users"} successfully`, "");
      setSelected([])
    } else {
      NotificationManager.error("Something went wrong", "");
    }
  }

  const sortFunc = (field, n, o) => {
    const temp = [...list]
    temp.sort((a, b) => valueByField(a, field).toLowerCase() > valueByField(b, field).toLowerCase() ? o : -o)
    setList(temp)
  }

  const thClicked = (n, field) => {
    if (order[n] === 0 || order[n] === -1) {
      let temp = [0, 0]
      temp[n] = 1
      setOrder(temp)
      sortFunc(field, 0, 1)
    } else {
      let temp = [0, 0]
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

  const validateWithLength = (value, max, min) => {
    if (!value) return false
    if (value.length > max || value.length < min) {
      return false;
    }
    return true;
  }

  const validateFields = () => {
    if (!newUser.user) {
      setValidation({
        all: 'All fields are required'
      })
      return false
    } else {
      setValidation({
        all: ''
      })
    }
    if (
      (!validateWithLength(newUser.user.first_name, 50, 2))
    ) {
      setValidation({
        first_name: 'Firstname must be a minimum of 2 characters and a maximum of 50 charactres.'
      })
      return false
    } else {
      setValidation({
        first_name: ''
      })
    }
    if (
      (!validateWithLength(newUser.user.last_name, 50, 2))
    ) {
      setValidation({
        last_name: 'Lastname must be a minimum of 2 characters and a maximum of 50 charactres.'
      })
      return false
    } else {
      setValidation({
        last_name: ''
      })
    }
    if (
      (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUser.user.email))
    ) {
      setValidation({
        email: 'Email must be valid'
      })
      return false
    } else {
      setValidation({
        email: ''
      })
    }
    if (
      (!validateWithLength((newUser.user.organization || {}).name, 100, 1))
    ) {
      setValidation({
        userOrg: 'User Organization must be a maximum of 100 charactres.'
      })
      return false
    } else {
      setValidation({
        userOrg: ''
      })
    }
    if (
      (!validateWithLength(newUser.projectOrganization, 100, 1))
    ) {
      setValidation({
        pOrg: 'Project Organization must be a maximum of 100 charactres.'
      })
      return false
    } else {
      setValidation({
        pOrg: ''
      })
    }
    if (
      (!validateWithLength(newUser.projectUserTitle, 100, 1))
    ) {
      setValidation({
        pTitle: 'Project Title must be a maximum of 100 charactres.'
      })
      return false
    } else {
      setValidation({
        pTitle: ''
      })
    }
    if (
      (!validateWithLength(newUser.projectUserRoleDesc, 255, 1))
    ) {
      setValidation({
        roleDesc: 'Role Description must be a maximum of 255 charactres.'
      })
      return false
    } else {
      setValidation({
        roleDesc: ''
      })
    }
    if (
      (newUser.team === undefined)
    ) {
      setValidation({
        team: 'Team is required.'
      })
      return false
    } else {
      setValidation({
        team: ''
      })
    }
    if (
      (newUser.shGroup === undefined)
    ) {
      setValidation({
        shGroup: 'SHGroup is required.'
      })
      return false
    } else {
      setValidation({
        shGroup: ''
      })
    }
    if (
      (newUser.shType === undefined)
    ) {
      setValidation({
        shType: 'SHType is required.'
      })
      return false
    } else {
      setValidation({
        shType: ''
      })
    }
    return true;
  }

  const modalContent = () =>
  <div style={{maxHeight: '60vh', overflow: 'auto'}}>
    <div className={styles.modal}>
      <div>
        {validation.all && <p className={styles.error}>{validation.all}</p>}
        <p>First Name</p>
        <Input className={styles.input} value={(newUser.user || {}).first_name} onChange={(value, e) => {
          let temp = {
            ...(newUser.user || {}),
            first_name: value
          }
          setNewUserField('user', temp)
        }} />
        <p className={styles.error}>{validation.first_name}</p>
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
        <p className={styles.error}>{validation.last_name}</p>
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
        <p className={styles.error}>{validation.email}</p>
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
        <p className={styles.error}>{validation.userOrg}</p>
      </div>
      <div>
        <p>Project Org</p>
        <Input className={styles.input} value={(newUser.projectOrganization)} onChange={(value, e) => setNewUserField('projectOrganization', value)} />
        <p className={styles.error}>{validation.pOrg}</p>
      </div>
      <div>
        <p>Project Title</p>
        <Input className={styles.input} value={newUser.projectUserTitle} onChange={(value, e) => setNewUserField('projectUserTitle', value)} />
        <p className={styles.error}>{validation.pTitle}</p>
      </div>
      <div>
        <p>Role Description</p>
        <Input className={styles.input} value={newUser.projectUserRoleDesc} onChange={(value, e) => setNewUserField('projectUserRoleDesc', value)} />
        <p className={styles.error}>{validation.roleDesc}</p>
      </div>
      <div>
        <p>Team</p>
        <Select className={styles.select} selected={(newUser.team || {}).name} setSelected={(item) => {
          let temp = { ...newUser }
          console.log('temp', temp)
          console.log('item', item)
          temp.team = teamList.filter(team => team.name === item)[0]
          console.log('temp', temp)
          setNewUser(temp)
        }} items={teamList.map(team => team.name)} />
        <p className={styles.error}>{validation.team}</p>
      </div>
      <div>
        <p>SH Group</p>
        <Select className={styles.select} selected={(newUser.shGroup || {}).SHGroupName}
          noSelected="SH Group"
          setSelected={(item) => {
            let temp = { ...newUser }
            temp.shGroup = shgroupList.filter(sh => sh.SHGroupName === item)[0]
            setNewUser(temp)
          }}
          items={shgroupList.map(sh => sh.SHGroupName)}
        />
        <p className={styles.error}>{validation.shGroup}</p>
      </div>
      <div>
        <p>SH Type</p>
        <Select className={styles.select} selected={(newUser.shType || {}).shTypeName}
          noSelected="SH Type"
          setSelected={(item) => {
            let temp = { ...newUser }
            temp.shType = shTypes.filter(sh => sh.shTypeName === item)[0]
            setNewUser(temp)
          }}
          items={shTypes.map(sh => sh.shTypeName)}
        />
        <p className={styles.error}>{validation.shType}</p>
      </div>
      <CheckBoxComponent checked={newUser.sendInvite} label="Invite" onChange={(e) => {
        setNewUserField('sendInvite', e.target.checked)
      }} />
    </div>
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
                if (validateFields()) {
                  setOpen(false)
                  setNewUser({})
                  let admin = userList.projectUser.filter(u => u.user.id === profile.id)[0]
                  addNewUser({
                    ...newUser,
                    created_at: new Date(),
                    updated_at: new Date(),
                    addByProjectUser: {
                      id: admin.id,
                      user: admin.user
                    },
                    sendInvite: newUser.sendInvite || false
                  })
                }
              }}
              content={modalContent}
            />
          </div>
          {(userList.projectUser ? userList.projectUser : []).length !== 0 ?
            <div
              className={styles.tableWrapper}
              ref={tableWrapperRef}
              style={{ height: tableRef.current && tableRef.current.scrollHeight + 20 }}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            >
              <table className={styles.dataTable} ref={tableRef}>
                <thead>
                  <tr>
                    <th>
                      <CheckBoxComponent
                        checked={(userList.projectUser ? userList.projectUser : []).length === selected.length}
                        indeterminate={list.length !== selected.length && selected.length !== 0}
                        onChange={() => setSelected(() => {
                          if (selected.length !== list.length) {
                            return list.map((user, idx) => user.id)
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
                            return user
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
                            return user
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
                            return user
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
                            return user
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
                            return user
                          })
                          return temp
                        })()}
                      />
                    </th>
                  </tr>
                  <tr style={{ background: 'white' }} onClick={() => setConfig(true)}>
                    <td colSpan={9}>
                      <div className={styles.config}>
                        <FontAwesomeIcon icon={faCog} className={styles.icon} color={'rgb(109, 111, 148)'} />
                        <div className={styles.content}>
                          <span>{`Filters: ${filter.filter(f => f !== '').join(', ')}`}</span>
                          <span>{`Sort by: ${order.map((o, idx) => (o !== 0 && idx === 0) ? 'First Name' : (o !== 0 && idx === 1) ? 'Last Name' : '').filter(o => o !== '')[0] || ''}`}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ?
                    list.map((user, idx) =>
                      <Fragment key={idx}>
                        <tr className={styles.desktop} onClick={() => {
                          if (detail === user.id) {
                            setDetail(null)
                          } else {
                            setDetail(user.id)
                          }
                          // let temp = toggle(detail, idx)
                        }}>
                          <td onClick={(e) => e.stopPropagation()}>
                            <CheckBoxComponent
                              checked={selected.includes(user.id)}
                              onChange={(e) => {
                                let temp = toggle(selected, user.id)
                                setSelected(temp)
                              }}
                            />
                          </td>
                          <td>{user.user.first_name}</td>
                          <td>{user.user.last_name}</td>
                          <td>
                            <Input
                              value={user.projectUserTitle}
                              onChange={(value, e) => setUserField(idx, 'projectUserTitle', value)}
                              className={styles.basicInput}
                            />
                          </td>
                          <td>
                            <Input
                              value={user.projectOrganization}
                              className={styles.basicInput}
                              onChange={(value, e) => setUserField(idx, 'projectOrganization', value)}
                            />
                          </td>
                          <td>
                            <Select
                              selected={(user.team || {}).name}
                              setSelected={(item) => setUserField(idx, 'team', teamList.filter(team => team.name === item)[0])}
                              className={styles.basicInput}
                              items={teamList.map(team => team.name)}
                            />
                          </td>
                          <td>
                            <Select
                              selected={(user.shGroup || {}).SHGroupName}
                              setSelected={(item) => setUserField(idx, 'shGroup', shgroupList.filter(sh => sh.SHGroupName === item)[0])}
                              className={styles.basicInput}
                              items={shgroupList.map(sh => sh.SHGroupName)}
                            />
                          </td>
                          <td>
                            <Select
                              selected={(user.shType || {}).shTypeName}
                              setSelected={(value) => setUserField(idx, 'shType', shTypes.filter(sh => value === sh.shTypeName)[0])}
                              className={styles.basicInput}
                              items={shTypes.map(sh => sh.shTypeName)}
                            />
                          </td>
                          <td><div className={styles.arrow}>{getStatus(user).text}<span><FontAwesomeIcon icon={detail === user.id ? faAngleDown : faAngleRight} color="#6d6f94" /></span></div></td>
                        </tr>
                        <tr className={styles.mobile} onClick={() => {
                          if (detail === user.id) {
                            setDetail(null)
                          } else {
                            setDetail(user.id)
                          }
                          // let temp = toggle(detail, idx)
                        }}>
                          <td>
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                let temp = toggle(selected, user.id)
                                setSelected(temp)
                              }}
                              className={classnames(styles.check, styles[selected.includes(user.id) ? 'visible' : 'hidden'])}>
                              <FontAwesomeIcon icon={faCheck} color="white" />
                            </span>
                          </td>
                          <td colSpan={7} style={{ padding: '8px 20px' }}>
                            <div>
                              <h3>{user.user.first_name} {user.user.last_name}</h3>
                              <span>{`${user.projectUserTitle} ${user.projectOrganization ? ', ' + user.projectOrganization : ''} ${(user.shType || {}).shTypeName ? ' / ' + (user.shType || {}).shTypeName : ''}`}</span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}><FontAwesomeIcon icon={detail === user.id ? faAngleDown : faAngleRight} color="#6d6f94" /></td>
                        </tr>
                        {detail === user.id && <tr>
                          <td colSpan={9} style={{ padding: '0px' }}>
                            <UserCard
                              key={`${idx}-${idx}`}
                              user={user} idx={idx}
                              setUserField={setUserField}
                              open={detail}
                              setOpen={setDetail}
                              shTypes={shTypes}
                            />
                          </td>
                        </tr>}
                      </Fragment>
                    ) : <tr>
                      <td colSpan={9}>
                        <h3 style={{ padding: '16px 24px' }}>
                          No User
                        </h3>
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div> :
            <h3>No User</h3>}
          {selected.length > 0 && <div className={styles.toolbar}>
            <span className={styles.selected}>
              <CheckBoxComponent
                checked={list.length === selected.length}
                indeterminate={list.length !== selected.length && selected.length !== 0}
                onChange={() => setSelected(() => {
                  if (selected.length !== list.length) {
                    return list.map((user, idx) => user.id)
                  } else {
                    return []
                  }
                })}
              />
              {`${selected.length} member${selected.length > 1 ? 's':''} selected`}
            </span>
            <div className={styles.actions}>
              <span style={{ cursor: 'pointer', color: selected.includes(undefined) && 'gray' }} onClick={() => {
                if(!selected.includes(undefined))
                  sendBulkInvitation(selected, callbackSendInvte)
              }}><FontAwesomeIcon icon={faPaperPlane} className={styles.icon} color={selected.includes(undefined) && 'gray'} />Send invite</span>
              <span style={{ cursor: 'pointer', color: selected.includes(undefined) && 'gray' }} onClick={() => {
                if(!selected.includes(undefined))
                  setConfirm(true)
              }}><FontAwesomeIcon icon={faArchive} className={styles.icon} color={selected.includes(undefined) && 'gray'} />Archive</span>
            </div>
            {console.log('selected', selected)}
            {selected.includes(undefined) && <div className={styles.selectError}>You selected unsaved members</div>}
          </div>}
        </Fragment>
      }
      {config && <ModalWrapper>
        <div className={styles.configContent}>
          <ModalHeader>
            <h2>Filtering and Sorting</h2>
            <span onClick={() => setConfig(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <div className={styles.configBody}>
            <Select selected={order[0] === 0 ? '' : order[0] === 1 ? 'ASC' : 'DESC'}
              noSelected="First Name"
              setSelected={(item) => {
                let temp = [0, 0]
                let data = item === "ASC" ? 1 : item === "DESC" ? -1 : 0
                temp[0] = data
                setOrder(temp)
                sortFunc('firstName', 0, data)
              }}
              items={["ASC", "DESC"]}
            />
            <Select selected={order[1] === 0 ? '' : order[1] === 1 ? 'ASC' : 'DESC'}
              noSelected="Last Name"
              setSelected={(item) => {
                let temp = [0, 0]
                let data = item === "ASC" ? 1 : item === "DESC" ? -1 : 0
                temp[1] = data
                setOrder(temp)
                sortFunc('lastName', 0, data)
              }}
              items={["ASC", "DESC"]}
            />
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
                  return user;
                })
                return temp
              })()}
            />
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
                  return user
                })
                return temp
              })()}
            />
            <Select selected={filter[2]}
              noSelected="Team"
              setSelected={(item) => {
                let temp = [...filter]
                temp[2] = item
                setFilter(temp)
              }}
              items={teamList.map(team => team.name)}
            />
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
                  return user
                })
                return temp
              })()}
            />
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
                  return user
                })
                return temp
              })()}
            />
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
                  return user
                })
                return temp
              })()}
            />
          </div>
        </div>
      </ModalWrapper>}
      {confirm && <ModalWrapper>
        <div className={styles.configContent}>
          <ModalHeader>
            <h2>Confirm Modal</h2>
            <span onClick={() => setConfig(false)}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <div className={styles.configBody}>
            <p>Are you sure to archive selected users?</p>
          </div>
          <ModalFooter>
            <span onClick={() => setConfirm(false)}>Cancel</span>
            <Button className="btn" onClick={() => {
              sendBulkArchiveUser(selected, callbackArchiveUser)
              setConfirm(false);
            }}>Save</Button>
          </ModalFooter>
        </div>
      </ModalWrapper>}
    </Fragment>
  )
}

const mapStateToProps = ({ admin, common, account }) => {
  const { userList, loading, currentProject, surveyId } = admin;
  const { teamList, shgroupList } = common;
  const { profile } = account;
  return {
    userList,
    loading,
    teamList,
    shgroupList,
    currentProject,
    profile,
    surveyId,
  }
}

export default connect(mapStateToProps, {
  setUserField: adminSetUserField,
  addNewUser: adminAddNewUSer,
  sendBulkInvitation: adminSendBulkInvitation,
  sendBulkArchiveUser: adminBulkArchiveUser,
}, null, { forwardRef: true })(UserAdministration)