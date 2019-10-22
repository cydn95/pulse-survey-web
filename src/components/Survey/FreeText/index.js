import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class FreeText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      skipToogle: false
    }
  }

  onSkipQuestion = (e) => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle
    });
  }
  render() {
    const { question } = this.props;
      
    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <textarea className="materialize-textarea" rows="1"></textarea>
          <SkipQuestion />
        </Colxx>
      </Row>
    );
  }
}

export default FreeText
