import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

class TwoOptions extends Component {

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

    const { question } = this.props;

    let firstAnswerActive = this.state.answer === 1 ? ' active' : '';
    let secondAnswerActive = this.state.answer === 2 ? ' active' : '';

    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <div className="mt-xs">
            <form>
              <section className="form">
                <div className="input-field anwser-select2">
                  <a className={"waves-effect waves-light btn select2-btn " + firstAnswerActive} onClick={e => this.onSelectAnswer(e, 1)}>Option1</a>
                  <a className={"waves-effect waves-light btn select2-btn " + secondAnswerActive} onClick={e => this.onSelectAnswer(e, 2)}>Option2</a>
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

export default TwoOptions
