import React, { Component } from "react";
import { Row } from "reactstrap";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colxx } from "Components/CustomBootstrap";
import Button from "Components/Button";

import styles from './styles.scss';

class SkipQuestion extends Component {

  constructor(props) {
    super(props);

    const { skipQuestionList, skipOption, comment } = props;

    let optionList = [];

    for (let i = 0 ; i < skipOption.length; i++) {
      for (let j = 0; j < skipQuestionList.length; j++) {
        if (skipOption[i] === skipQuestionList[j].id) {
          optionList.push(skipQuestionList[j]);
          break;
        }
      }
    }    

    this.state = {
      skipToogle: false,
      commentToggle: false,
      reason: 0,
      comment,
      optionList
    }
  }

  componentWillReceiveProps(props) {
    const { comment, skipValue } = props;

    if (skipValue === '') {
      this.setState({
        skipToogle: false
      })
    } else {
      this.setState({
        skipToogle: true
      })
    }

    if (comment === '') {
      this.setState({
        commentToggle: false
      })
    } else {
      this.setState({
        commentToggle: true
      })
    }

    this.setState({
      'comment': comment,
      reason: skipValue
    });
  }

  onSkipQuestion = e => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle
    });
  }

  onSelectSkipReason = (answer) => {
    this.setState({
      reason: answer
    }, () => {
      this.props.onSkip(answer);
    });
  }

  onShowCommentText = (e) => {
    e.preventDefault();
    this.setState({
      commentToggle: !this.state.commentToggle
    });
  }

  onInputComment = e => {

    const comment = e.target.value;

    this.setState({
      'comment': comment
    }, () => {
      this.props.onComment(comment);
    })
  }
  
  render() {

    // const { skipQuestionList, skipOption } = this.props;

    const { optionList, commentToggle, skipToogle } =  this.state;

    const btnsToDraw = [];
    if (!commentToggle) {
      btnsToDraw.push(
        (
          <a key="show-btn" href="/" className={styles["qsn-comment-button"]} onClick={(e) => this.onShowCommentText(e)}><FontAwesomeIcon icon={faComment} />Comment</a>
        )
      );
    } else {
      btnsToDraw.push(
        <a key="hide-btn" href="/" className={styles["hide-comment-button"]} onClick={(e) => this.onShowCommentText(e)}>Hide Comment</a>
      );
    }

    if (!skipToogle) {
        if (optionList.length > 0) {
          btnsToDraw.push(
            <a key="skip-btn" className={styles["qsn-skip"]} href="/" onClick={(e) => this.onSkipQuestion(e)}>Skip</a>
          );
        }
    } else {
      if (optionList.length > 0) {
        btnsToDraw.push(
            <div key="skip" className="skip">
              Why are you skiping this question? <a href="/" onClick={(e) => this.onSkipQuestion(e)}><strong>Cancel skip</strong></a>
            </div>
        );
      }
    }

    const separatedBtns = btnsToDraw.flatMap((d, i) => i > 0 ? [ <div key={"separator" + i} className={styles.separator} />, d ] : [ d ]);

    return (
      <div className={styles.main}>
        <div className={styles["action-btns"]}>
          {separatedBtns}
        </div>
        {skipToogle && optionList.length > 0 && 
          <div className={styles["skip-btns"]}>
            {
              optionList.map((item, index) => {
                const active = (item.optionName) === this.state.reason;
                return (
                  <Button 
                    key={item.id} 
                    active={active}
                    onClick={() => this.onSelectSkipReason(item.optionName)}>
                    {item.optionName}
                  </Button>
                )
              })
            }
          </div>
        }
        {this.state.commentToggle &&
          <div className="input-field">
            <input id="comment" type="text" className="" value={this.state.comment} onChange={e => this.onInputComment(e)} placeholder="Comment"/>
          </div>
        }
        
      </div>
    );
  }
}

export default SkipQuestion
