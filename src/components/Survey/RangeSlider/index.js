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
          <Colxx xs="6" className="slider-text-left">
            {question.sliderTextLeft}
          </Colxx>
          <Colxx xs="6" className="slider-text-right">
            {question.sliderTextRight}
          </Colxx>
        </Row>
        <Row>
          <Colxx xs="12">
            <SkipQuestion /> 
          </Colxx>
        </Row>
      </div>
    );
  }
}

export default RangeSlider
