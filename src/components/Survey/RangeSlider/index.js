import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import SkipQuestion from "../SkipQuestion";

import { SliderTooltip } from "Components/SliderTooltip";
import "rc-slider/assets/index.css";

class RangeSlider extends Component {

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
    console.log(question);
    return (
      <div>
        <Row>
          <Colxx xs="12">
            <h1 className="mt-s">{question.questionText}</h1>
            
            
          </Colxx>
        </Row>
        <Row>
          <Colxx xs="12">
            <SliderTooltip
              min={500}
              max={1500}
              defaultValue={1000}
              tipFormatter={null}
              className="mb-5" />
          </Colxx>
          <Colxx xs="6" className="text-left">
            {question.sliderTextLeft}
          </Colxx>
          <Colxx xs="6" className="text-right">
            {question.sliderTextRight}
          </Colxx>
        </Row>
        <Row>
        <SkipQuestion /> 
        </Row>
      </div>
    );
  }
}

export default RangeSlider
