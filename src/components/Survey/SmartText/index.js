import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SkipQuestion from "../SkipQuestion";

class SmartText extends Component {

  constructor(props) {
    super(props);

    const { question } = this.props
    
    this.state = {
      answer: {
        ...question.answer
      },
      smartListToggle: false
    };
  }

  componentWillReceiveProps(props) {
    const { question } = props;
    this.setState({
      answer: {
        ...question.answer,
        controlType: 'SMART_TEXT'
      }
    })
  }
  
  onShowSmartList = () => {
    this.setState({
      smartListToggle: true
    });
  }

  onCloseSmartList = (e) => {
    e.preventDefault();
    this.setState({
      smartListToggle: false,
    });
  }

  onSelectSmart = (text) => {
    const topicValue = text;
    this.setState((state) => ({
      'answer': {
        ...state.answer,
        'topicValue': topicValue,
        'skipValue': ''
      },
      smartListToggle: false
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  onInputSmartText = e => {
    const topicValue = e.target.value;
    this.setState((state) => ({
      'answer': {
        ...state.answer,
        'topicValue': topicValue,
        'skipValue': ''
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleSkip = skipAnswer => {
    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'skipValue': skipAnswer,
        'topicValue': ''
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleComment = commentAnswer => {
    this.setState( (state) => ({
      answer: {
        ...state.answer,
        'commentValue': commentAnswer
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  render() {
    const { question, skipQuestionList } = this.props;

    return (
      <div>
        <Row>
          <Colxx xs="12">
            <h1 className="mt-s">{question.questionText}</h1>
            <textarea onClick={e => this.onShowSmartList()} onChange={e => this.onInputSmartText(e)} className="materialize-textarea" rows="1" value={this.state.answer.topicValue}/>
            
          </Colxx>
          {this.state.smartListToggle && 
            <Colxx xs="12" >
              <div className="smart-list-section">
                <div className="header">
                  <a href="/" onClick={e=>this.onCloseSmartList(e)}><FontAwesomeIcon icon="times-circle"/> Hide Autosuggestions</a>
                </div>
                <div className="body">
                  <div className="row-container">
                    <Row className="smart-row">
                      <Colxx className="smart-col2" xs="4">Company</Colxx>
                      <Colxx className="smart-col" xs="8" onClick={(e) => this.onSelectSmart('Microsoft')}>Microsoft</Colxx>
                    </Row>
                  </div>
                  <div className="row-container">
                    <Row className="smart-row">
                      <Colxx className="smart-col2" xs="4">People</Colxx>
                      <Colxx className="smart-col" xs="8" onClick={(e) => this.onSelectSmart('Michale Scott')}>Michale Scott</Colxx>
                    </Row>
                    <Row className="smart-row">
                      <Colxx className="smart-col2" xs="4"> </Colxx>
                      <Colxx className="smart-col" xs="8" onClick={(e) => this.onSelectSmart('Michale Jefferson')}>Michale Jefferson</Colxx>
                    </Row>
                  </div>
                </div>
              </div>
            </Colxx>
          }
        </Row>
        <Row>
          <Colxx xs="12">
            <SkipQuestion 
              answer={this.state.answer.topicValue}  
              comment={this.state.answer.commentValue}
              commentPrompt={question.commentPrompt}
              skipValue={this.state.answer.skipValue}
              onSkip={skipAnswer => this.handleSkip(skipAnswer)} 
              skipOption={question.skipOption}
              skipQuestionList={skipQuestionList}
              onComment={commentAnswer => this.handleComment(commentAnswer)}/>
          </Colxx>
        </Row>
      </div>
    );
  }
}

export default SmartText
