import React, { } from 'react';

import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import UploadImage from './UploadImage'

import styles from './styles.scss'

function Account() {
  return (
    <div className={styles.main}>
      <ProfileInfo className="profile-info" />
      <UploadImage className="profile-pic" />
      <ChangePassword className="change-password" />
    </div>
  )
}

export default Account