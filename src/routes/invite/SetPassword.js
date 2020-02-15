import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "reactstrap";
import { setPassword } from "Redux/actions";
import classnames from 'classnames'
import queryString from 'query-string'

class SetPassword extends Component {
  constructor(props) {
    super(props);
    
    const params = queryString.parse(this.props.location.search);

    this.state = {
      email: params.email,
      password: "",
      project: params.project,
      token: params.token,
      emailValidator: "",
      passwordValidator: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Validator']: ""
    });
  }

  handleSetPassword = e => {
    const { email, password, token } = this.state;
    const { setPassword, history } = this.props;

    if (email === "") {
      this.setState({
        emailValidator: 'error'
      });
      return;
    }

    if (password === "") {
      this.setState({
        passwordValidator: 'error'
      });
      return;
    }

    setPassword(email, password, token, history);
  }

  render() {
    const { email, password, project, emailValidator, passwordValidator } = this.state;
    return (
      <div className="set-password">
        <div className="set-password__left-bg"></div>
        <div className="set-password__content">
          <h1 className="set-password__content--title">Welcome Project</h1>
          <p className="set-password__content--description">
            The { project } project team has nominated you as an important stakeholder, and they would like to hear your thoughts, feelings and ideas to make this project successful.
          </p>
          <h2 className="set-password__content--subtitle">What is Pulse? ​</h2>
          <p className="set-password__content--description">
            Pulse is an easy to use web application designed to capture:
            Some basic info About You, and your role on the project.   The team would like to understand what you think, how you feel, and what you care about.
            Some info about others that you are working with – by creating a “map” of the other people involved.  We’d like to understand: ​<br />
            <strong>My Map</strong>:  The people working with you on a day to day basis – and how you think they feel about the project.​<br />
            <strong>Project Map</strong>:  The people who you think are most important to the project success – and how you think they feel.​<br />
            There are NO WRONG ANSWERS!  The team needs your honest feedback!
            Using your insight, we want to identify new ways we can improve, and places we need to focus to help create a more successful and predictable project!
          </p>
          <h2 className="set-password__content--subtitle">To Get Started​​</h2>
          <p className="set-password__content--description">Confirm your details below, click “edit” if you’d like to make any changes.​</p>
          <Input 
            type="text"
            className={ classnames("set-password__content--input", "round-text-field", emailValidator) }
            name="email"
            value={email}
            onChange={e => this.handleInput(e)}
          />
          { emailValidator !== '' && <span class="set-password__content--error">Email is required</span> }
          <p className="set-password__content--description">Create a password.  You can log back in and change your answers at any time!​</p>
          <Input 
            type="password"
            className={ classnames("set-password__content--input", "round-text-field", passwordValidator) } 
            name="password"
            value={password} 
            onChange={e => this.handleInput(e) }
          />
          { passwordValidator !== '' && <span class="set-password__content--error">Password is required</span> }
          <Button className="set-password__content--submit round-btn green" onClick={ e => this.handleSetPassword() }>Let's go!</Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return { };
};

export default connect(
  mapStateToProps,
  {
    setPassword
  }
)(SetPassword);
