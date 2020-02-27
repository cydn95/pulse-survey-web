import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

function UploadImage() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => {
    console.log(data)
    alert('process file...')
  }

  const [imgSrc, setImgSrc] = useState("/assets/img/profile-pic-l-2.jpg")

  return (

    <div className={styles["form-wrapper"]}>
      <h2>Profile Photo</h2>
      <form className={styles.form} onSubmit={(e) => {
        handleSubmit(onSubmit)()
        e.preventDefault()
      }}>
        <div className={styles['upload-image']}>
          <img src={imgSrc} />
          <Input
            className={styles.input}
            type="file"
            name="image"
            ref={register({ required: true })}
            onChange={(value, event) => {
              const file = event.target.files[0]
              const reader = new FileReader();

              reader.onload = function (e) {
                setImgSrc(e.target.result);
              }
              reader.readAsDataURL(file);
            }}
          />
        </div>
        {errors.image && <span className={styles.error}>This field is required</span>}
        <div className={styles.actions}>
          <Button onClick={handleSubmit(onSubmit)}>Upload</Button>
        </div>
      </form>
    </div>
  )
}

export default UploadImage
