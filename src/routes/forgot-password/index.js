import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import classnames from "classnames";

import { Colxx } from "Components/CustomBootstrap";

import styles from './styles.scss';

class ForgotPasswordLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "demo@gogo.com"
    };
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-container__left">
          <div className="login-container__left__logo">
            <img className="login-container__left__logo--img" src="/assets/img/login/collective-insight.png" alt="collective-insight" />
            <h1 className="login-container__left__logo--title">Collective Insight</h1>
            <p className="login-container__left__logo--description">
              Pulse by ProjectAI helps project managers make<br />sense of people’s collective insights for better project outcomes.
            </p>
          </div>
        </div>
        <div className="login-container__right">
          <div className="login-container__right--login-panel">
            <h2 className="login-container__right--login-panel--title">Reset password</h2>
            <p className="white">
              Enter your username or email to reset your password.
      You will receive an email with instructions on how to reset your password.
              If you are experiencing problems resetting your password <a href='#' className={styles.link}>contact us</a> or <a className={styles.link} href='#'>send us an email</a>.
              <br></br>
              <br></br>
              If you are not a member, please{" "}
              <NavLink to={`/register`} className={classnames("white", styles.link)}>
                register
              </NavLink>
            </p>
            <span className="login-container__right--login-panel--field-label">USERNAME or EMAIL</span>
            <Input
              type="text"
              className="login-container__right--login-panel--field-input round-text-field"
              name="username_or_email"
              onChange={e => console.log(e.target.value)}
            />
            <div className={styles.actions}>
              <Button className={classnames("round-btn green", styles.button)} onClick={e => console.log('reset')}>Reset Password</Button>
              <a href="/login" className={styles.link}>Sign In</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPasswordLayout;
