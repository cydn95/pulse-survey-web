import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class FreeText extends Component {

  constructor(props) {
    super(props);

    const { question } = this.props
    console.log(question);
    this.state = {
      skipToogle: false,
      answer: {
        ...question.answer
      }
    };

  }

  onSkipQuestion = (e) => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle
    });
  }

  onInputAnswer = e => {
    this.setState( {
      answer: {
        ...this.state.answer,
        'answer': e.target.value
      }
    });
  }

  render() {
    const { question } = this.props;
      
    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <textarea className="materialize-textarea" rows="1" value={this.state.answer.answer} onChange={e => this.onInputAnswer(e)}></textarea>
          <SkipQuestion />
        </Colxx>
      </Row>
    );
  }
}

export default FreeText
