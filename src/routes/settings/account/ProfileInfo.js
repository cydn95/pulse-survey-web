import React, { } from 'react';
import { useForm } from 'react-hook-form'

import Input from "Components/Input"
import Button from "Components/Button"

import styles from './form.scss'

class ProfileInfo extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      firstName: '',
      lastName: '',
      team: '',
      organization: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState ({
      ...props.profile
    });
  }

  handleReset = e => {
    this.setState({
      id: 0,
      firstName: '',
      lastName: '',
      team: '',
      organization: ''
    })
  }
  
  handleSubmit = () => {
    const { onChangeProfile } = this.props;
    onChangeProfile({
      ...this.state
    });
  }

  handleInputChange = (value, e) => {
    this.setState({
      [e.target.name]: value
    });
  }

  render() {
    return (
      <div className={styles['form-wrapper']}>
        <h2>Edit your profile</h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input
            className={styles.input}
            label="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={(value, e) => this.handleInputChange(value, e)}
          />
          <Input
            className={styles.input}
            label="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={(value, e) => this.handleInputChange(value, e)}
          />
          {/* <Input
            className={styles.input}
            label="Email"
            name="email"
            value={this.state.email}
            onChange={(value, e) => this.handleInputChange(value, e)}
          /> */}
          <Input
            className={styles.input}
            label="Team"
            name="team"
            value={this.state.team}
            onChange={(value, e) => this.handleInputChange(value, e)}
          />
          <Input
            className={styles.input}
            label="Organization"
            name="organization"
            value={this.state.organization}
            onChange={(value, e) => this.handleInputChange(value, e)}
          />
          <div className={styles.actions}>
            <Button default={false} onClick={e => this.handleReset()}>Cancel</Button>
            <Button type="submit" onClick={e => this.handleSubmit()}>Update</Button>
          </div>
        </form >
      </div>
    )
  }
}

export default ProfileInfo
