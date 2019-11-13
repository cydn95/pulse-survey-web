import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  CardBody,
  Button,
  Collapse,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  Welcome,
  SmartText,
  RangeSlider,
  NewStakeholder,
  AboutMe,
  Continue
} from "Components/Survey";

import { Colxx } from "Components/CustomBootstrap";

import IntlMessages from "Util/IntlMessages";

class AoSurvey extends React.Component {

  constructor(props) {

    super(props);
    
    this.state = {
      collapse: false,
      accordion: [true, false, false]
    };
  }

  toggleAccordion = (tab)  => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  }

  handleAnswer = answer => {

  }

  handleCancel = e => {
    this.props.onCancel(e);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <Fragment>
        <Row className="aosurvey-section">
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <Fragment>
                  <div className="border">
                    <Button
                      block
                      color="link"
                      className="text-left"
                      onClick={() => this.toggleAccordion(0)}
                      aria-expanded={this.state.accordion[0]}
                    >
                      Sentiment
                    </Button>
                    <Collapse isOpen={this.state.accordion[0]}>
                      <div className="p-4">
                        <RangeSlider question={questions[0]}  onAnswer={answer => this.handleAnswer(answer)} />
                      </div>
                    </Collapse>
                  </div>
                  <div className="border">
                    <Button
                      block
                      color="link"
                      className="text-left"
                      onClick={() => this.toggleAccordion(1)}
                      aria-expanded={this.state.accordion[1]}
                    >
                      Confidence
                    </Button>
                    <Collapse isOpen={this.state.accordion[1]}>
                      <div className="p-4">
                      <RangeSlider question={questions[1]}  onAnswer={answer => this.handleAnswer(answer)} />
                    </div>
                    </Collapse>
                  </div>
                  <div className="border">
                    <Button
                      block
                      color="link"
                      className="text-left"
                      onClick={() => this.toggleAccordion(2)}
                      aria-expanded={this.state.accordion[2]}
                    >
                      Influence
                    </Button>
                    <Collapse isOpen={this.state.accordion[2]}>
                      <div className="p-4">
                      <FreeText question={questions[2]}  onAnswer={answer => this.handleAnswer(answer)} />
                    </div>
                    </Collapse>
                  </div>
                </Fragment>
              </CardBody>
              <CardBody>
                <Fragment>
                  <a className="waves-effect waves-light btn btn-danger active" onClick={e=>this.handleCancel(e)}>Back</a>&nbsp;&nbsp;
                  <a className="waves-effect waves-light btn btn-primary active" >Submit</a>
                </Fragment>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

export default AoSurvey;