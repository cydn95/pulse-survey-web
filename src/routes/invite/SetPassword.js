import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "reactstrap";
import queryString from "query-string";
import ReactLoading from "react-loading";

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
      loading: true,
    };
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
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
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Validator"]: "",
    });
  };

  handleSetPassword = (e) => {
    const { email, password, confirmPassword, token } = this.state;
    const { setPassword, history } = this.props;

    if (email === "") {
      this.setState({
        emailValidator: "error",
      });
      return;
    }

    if (password === "") {
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
          <p className="set-password__content--description">
            Pulse is an easy to use web application designed to capture: Some
            basic info About You, and your role on the project. The team would
            like to understand what you think, how you feel, and what you care
            about. Some info about others that you are working with – by
            creating a “map” of the other people involved. We’d like to
            understand: ​<br />
            <strong>My Map</strong>: The people working with you on a day to day
            basis – and how you think they feel about the project.​
            <br />
            <strong>Project Map</strong>: The people who you think are most
            important to the project success – and how you think they feel.​
            <br />
            There are NO WRONG ANSWERS! The team needs your honest feedback!
            Using your insight, we want to identify new ways we can improve, and
            places we need to focus to help create a more successful and
            predictable project!
          </p>
          <h2 className="set-password__content--subtitle">To Get Started​​</h2>
          <p className="set-password__content--description">
            Confirm your details below, click “edit” if you’d like to make any
            changes.​
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
          />
          {emailValidator !== "" && (
            <span class="set-password__content--error">Email is required</span>
          )}
          <p className="set-password__content--description">
            Create a password. You can log back in and change your answers at
            any time!​
          </p>
          <Input
            type="password"
            className={classnames(
              "set-password__content--input",
              "round-text-field",
              passwordValidator
            )}
            style={{ marginBottom: 20 }}
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => this.handleInput(e)}
          />
          {passwordValidator !== "" && (
            <span class="set-password__content--error">
              Password is required
            </span>
          )}
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
            onChange={(e) => this.handleInput(e)}
          />
          {confirmPasswordValidator !== "" && (
            <span class="set-password__content--error">
              Confirm Password is required
            </span>
          )}
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
