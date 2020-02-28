import React, { Component } from "react";
import { Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { loginUser, loginUserFailed } from "Redux/actions";

import { loginErrorType, loginErrorTypeText } from 'Constants/defaultValues'
import LeftRightContainer from "../../components/LeftRightContainer";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
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
      [e.target.name]: e.target.value
    })
  }

  componentWillReceiveProps(props) {
    const { authStatus } = props;

    this.setState({
      error: loginErrorTypeText(authStatus)
    });
  }

  render() {
    const { username, password, error } = this.state;
    const { authStatus } = this.props;

    return (
      <LeftRightContainer>
        <h2>Log into your account</h2>
        {
          authStatus !== loginErrorType.AUTH_SUCCESS && <span className="login-container__right--login-panel--error">{error}</span>
        }
        <label>USERNAME</label>
        <Input
          type="text"
          value={username}
          name="username"
          onChange={e => this.inputChange(e)}
        />
        <label>PASSWORD</label>
        <Input
          type="password"
          value={password}
          name="password"
          onChange={e => this.inputChange(e)}
        />
        <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
        <Button className="login-container__right--login-panel--submit round-btn green" onClick={e => this.onUserLogin()}>Login</Button>
      </LeftRightContainer>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, authStatus, loading } = authUser;
  return { user, authStatus, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    loginUserFailed
  }
)(LoginLayout);
