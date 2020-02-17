import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { loginUser } from "Redux/actions";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onUserLogin() {
    
    if (this.state.username !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { username, password } = this.state;

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
            <span className="login-container__right--login-panel--error">The ID and password do not match. Please try again.</span>
            <span className="login-container__right--login-panel--field-label">EMAIL ADDRESS</span>
            <Input
              type="text"
              className="login-container__right--login-panel--field-input round-text-field" 
              value={username}
              name="username" 
              onChange={e => this.inputChange(e)}
            />
            <span className="login-container__right--login-panel--field-label">EMAIL ADDRESS</span>
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
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(LoginLayout);
