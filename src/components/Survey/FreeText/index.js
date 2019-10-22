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
    const question = {
      "id": 4,
      "subdriver": "sub",
      "questionText": "First Question?",
      "sliderTextLeft": "Row",
      "sliderTextRight": "High",
      "skipOptionYN": true,
      "skipResponses": "Skip",
      "questionSequence": 10,
      "topicPrompt": "topic",
      "commentPrompt": "comment",
      "survey": 1,
      "driver": 1,
      "controlType": 1,
      "PageSetting": 6
    }
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
