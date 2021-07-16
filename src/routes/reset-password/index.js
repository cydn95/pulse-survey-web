import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Button } from "reactstrap";
import validator from "validator";
import queryString from "query-string";

import { resetPasswordConfirm } from "Redux/actions";

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
        resetPasswordConfirm: (password, token, callback) => dispatch(resetPasswordConfirm(password, token, callback)),
    };
};

const ResetPasswordLayout = ({
        loading,
        history,
        resetPasswordConfirm
    }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [error, setError] = useState('')

    const [sendStatus, setSendStatus] = useState(false);

    const params = queryString.parse(window.location.search);
    
    const onResetPasswordCallback = (response) => {
        if (response) {
            setSendStatus(true);
        } else {
            setError('Token has been expired or invalid email link');
        }
    }
    const onResetPassword = () => {
        if (password === confirmPassword && password.length >= 8 && confirmPassword.length >= 8) {
            setError('')
            setPasswordError('')
            setConfirmPasswordError('')
            resetPasswordConfirm(password, params.token, onResetPasswordCallback);
        } else {
            if (password !== confirmPassword) {
                setConfirmPasswordError('Confirm password should be matched with password')
            }

            if (password.length < 8) {
                setPasswordError('The minimum password length is 8')
            }

            if (confirmPassword.length < 8) {
                setConfirmPasswordError('The minimum confirm password length is 8')
            }
        }
    }

    if (!sendStatus) {
        return (
            <LeftRightContainer>
                <h2>Reset password</h2>
                <p className="white">
                </p>
                <span className={styles.error}> {error} </span>
                <label>Password</label>
                <Input type="password" name="new_password" onChange={(e) => setPassword(e.target.value)} />
                <span className={styles.error}> {passwordError} </span>
                <label>Confirm Password</label>
                <Input type="password" name="confirm_new_password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className={styles.error}> {confirmPasswordError} </span>
                <div className={styles.actions}>
                    <Button
                        className={classnames("round-btn green", styles.button)}
                        onClick={(e) => onResetPassword()}
                    >
                        Reset Password
                    </Button>
                </div>
            </LeftRightContainer>
        )
    } else {
        return (
            <LeftRightContainer>
                <h2>Reset password</h2>
                <p className="white">
                    Your password has been reset.
                </p>
                <div className={styles.actions}>
                    <a href="/login" className={styles.link}>
                        Sign In
                    </a>
                </div>
            </LeftRightContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordLayout);