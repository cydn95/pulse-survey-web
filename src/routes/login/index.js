import React, { Component } from "react";
import { Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { loginUser, loginUserFailed } from "Redux/actions";

import { loginErrorType, loginErrorTypeText } from "Constants/defaultValues";
import LeftRightContainer from "../../components/LeftRightContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-scroll";

import styles from "./styles.scss";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      passwordShow: false,
    };
  }
  onUserLogin() {
    const { username, password } = this.state;
    const { loginUser, loginUserFailed } = this.props;

    if (username === "") {
      loginUserFailed(loginErrorType.USERNAME);
      return;
    }

    if (password === "") {
      loginUserFailed(loginErrorType.PASSWORD);
      return;
    }
    if (username !== "" && password !== "") {
      loginUser(this.state, this.props.history);
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  inputChange = (e) => {
    const { loginUserFailed } = this.props;

    loginUserFailed(loginErrorType.AUTH_SUCCESS);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  inputKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.onUserLogin();
      return;
    }
  };

  handleShowPassword = (e) => {
    this.setState((state) => ({
      passwordShow: !state.passwordShow,
    }));
  };

  componentWillReceiveProps(props) {
    const { authStatus } = props;

    this.setState({
      error: loginErrorTypeText(authStatus),
    });
  }

  render() {
    const { username, password, error, passwordShow } = this.state;
    const { authStatus } = this.props;

    return (
      <LeftRightContainer>
        <h2 id="login" className="title">
          Login
        </h2>
        <span className="sub-title">Access account</span>
        {authStatus !== loginErrorType.AUTH_SUCCESS && (
          <span className="login-container__right--login-panel--error">
            {error}
          </span>
        )}
        <label>Email</label>
        <Input
          type="text"
          value={username}
          name="username"
          onChange={(e) => this.inputChange(e)}
          onKeyUp={(e) => this.inputKeyUp(e)}
        />
        <label>Password</label>
        <div className="password-wrapper">
          {passwordShow ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="login-eye"
              onClick={this.handleShowPassword}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className="login-eye"
              onClick={this.handleShowPassword}
            />
          )}
          {passwordShow ? (
            <Input
              type="text"
              value={password}
              name="password"
              onChange={(e) => this.inputChange(e)}
              onKeyUp={(e) => this.inputKeyUp(e)}
            />
          ) : (
            <Input
              type="password"
              value={password}
              name="password"
              onChange={(e) => this.inputChange(e)}
              onKeyUp={(e) => this.inputKeyUp(e)}
            />
          )}
        </div>
        <Button
          className="login-container__right--login-panel--submit round-btn green"
          onClick={(e) => this.onUserLogin()}
        >
          Sign In
        </Button>
        <a href="/forgot-password" className="forgot-password">
          Forgot your password?
        </a>

        <div className={styles.down}>
          <Link to="login" spy={true} smooth={true} offset={-70} duration={500}>
            <FontAwesomeIcon icon={faChevronDown} />
          </Link>
        </div>
      </LeftRightContainer>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, authStatus, loading } = authUser;
  return { user, authStatus, loading };
};

export default connect(mapStateToProps, {
  loginUser,
  loginUserFailed,
})(LoginLayout);
