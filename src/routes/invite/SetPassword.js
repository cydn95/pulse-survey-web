import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "reactstrap";
import queryString from "query-string";
import ReactLoading from "react-loading";
import PasswordStrengthBar from "react-password-strength-bar";
import { setPassword, checkPasswordStatus } from "Redux/actions";

import classnames from "classnames";

import styles from "./styles.scss";

class SetPassword extends Component {
  constructor(props) {
    super(props);

    const params = queryString.parse(this.props.location.search);

    this.state = {
      email: params.email,
      password: "",
      confirmPassword: "",
      project: params.project,
      token: params.token,
      emailValidator: "",
      passwordValidator: "",
      confirmPasswordValidator: "",
      privacyValidator: "",
      loading: true,
      privacy: false,
      passwordScore: 0,
    };
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    console.log('params', params)
    const { checkPasswordStatus } = this.props;

    checkPasswordStatus(params.email, (result) => {
      this.setState({ loading: false });

      if (result.data) {
        if (
          result.data.code.toString() === "200" &&
          result.data.passwordstatus === true
        ) {
          window.location.href = '/login';
        }
      }
    });
  }

  handleInput = (e) => {
    if (e.target.name === 'privacy') {
      this.setState({
        [e.target.name]: e.target.checked,
        [e.target.name + "Validator"]: "",
      });
      return;
    }
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Validator"]: "",
    });
  };

  handleSetPassword = (e) => {
    const { email, password, confirmPassword, token, privacy, passwordScore } = this.state;
    const { setPassword, history } = this.props;

    if (!privacy) {
      this.setState({
        privacyValidator: "error"
      });
      return;
    }

    if (email === "") {
      this.setState({
        emailValidator: "error",
      });
      return;
    }

    if (password === "" || passwordScore < 4) {
      this.setState({
        passwordValidator: "error",
      });
      return;
    }

    if (confirmPassword === "") {
      this.setState({
        confirmPasswordValidator: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        confirmPasswordValidator: "error",
      });
      return;
    }

    setPassword(email, password, token, history);
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      project,
      emailValidator,
      passwordValidator,
      confirmPasswordValidator,
      loading,
    } = this.state;

    if (loading) {
      return (
        <ReactLoading
          className={styles["set-password-loading"]}
          type={"bars"}
          color={"grey"}
        />
      );
    }

    return (
      <div className="set-password">
        <div className="set-password__left-bg"></div>
        <div className="set-password__content">
          <h1 className="set-password__content--title">Welcome to {project}</h1>
          <p className="set-password__content--description">
            The {project} team has nominated you as an important stakeholder,
            and they would like to hear your thoughts, feelings and ideas to
            make this project successful.
          </p>
          <h2 className="set-password__content--subtitle">What is Pulse? ​</h2>
          <p className="set-password__content--description_2">
            Pulse is an easy to use web application designed to understand the sentiment and
            perspectives of team members in real-time, by <strong>anonymously</strong> measuring
            <ul>
              <li>
                <strong>About Me</strong>: <u>How you feel</u> about the project
              </li>
              <li>
                <strong>About Others</strong>: How you think <u>other people feel</u> about the project
              </li>
            </ul>
            There are no wrong answers. You can change your feedback as often as you'd like and your responses will be kept anonymous!
          </p>
          <h2 className="set-password__content--subtitle">To Get Started​​</h2>
          {/* <p className="set-password__content--description">
            Confirm your details below, click “edit” if you’d like to make any
            changes.
          </p>
          <Input
            type="text"
            className={classnames(
              "set-password__content--input",
              "round-text-field",
              emailValidator
            )}
            name="email"
            value={email}
            onChange={(e) => this.handleInput(e)}
          /> */}
          {emailValidator !== "" && (
            <span class="set-password__content--error">Email is required</span>
          )}
          <p className="set-password__content--description">
            Create a password. You can log back in and change your answers at
            any time!
          </p>
          <div style={{maxWidth: '458px', marginBottom: 20}}>
            <Input
              type="password"
              className={classnames(
                "set-password__content--input",
                "round-text-field",
                passwordValidator
              )}
              style={{ marginBottom: 5, width: '100%' }}
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => this.handleInput(e)}
            />
            <PasswordStrengthBar
                password={password}
                onChangeScore={(score) => this.setState({passwordScore: score})}
            />
          </div>
          {/* {passwordValidator !== "" && (
            <span class="set-password__content--error">
              Password is required
            </span>
          )} */}
          <Input
            type="password"
            className={classnames(
              "set-password__content--input",
              "round-text-field",
              confirmPasswordValidator
            )}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            style={{ marginBottom: 20 }}
            onChange={(e) => this.handleInput(e)}
          />
          {confirmPasswordValidator !== "" && (
            <span class="set-password__content--error">
              Confirm Password is required
            </span>
          )}
          <div className={`set-password__content--prviacy_and_policy ${this.state.privacyValidator}`}>
            <input
              name="privacy"
              id="privacy"
              type="checkbox"
              onChange={(e) => this.handleInput(e)} checked={this.state.privacy}
            />
            <label htmlFor="privacy">I understand the <a href='https://projectai.com/privacy-policy/' rel='noreferrer' target="_blank">Privacy Policy</a></label>
          </div>
          <Button
            className="set-password__content--submit round-btn green"
            onClick={(e) => this.handleSetPassword()}
          >
            Let's go!
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  setPassword,
  checkPasswordStatus,
})(SetPassword);
