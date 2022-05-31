import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import validator from "validator";

import { resetPassword } from "Redux/actions";

import classnames from "classnames";

import styles from "./styles.scss";
import LeftRightContainer from "../../components/LeftRightContainer";

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (email, callback) => dispatch(resetPassword(email, callback)),
  };
};

const ForgotPasswordLayout = ({ loading, resetPassword, history }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  // const [loadStatus, setLoadStatus] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);

  const onResetPasswordCallback = (response) => {
    // console.log(response);
    if (response) {
      // history.push("/resetsent");
      setSendStatus(true);
    } else {
      setEmailError('Incorrect Email. Try again please.');
    }
  }

  const onResetPassword = () => {
    if (validator.isEmail(email)) {

      setEmailError('')
      resetPassword(email, onResetPasswordCallback);
    } else {
      setEmailError('Invalid Email')
    }
  }

  // useEffect(() => {
  //   setLoadStatus(loading);
  // }, [loading]);

  if (!sendStatus) {
    return (
      <LeftRightContainer>
        <h2>Reset password</h2>
        <p className="white">
          Enter your email to reset your password. You will receive an
          email with instructions on how to reset your password.<br />
          If you are still experiencing difficulties please drop us a direct email{` `}
          <a href="mailto:support@projectai.com" className={styles.link}>
            support@projectai.com
          </a>{" "}
        </p>
        <label>EMAIL</label>
        <Input
          type="text"
          name="username_or_email"
          onChange={
            (e) => setEmail(e.target.value)
          }
        />
        <span className={styles.error}> {
          emailError
        } </span>
        <div className={styles.actions}>
          <Button
            className={classnames("round-btn green", styles.button)}
            onClick={(e) => onResetPassword()}
          >
            Reset Password
          </Button>
          <a href="/login" className={styles.link}>
            Sign In
          </a>
        </div>
      </LeftRightContainer>
    );
  } else {
    return (
      <LeftRightContainer>
        <h2>Reset password</h2>
        <p className="white">
          A password reset link was sent. Click the link in the email to create a new password.
        </p>
      </LeftRightContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordLayout);
