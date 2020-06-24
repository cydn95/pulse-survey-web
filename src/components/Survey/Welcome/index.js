import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

class Intro extends Component {
  render() {
    return (
      <Row>
        <Colxx xxs="12">
          <h1>Welcome</h1>
          <p>
            Please take a moment to answer this survey. It is very important
            that you answer the questions honestly. We want to create a culture
            of open communication, honesty and collaboration. I want you to be
            honest, but also respectful of your colleagues, and constructive in
            your feedback. This is a safe place to share your true feelings, to
            help us improve.​ This project is important, and you are an
            important part of it.
          </p>
          <video controls>
            <source src="" type="video/mp4" />
            <source src="" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </Colxx>
      </Row>
    );
  }
}

export default Intro;
