import React, {} from "react";
import { Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import classnames from "classnames";

import styles from './styles.scss';
import LeftRightContainer from "../../components/LeftRightContainer";

function ForgotPasswordLayout() {
  return (
    <LeftRightContainer>
      <h2>Reset password</h2>
      <p className="white">
        Enter your username or email to reset your password.
You will receive an email with instructions on how to reset your password.
            If you are experiencing problems resetting your password&nbsp;
              <a href='#' className={styles.link}>contact us</a> or <a className={styles.link} href='#'>send us an email</a>.
              <br></br>
        <br></br>
        If you are not a member, please{" "}
        <NavLink to={`/register`} className={classnames("white", styles.link)}>
          register
              </NavLink>
      </p>
      <label>USERNAME or EMAIL</label>
      <Input
        type="text"
        name="username_or_email"
        onChange={e => console.log(e.target.value)}
      />
      <div className={styles.actions}>
        <Button className={classnames("round-btn green", styles.button)} onClick={e => console.log('reset')}>Reset Password</Button>
        <a href="/login" className={styles.link}>Sign In</a>
      </div>
    </LeftRightContainer>
  )
}

export default ForgotPasswordLayout;
