import React from "react";

import Input from "Components/Input";
import Button from "Components/Button";

import styles from "./form.scss";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onChangePassword } = this.props;
    onChangePassword(this.state.password, this.state.confirmPassword);
  };

  handleInputChange = (value, e) => {
    this.setState({
      [e.target.name]: value,
    });
  };

  handleReset = () => {
    this.setState({
      password: "",
      confirmPassword: "",
    });
  }

  render() {
    return (
      <div className={styles["form-wrapper"]}>
        <h2>Change Password</h2>
        <form className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
          <Input
            className={styles.input}
            type="password"
            label="New Password"
            name="password"
            onChange={(value, e) => this.handleInputChange(value, e)}
            onFocus={() => {}}
            onBlur={() => {}}
            value={this.state.password}
          />
          <Input
            type="password"
            className={styles.input}
            label="Confirm Password"
            name="confirmPassword"
            onChange={(value, e) => this.handleInputChange(value, e)}
            onFocus={() => {}}
            onBlur={() => {}}
            value={this.state.confirmPassword}
          />
          <div className={styles.actions}>
            <Button default={false} onClick={(e) => this.handleReset()}>
              Cancel
            </Button>
            <Button type="submit">Change</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
