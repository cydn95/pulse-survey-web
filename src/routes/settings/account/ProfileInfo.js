import React, { } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

function ProfileInfo() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <div className={styles["form-wrapper"]}>
      <h2>Edit your profile</h2>
      <form className={styles.form} onSubmit={(e) => {
        handleSubmit(onSubmit)()
        e.preventDefault()
      }}>
        <Input
          className={styles.input}
          label="First Name"
          name="firstName"
          defaultValue="Robert"
          ref={register({ required: true })}
        />
        {errors.firstName && <span className={styles.error}>This field is required</span>}
        <Input
          className={styles.input}
          label="Last Name"
          name="lastName"
          defaultValue="Blogs"
          ref={register({ required: true })}
        />
        {errors.lastName && <span className={styles.error}>This field is required</span>}
        <Input
          className={styles.input}
          label="Email"
          name="email"
          defaultValue="kingofdelphi1992@gmail.com"
          ref={register({ required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
        />
        {errors.email && <span className={styles.error}>This field is invalid</span>}
        <Input
          className={styles.input}
          label="Team"
          name="team"
          defaultValue="Team Management"
          ref={register}
        />
        <Input
          className={styles.input}
          label="Organization"
          name="team"
          defaultValue="Pulse"
          ref={register}
        />
        {errors.email && <span className={styles.error}>This field is invalid</span>}
        <div className={styles.actions}>
          <Button default={false} onClick={() => alert('cancel')}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Update</Button>
        </div>
      </form >
    </div>
  )
}

export default ProfileInfo
