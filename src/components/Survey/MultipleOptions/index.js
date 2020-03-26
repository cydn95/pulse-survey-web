import React, { Component } from "react";
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import SkipQuestion from "../SkipQuestion";
import Radio from "Components/Radio";
import Option from "Components/multi-topic/option";
import Button from "Components/Button";

import {
  addAboutMeTopic,
  addAboutOtherTopic
} from "Redux/actions";

import styles from "./styles.scss";

import { replaceQuestionTextKeyWord } from 'Constants/defaultValues';

class MultipleOptions extends Component {

  constructor(props) {
    super(props);

    const { question, options } = props

    let optionList = [];

    for (let i = 0; i < question.option.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (question.option[i] === options[j].id) {
          optionList.push(options[j]);
          break;
        }
      }
    }

    this.state = {
      answer: {
        ...question.answer,
      },
      optionList,
      input: false,
      newTopic: '',
      topicList: [
        ...question.topic
      ]
    };

  }

  componentWillReceiveProps(props) {
    const { question } = props;

    this.setState({
      answer: {
        ...question.answer,
        controlType: 'MULTI_OPTIONS'
      }
    })
  }

  onSelectAnswer = (answerIndex, answerText) => {

    this.setState((state) => ({
      answer: {
        ...state.answer,
        'integerValue': answerIndex,
        'topicValue': answerText,
        'skipValue': ''
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleSkip = skipAnswer => {
    this.setState((state) => ({
      answer: {
        ...state.answer,
        'skipValue': skipAnswer,
        'integerValue': 0
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleComment = commentAnswer => {
    this.setState((state) => ({
      answer: {
        ...state.answer,
        'commentValue': commentAnswer
      }
    }), () => {
      this.props.onAnswer(this.state.answer);
    });
  }

  handleAddPanel = () => {
    this.setState({
      input: true
    })
  }

  handleSaveTopic = () => {
    if (this.state.newTopic.trim() !== '') {

      if (this.props.type === "am") {
        this.props.addAboutMeTopic(
          this.state.newTopic, 
          this.props.question.id, 
          this.props.projectUserId, 
          this.props.question.answer.pageIndex, 
          this.props.question.answer.questionIndex,
          this.callbackSaveTopicMe
        );
      } else {
        this.props.addAboutOtherTopic(
          this.state.newTopic, 
          this.props.question.id, 
          this.props.projectUserId, 
          this.props.question.answer.questionIndex, 
          this.callbackSaveTopicOther
        );
      }

      this.setState({
        input: false,
        newTopic: ''
      });
    }
  }

  callbackSaveTopicMe = data => {
    console.log(data);
    this.setState((state) => ({
      topicList: [...state.topicList, data]
    }));
  }

  callbackSaveTopicOther = data => {
    console.log(data);
    this.setState((state) => ({
      topicList: [...state.topicList, data]
    }));
  }

  handleInputNewTopic = (e) => {
    this.setState({
      newTopic: e.target.value
    })
  }

  render() {

    const { question, skipQuestionList, user } = this.props;
    const { optionList } = this.state;

    return (
      <div className={styles.main}>
        <div>
          <h2 className={styles["question-text"]}>{replaceQuestionTextKeyWord(question.questionText, user)}</h2>
        </div>
        <div className={styles["question-selector"]}>
          {
            optionList.map((item, index) => {
              const active = item.id === this.state.answer.integerValue;
              return (
                <div key={item.id} className={styles['option-item']}>
                  <Radio
                    checked={active}
                    onChange={() => this.onSelectAnswer(item.id, item.optionName)}
                  >
                    {item.optionName}
                  </Radio>
                </div>
              )
            })
          }
          {
            this.state.topicList.map((item) => {
              let selectedValue = 0;
              if (this.state.answer.integerValue.toString().includes("T-")) {
                selectedValue = this.state.answer.integerValue.toString().replace("T-", "");
              }
              const active = item.id === parseInt(selectedValue, 10);
              return (
                <div key={`topic-${item.id}`} className={styles['option-item']}>
                  <Option
                    checked={active}
                    onSelectTopic={(e) => this.onSelectAnswer('T-' + item.id, item.topicName)}
                    topic={item.topicName}
                    comment={''}
                  />
                </div>
              )
            })
          }
          <div className={styles['topic-wrapper']}>
            {!this.state.input && <Button className={styles['add-topic']} onClick={e => this.handleAddPanel()}>ADD NEW TOPIC</Button>}
            {this.state.input && <TextField value={this.state.newTopic} onChange={e => this.handleInputNewTopic(e)} className={styles['input-topic']} />}
            {this.state.input && <Button className={styles['add-topic']} onClick={e => this.handleSaveTopic()}>SAVE NEW TOPIC</Button>}
          </div>
        </div>
        <SkipQuestion
          answer={this.state.answer.integerValue}
          comment={this.state.answer.commentValue}
          commentPrompt={question.commentPrompt}
          skipValue={this.state.answer.skipValue}
          onSkip={skipAnswer => this.handleSkip(skipAnswer)}
          skipOption={question.skipOption}
          skipQuestionList={skipQuestionList}
          onComment={commentAnswer => this.handleComment(commentAnswer)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {

  const { projectUserId } = authUser;

  return {
    projectUserId
  };
};

export default connect(
  mapStateToProps,
  {
    addAboutMeTopic,
    addAboutOtherTopic
  }
)(MultipleOptions);
