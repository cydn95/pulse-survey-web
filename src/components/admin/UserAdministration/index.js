import React, { Fragment, useState } from 'react'
import Counter from './Counter'
import UserCard from './UserCard'
import styles from './styles.scss'

const UserAdministration = () => {
  const [selected, setSelected] = useState(0)
  return (
    <Fragment>
      <div className={styles.horizontalWrapper}>
        <div className={styles.individual}>
          <Counter count={30} description="Identified Team Members" />
          <Counter count={25} description="Identified Stakeholder" />
        </div>
        <div className={styles.individual}>
          <Counter count={20} description="Invited Team Members" />
          <Counter count={19} description="Invited Stakeholder" />
        </div>
        <div className={styles.total}>
          <Counter count={55} description="Total Identified" type="total" />
          <Counter count={39} description="Total Invited" type="total" />
        </div>
      </div>
      <div>
        <UserCard />
      </div>
    </Fragment>
  )
}

export default UserAdministration