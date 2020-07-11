import React, { Component } from "react";
import { connect } from "react-redux";

import SkipQuestion from "../SkipQuestion";
import Radio from "Components/Radio";
import Option from "Components/multi-topic/option";
import { EditableOption } from "Components/multi-topic/option";
import Button from "Components/Button";

import EditTopicDialog from "./EditTopicDlg";
import MButton from "@material-ui/core/Button";

import {
  addAboutMeTopic,
  updateAboutMeTopic,
  deleteAboutMeTopic,
  addAboutOtherTopic,
} from "Redux/actions";

import { replaceQuestionTextKeyWord } from "Constants/defaultValues";

import styles from "./styles.scss";
import classnames from "classnames";

class MultiTopics extends Component {
  constructor(props) {
    super(props);

    const { question, options } = props;

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
      newTopic: "",
      newComment: "",
      topicList: [...question.topic],
      editDlgOpen: false,
      editId: 0,
      editName: "",
      editComment: "",
      btnDeleteDisable: false,
    };
  }

  componentWillReceiveProps(props) {
    const { question } = props;

    this.setState({
      answer: {
        ...question.answer,
        controlType: "MULTI_TOPICS",
      },
    });
  }

  onSelectAnswer = (answerIndex, answerText) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          integerValue: answerIndex,
          topicValue: answerText,
          skipValue: "",
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  handleSkip = (skipAnswer) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          skipValue: skipAnswer,
          integerValue: 0,
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  handleComment = (commentAnswer) => {
    this.setState(
      (state) => ({
        answer: {
          ...state.answer,
          commentValue: commentAnswer,
        },
      }),
      () => {
        this.props.onAnswer(this.state.answer);
      }
    );
  };

  handleAddPanel = () => {
    this.setState({
      input: true,
    });
  };

  handleSaveTopic = () => {
    if (this.state.newTopic.trim() !== "") {
      if (this.props.type === "am") {
        this.props.addAboutMeTopic(
          this.state.newTopic,
          this.state.newComment,
          this.props.question.id,
          this.props.surveyUserId,
          this.props.question.answer.pageIndex,
          this.props.question.answer.questionIndex,
          this.callbackSaveTopicMe
        );
      } else {
        this.props.addAboutOtherTopic(
          this.state.newTopic,
          this.state.newComment,
          this.props.question.id,
          this.props.surveyUserId,
          this.props.question.answer.questionIndex,
          this.callbackSaveTopicOther
        );
      }

      this.setState({
        input: false,
        newTopic: "",
        newComment: "",
      });
    }
  };

  callbackSaveTopicMe = (data) => {
    this.setState((state) => ({
      topicList: [...state.topicList, data],
    }));
  };

  callbackSaveTopicOther = (data) => {
    this.setState((state) => ({
      topicList: [...state.topicList, data],
    }));
  };

  handleInputNewTopic = (value) => {
    this.setState({
      newTopic: value,
    });
  };

  handleInputNewComment = (value) => {
    this.setState({
      newComment: value,
    });
  };

  handleEditTopic = (id, name, comment) => {
    this.setState({
      editDlgOpen: true,
      editId: id,
      editName: name,
      editComment: comment,
    });
  };

  handleDeleteTopic = (id) => {
    this.setState({
      btnDeleteDisable: true,
    });
    if (this.props.type === "am") {
      this.props.deleteAboutMeTopic(
        id,
        this.props.question.answer.pageIndex,
        this.props.question.answer.questionIndex,
        this.callbackDeleteTopicMe
      );
    } else {
    }
  };

  callbackDeleteTopicMe = (id) => {
    const topicList = [...this.state.topicList];
    const topicIndex = topicList.findIndex((item) => item.id === id);
    topicList.splice(topicIndex, 1);
    this.setState({
      topicList,
      btnDeleteDisable: false,
    });
  };

  handleCloseEditDlg = () => {
    this.setState({
      editDlgOpen: false,
      editId: 0,
      editName: "",
      editComment: "",
    });
  };

  handleUpdateTopic = (topicName, topicComment) => {
    if (this.props.type === "am") {
      this.props.updateAboutMeTopic(
        this.state.editId,
        topicName,
        topicComment,
        this.props.question.id,
        this.props.surveyUserId,
        this.props.question.answer.pageIndex,
        this.props.question.answer.questionIndex,
        this.callbackUpdateTopicMe
      );

      this.setState({
        editDlgOpen: false,
        editId: 0,
        editName: "",
        editComment: "",
      });
    } else {
    }
  };

  callbackUpdateTopicMe = (topicId, data) => {
    const topicList = [...this.state.topicList];
    const topicIndex = topicList.findIndex((item) => item.id === topicId);
    topicList[topicIndex] = {
      ...data,
    };

    this.setState((state) => ({
      topicList: [...topicList],
    }));
  };

  render() {
    const { question, skipQuestionList, user, projectTitle } = this.props;
    const { optionList } = this.state;

    return (
      <div className={styles.main}>
        <div>
          <h2 className={styles["question-text"]}>
            {replaceQuestionTextKeyWord(
              question.questionText,
              user,
              projectTitle
            )}
          </h2>
        </div>
        <div className={styles["question-selector"]}>
          {optionList.map((item, index) => {
            const active = item.id === this.state.answer.integerValue;
            return (
              <div key={item.id} className={styles["option-item"]}>
                <Radio
                  checked={active}
                  onChange={() => this.onSelectAnswer(item.id, item.optionName)}
                >
                  {item.optionName}
                </Radio>
              </div>
            );
          })}
          {this.state.topicList.map((item) => {
            let selectedValue = 0;
            if (this.state.answer.integerValue.toString().includes("T-")) {
              selectedValue = this.state.answer.integerValue
                .toString()
                .replace("T-", "");
            } else {
              selectedValue = this.state.answer.integerValue;
            }
            const active = item.id === parseInt(selectedValue, 10);
            return (
              <div key={`topic-${item.id}`} className={styles["option-item"]}>
                <Option
                  checked={active}
                  topic={item.topicName}
                  onSelectTopic={(e) =>
                    this.onSelectAnswer("T-" + item.id, item.topicName)
                  }
                  comment={item.topicComment}
                />
                <div className={styles.space}>
                  <MButton
                    className={classnames(styles["edit-btn"], {
                      [styles["green"]]: active,
                    })}
                    variant={active ? "contained" : "outlined"}
                    color="primary"
                    size="small"
                    onClick={(e) =>
                      this.handleEditTopic(
                        item.id,
                        item.topicName,
                        item.topicComment
                      )
                    }
                  >
                    Edit
                  </MButton>
                  <MButton
                    className={styles["edit-btn"]}
                    variant={active ? "contained" : "outlined"}
                    color="secondary"
                    size="small"
                    disabled={this.state.btnDeleteDisable}
                    onClick={(e) => this.handleDeleteTopic(item.id)}
                  >
                    Delete
                  </MButton>
                </div>
              </div>
            );
          })}
          <div className={styles["topic-wrapper"]}>
            {this.state.input && (
              <EditableOption
                onFocus={(e) => {}}
                onBlur={(e) => {}}
                topic={this.state.newTopic}
                comment={this.state.newComment}
                changeTopic={(value) => this.handleInputNewTopic(value)}
                changeComment={(value) => this.handleInputNewComment(value)}
                topicPlaceholder={question.topicPrompt}
                commentPlaceholder={question.commentPrompt}
              />
            )}
            {!this.state.input && (
              <Button
                className={styles["add-topic"]}
                onClick={(e) => this.handleAddPanel()}
              >
                ADD NEW TOPIC
              </Button>
            )}
            {this.state.input && (
              <Button
                className={styles["save-topic"]}
                onClick={(e) => this.handleSaveTopic()}
              >
                SAVE NEW TOPIC
              </Button>
            )}
          </div>
        </div>
        <SkipQuestion
          answer={this.state.answer.integerValue}
          comment={this.state.answer.commentValue}
          commentPrompt={question.commentPrompt}
          skipValue={this.state.answer.skipValue}
          onSkip={(skipAnswer) => this.handleSkip(skipAnswer)}
          skipOption={question.skipOption}
          skipQuestionList={skipQuestionList}
          onComment={(commentAnswer) => this.handleComment(commentAnswer)}
        />
        <EditTopicDialog
          open={this.state.editDlgOpen}
          onClose={(e) => this.handleCloseEditDlg()}
          onSave={(topicName, topicComment) =>
            this.handleUpdateTopic(topicName, topicComment)
          }
          topicName={this.state.editName}
          topicComment={this.state.editComment}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { surveyUserId } = authUser;

  return {
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  addAboutMeTopic,
  updateAboutMeTopic,
  deleteAboutMeTopic,
  addAboutOtherTopic,
})(MultiTopics);
