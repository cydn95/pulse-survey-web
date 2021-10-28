import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { teamList, shgroupList, adminSetUserField } from 'Redux/actions'
import Loading from 'Components/Loading'
import AddButton from 'Components/AddButton'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'

const UserAdministration = ({ userList, project, loading, getTeamList, getShGroupList, shgroupList, teamList, setUserField }) => {
  const [selected, setSelected] = useState(0)
  const [list, setList] = useState([])
  useEffect(() => {
    getTeamList(project.id)
    getShGroupList(project.surveyId)
  }, [project])

  useEffect(() => {
    setList(userList.projectUser ? userList.projectUser : [])
  }, [userList])
  return (
    <Fragment>
      {loading ? <Loading description="" /> : <Fragment>
        <AddButton text="User" outlined={true} className={styles.alignRight} />
        {list.length > 0 && <div className={styles.horizontalWrapper}>
          <div className={styles.individual}>
            <Counter count={list.filter(user => user.shType.shTypeName === "Team Member").length} description="Identified Team Members" />
            <Counter count={list.filter(user => user.shType.shTypeName === "Stakeholder").length} description="Identified Stakeholder" />
          </div>
          <div className={styles.individual}>
            <Counter count={list.filter(user => user.shType.shTypeName === "Team Member" && user.sendInvite).length} description="Invited Team Members" />
            <Counter count={list.filter(user => user.shType.shTypeName === "Stakeholder" && user.sendInvite).length} description="Invited Stakeholder" />
          </div>
          <div className={styles.total}>
            <Counter count={list.length} description="Total Identified" type="total" />
            <Counter count={list.filter(user => user.sendInvite).length} description="Total Invited" type="total" />
          </div>
        </div>}
        {list.length !== 0 ? list.map((user, idx) =>
          <UserCard key={`${idx}-${user.id}`} user={user} teamList={teamList} shgroupList={shgroupList} setUserField={setUserField} />
        ) : <h3>No User</h3>}
      </Fragment>}

    </Fragment>
  )
}

const mapStateToProps = ({ admin, common }) => {
  const { userList, loading } = admin;
  const { teamList, shgroupList } = common;
  return {
    userList,
    loading,
    teamList,
    shgroupList,
  }
}

export default connect(mapStateToProps, {
  getTeamList: teamList,
  getShGroupList: shgroupList,
  setUserField: adminSetUserField,
})(UserAdministration)