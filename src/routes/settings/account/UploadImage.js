import React, { } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

function UploadImage() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (

    <div className={styles["form-wrapper"]}>
      <h2>Profile Photo</h2>
      <form className={styles.form} onSubmit={(e) => {
        handleSubmit(onSubmit)()
        e.preventDefault()
      }}>
        <Input
          className={styles["upload-image"]}
          type="file"
          name="image"
          ref={register({ required: true })}
        />
        {errors.image && <span className={styles.error}>This field is required</span>}
        <div className={styles.actions}>
          <Button onClick={handleSubmit(onSubmit)}>Upload</Button>
        </div>
      </form>
    </div>
  )
}

export default UploadImage
