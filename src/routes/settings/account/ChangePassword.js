import React, { } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

function ChangePassword() {
  const { register, handleSubmit, watch, errors } = useForm()

  const password = watch('password')

  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (

    <div className={styles["form-wrapper"]}>
      <h2>Change Password</h2>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          className={styles.input}
          type="password"
          label="New Password"
          name="password"
          defaultValue="passw"
          ref={register({ required: true })}
        />
        {errors.password && <div className={styles.error}>This field is required</div>}
        <Input
          type="password"
          className={styles.input}
          label="Confirm Password"
          name="confirmPassword"
          defaultValue="passw"
          ref={register({ 
            validate: value => {
              if (value === "") {
                return "This field is required.";
              }
              return value === password || "Passwords don't match."
            }
          })}
        />
        {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword.message}</div>}
        <div className={styles.actions}>
          <Button default={false} onClick={() => alert('cancel')}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Change</Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword