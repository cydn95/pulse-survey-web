import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: '',
      file: null
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      imgSrc: props.profile.avatar
    });
  }

  handleChangeFile = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader();
    const thisObj = this;
    reader.onload = function (e) {
      thisObj.setState({
        imgSrc: e.target.result
      });
    }
    reader.readAsDataURL(file);
    this.setState({
      file
    });
  }

  handleSubmit = () => {
    const { onChangeAvatar, profile } = this.props;
    const data = new FormData();
    data.append("name", this.state.file);
    data.append("user", profile.id)
    onChangeAvatar(data);
  }

  render() {
    return (
      <div className={styles["form-wrapper"]}>
        <h2>Profile Photo</h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles['upload-image']}>
            <img src={this.state.imgSrc} alt=""/>
            <input
              className={styles.input}
              type="file"
              name="avatar"
              onChange={(e) => this.handleChangeFile(e)}
            />
          </div>
          <div className={styles.actions}>
            <Button onClick={e => this.handleSubmit()}>Upload</Button>
          </div>
        </form>
      </div>
    )
  }
  
}

export default UploadImage
