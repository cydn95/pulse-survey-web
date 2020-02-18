import React, { Component } from "react";
import { Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { loginUser, loginUserFailed } from "Redux/actions";

import { loginErrorType, loginErrorTypeText } from 'Constants/defaultValues'

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
      <div className="login-container">
        <div className="login-container__left">
          <div className="login-container__left__logo">
            <img className="login-container__left__logo--img" src="/assets/img/login/collective-insight.png" alt="collective-insight"/>
            <h1 className="login-container__left__logo--title">Collective Insight</h1>
            <p className="login-container__left__logo--description">
              Pulse by ProjectAI helps project managers make<br/>sense of people’s collective insights for better project outcomes.
            </p>
          </div>
        </div>
        <div className="login-container__right">
          <div className="login-container__right--login-panel">
            <h2 className="login-container__right--login-panel--title">Log into your account</h2>
            {
              authStatus !== loginErrorType.AUTH_SUCCESS && <span className="login-container__right--login-panel--error">{ error }</span>
            }
            <span className="login-container__right--login-panel--field-label">USERNAME</span>
            <Input
              type="text"
              className="login-container__right--login-panel--field-input round-text-field" 
              value={username}
              name="username" 
              onChange={e => this.inputChange(e)}
            />
            <span className="login-container__right--login-panel--field-label">PASSWORD</span>
            <Input
              type="password"
              className="login-container__right--login-panel--field-input round-text-field" 
              value={password}
              name="password" 
              onChange={e => this.inputChange(e)}
            />
            <a href="#forgot-password" className="forgot-password">Forgot your password?</a>
            <Button className="login-container__right--login-panel--submit round-btn green" onClick={ e => this.onUserLogin() }>Login</Button>
          </div>
        </div>
      </div>
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
