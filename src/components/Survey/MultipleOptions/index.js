import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class MultipleOptions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      answer: 0
    }
  }

  onSelectAnswer = (e, answer) => {
    e.preventDefault();
    
    this.setState({
      "answer": answer
    });
  }
  render() {

    // const { question } = this.props;
    const question = {
      "id": 5,
      "subdriver": "s",
      "questionText": "Second Question",
      "sliderTextLeft": "Left",
      "sliderTextRight": "Right",
      "skipOptionYN": true,
      "skipResponses": "res",
      "questionSequence": 5,
      "topicPrompt": "topic",
      "commentPrompt": "comment",
      "survey": 1,
      "driver": 1,
      "controlType": 3,
      "PageSetting": 6
    };

    let firstAnswerActive = this.state.answer === 1 ? ' active' : '';
    let secondAnswerActive = this.state.answer === 2 ? ' active' : '';
    let thirdAnswerActive = this.state.answer === 3 ? ' active' : '';

    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <div className="mt-xs">
            <form>
              <section className="form">
                <div className="input-field anwser-select-n">
                  <a className={"waves-effect waves-light btn select2-btn " + firstAnswerActive} onClick={e => this.onSelectAnswer(e, 1)}>Option1</a>
                  <a className={"waves-effect waves-light btn select2-btn " + secondAnswerActive} onClick={e => this.onSelectAnswer(e, 2)}>Option2</a>
                  <a className={"waves-effect waves-light btn select2-btn " + thirdAnswerActive} onClick={e => this.onSelectAnswer(e, 3)}>Option3</a>
                </div>
              </section>
            </form>
          </div>
          <SkipQuestion />
        </Colxx>
      </Row>
    );
  }
}

export default MultipleOptions
