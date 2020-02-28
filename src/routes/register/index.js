import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "Redux/actions";

import { Input, Button } from "reactstrap";
import LeftRightContainer from "../../components/LeftRightContainer";

function RegisterLayout(props) {
  const [email, setEmail] = useState("demo@gogo.com");
  const [password, setPassword] = useState("gogo123");
  const [username, setUserName] = useState("Sarah Kortney");

  const onUserRegister = () => {
    if (email !== "" && password !== "") {
      // This is for adding user to Firebase. Commented out for demo purpose.  
      // props.registerUser(this.state, this.props.history);
      props.history.push("/");
    }
  }

  return (
    <LeftRightContainer>
      <h2>Register</h2>
      <label>USERNAME</label>
      <Input
        type="text"
        value={username}
        name="username"
        onChange={e => setUserName(e.target.value)}
      />
      <label>PASSWORD</label>
      <Input
        type="password"
        value={password}
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <Button className="login-container__right--login-panel--submit round-btn green" onClick={e => onUserRegister()}>Register</Button>
    </LeftRightContainer>
  )

};

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(RegisterLayout));
