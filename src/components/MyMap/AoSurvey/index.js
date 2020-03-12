import React from "react";

import { controlType } from 'Constants/defaultValues'
import Button from '@material-ui/core/Button';

import {
  MultipleOptions,
  TwoOptions,
  FreeText,
  SmartText,
  RangeSlider,
} from "Components/Survey";

import { Colxx } from "Components/CustomBootstrap";

import Accordion from "Components/accordion";

import styles from './styles.scss';

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
        if (questions[i].driver.id === drivers[j].driverId) {
          drivers[j].questions.push(questions[i]);
          break;
        }
      }
    }

    const orderedDrivers = drivers.filter(item => {
      return item.questions.length > 0 ? true : false
    });

    this.state = {
      questions,
      options,
      drivers: orderedDrivers
    };
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
    
    const { options } = this.state;
    const { skipQuestionList, fullName } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          About Others: { fullName }
        </div>
        <Accordion
          keySelector={d => d.title}  
          headerSelector={d => d.title}  
          componentSelector={d => d.component}  
          iconSelector={d => d.icon}
          selectedItem={this.state.drivers[0].driverName}
          data={
            this.state.drivers.map((driver, index) => {
              return {
                  title: driver.driverName,
                  component: (
                    <div className={styles.questions}>
                      { driver.questions.map((control, index2) => {
                        switch (control.controlType) {
                          case controlType.TEXT:
                            return <FreeText skipQuestionList={skipQuestionList} key={`${index}${index2}`} question={control} onAnswer={answer => this.handleAnswer(answer)}/>
                
                          case controlType.SLIDER:
                            return <RangeSlider skipQuestionList={skipQuestionList} key={`${index}${index2}`} question={control} onAnswer={answer => this.handleAnswer(answer)} />
                          
                            case controlType.TWO_OPTIONS:
                            return <TwoOptions skipQuestionList={skipQuestionList} key={`${index}${index2}`} options={options} question={control} onAnswer={answer => this.handleAnswer(answer)} />
                
                          case controlType.MULTI_OPTIONS:
                            return <MultipleOptions skipQuestionList={skipQuestionList} key={`${index}${index2}`} options={options} question={control} onAnswer={answer => this.handleAnswer(answer)} />
                
                          case controlType.SMART_TEXT:
                            return <SmartText skipQuestionList={skipQuestionList} key={`${index}${index2}`} question={control}  onAnswer={answer => this.handleAnswer(answer)}/>
                
                          default:
                            return <div key={`${index}${index2}`} ></div>
                        }
                      })}
                    </div>
                  ),
                  icon: driver.icon
              }
            })
          }
        />
        <div className={styles.footer}>
          <Button
            variant="contained"
            color="default"
            onClick={e=>this.handleCancel(e)}>
            Cancel
          </Button>&nbsp;&nbsp;
          <Button 
            variant="contained"
            className={styles.green}
            onClick={e=>this.handleSubmit(e)}>
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default AoSurvey;