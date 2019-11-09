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
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="9" className="mx-auto my-auto col-xs-12 col-md-7">
                <Card className="auth-card">
                  <div className="position-relative image-side projectai-logo">
                    <img src="/assets/img/survey/login-logo.png"/>
                    <CardTitle className="mt-4">
                      <strong>PULSE</strong>
                    </CardTitle>
                    <img src="/assets/img/survey/poweredby.png" className="mt-5" width="60%"/>
                    <img src="/assets/img/survey/site-logo.png" className="mt-2" width="85%"/>
                  </div>
                  <div className="form-side">
                    {/*<NavLink to={`/`} className="white">
                      <span className="logo-single" />
                      </NavLink>*/}
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="text" name="username" value={this.state.username} onChange={e => this.inputChange(e)}/>
                        <IntlMessages id="user.username" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" name="password" value={this.state.password} onChange={e => this.inputChange(e)} />
                        <IntlMessages id="user.password"/>
                      </Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="sm"
                          onClick={() => this.onUserLogin()}
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
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
