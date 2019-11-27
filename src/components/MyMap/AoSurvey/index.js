import React, { Component, Fragment } from "react";

import { controlType } from 'Constants/defaultValues'

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
  SmartText,
  RangeSlider,
} from "Components/Survey";

import { Colxx } from "Components/CustomBootstrap";

class AoSurvey extends React.Component {

  constructor(props) {

    super(props);
    
    const { questions, options, drivers } = this.props;

    for (let i = 0; i < drivers.length; i++) {
      drivers[i] = {
        ...drivers[i],
        questions: []
      };
    }

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < drivers.length; j++) {
        if (questions[i].driver === drivers[j].id) {
          drivers[j].questions.push(questions[i]);
          break;
        }
      }
    }

    const orderedDrivers = drivers.filter(item => {
      return item.questions.length > 0 ? true : false
    });

    let accordion = [];
    for (let i = 0; i < orderedDrivers.length; i++) {
      if (i === 0) 
        accordion.push(true) 
      else
        accordion.push(false)
    }

    this.state = {
      collapse: false,
      accordion,
      questions,
      options,
      drivers: orderedDrivers
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
    this.setState( state => {
      state.questions[answer.questionIndex].answer = {
        ...answer
      };
      return state;
    });
  }

  handleCancel = e => {
    this.props.onCancel(e);
  }

  handleSubmit = e => {
    this.props.onSubmit(e, this.state.questions);
  }

  render() {
    
    const { options, drivers, accordion } = this.state;
    const { skipQuestionList } = this.props;
    
    return (
      <div className="ao-survey-container">
        { 
          drivers.map((driver, index2) => {
            let content = accordion[index2] === true ? 'show' : 'hide';
            let indicator = accordion[index2] === true ? 'indicator-up' : 'indicator-down';
            return <div className="aosurvey-section" key={index2}>
              <div 
                className="header"
                onClick={() => this.toggleAccordion(index2)}>
                <div className="icon">
                  <img src={driver.iconPath}/>
                </div>
                <h1>{driver.driverName}</h1>
                <div className={indicator}></div>
              </div>
              <div className={"content " + content}>
                { 
                  driver.questions.map( (control, index) => {
                    switch (control.controlType) {
                      case controlType.TEXT:
                        return <FreeText skipQuestionList={skipQuestionList} key={index} question={control} onAnswer={answer => this.handleAnswer(answer)}/>
            
                      case controlType.SLIDER:
                        return <RangeSlider skipQuestionList={skipQuestionList} key={index} question={control} onAnswer={answer => this.handleAnswer(answer)} />
                      
                        case controlType.TWO_OPTIONS:
                        return <TwoOptions skipQuestionList={skipQuestionList} key={index} options={options} question={control} onAnswer={answer => this.handleAnswer(answer)} />
            
                      case controlType.MULTI_OPTIONS:
                        return <MultipleOptions skipQuestionList={skipQuestionList} key={index} options={options} question={control} onAnswer={answer => this.handleAnswer(answer)} />
            
                      case controlType.SMART_TEXT:
                        return <SmartText skipQuestionList={skipQuestionList} key={index} question={control}  onAnswer={answer => this.handleAnswer(answer)}/>
            
                      default:
                        return <div key={index} ></div>
                    }
                  })
                }
              </div>
            </div>
          })
        }
        <div className="footer">
          <a className="waves-effect waves-light btn btn-danger active" 
            onClick={e=>this.handleCancel(e)}>Back</a>&nbsp;&nbsp;
          <a className="waves-effect waves-light btn btn-primary active" 
            onClick={e=>this.handleSubmit(e)} >Submit</a>
        </div>
      </div>
    )
  }
}

export default AoSurvey;