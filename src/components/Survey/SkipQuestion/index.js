import React, { Component } from "react";
import { Row } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colxx } from "Components/CustomBootstrap";

class SkipQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      skipToogle: false,
      commentToggle: false,
      reason: 0,
      comment: ''
    }
  }

  onSkipQuestion = e => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle
    });
  }

  onSelectSkipReason = (e, answer) => {
    e.preventDefault();

    this.setState({
      reason: answer
    });
  }

  onShowCommentText = (e) => {
    e.preventDefault();
    this.setState({
      commentToggle: !this.state.commentToggle
    });
  }

  onInputComment = e => {
    this.setState({
      comment: e.target.value
    })
  }
  render() {

    let firstAnswerActive = this.state.reason === 1 ? ' active' : '';
    let secondAnswerActive = this.state.reason === 2 ? ' active' : '';
    let thirdAnswerActive = this.state.reason === 3 ? ' active' : '';
    let fourthAnswerActive = this.state.reason === 4 ? ' active' : '';

    return (
      <Row>
        <Colxx xs="12">
          {!this.state.commentToggle &&
            <a href="/" class="comment-button" onClick={(e) => this.onShowCommentText(e)}><FontAwesomeIcon icon="plus-circle"/> Add Comment</a>
          }
          {this.state.commentToggle &&
            <a href="/" class="comment-button" onClick={(e) => this.onShowCommentText(e)}><FontAwesomeIcon icon="minus-circle"/> Hide Comment</a>
          }
          {this.state.commentToggle &&
            <div className="input-field">
              <input id="comment" type="text" className="" value={this.state.comment} onChange={e => this.onInputComment(e)} placeholder="Comment"/>
            </div>
          }
          {!this.state.skipToogle &&
            <a href="/" onClick={(e) => this.onSkipQuestion(e)}>Skip this question</a>
          }
          {this.state.skipToogle &&
            <div>
              <div>
                Why are you skiping this question? <a href="/" onClick={(e) => this.onSkipQuestion(e)}>Cancel skip</a>
              </div>
              <div className="anwser-select2">
                <a className={"waves-effect waves-light btn select2-btn" + firstAnswerActive} onClick={e => this.onSelectSkipReason(e, 1)}>It doesn't apply to me</a>
                <a className={"waves-effect waves-light btn select2-btn" + secondAnswerActive} onClick={e => this.onSelectSkipReason(e, 2)}>I don't understand it</a>
                <a className={"waves-effect waves-light btn select2-btn" + thirdAnswerActive} onClick={e => this.onSelectSkipReason(e, 3)}>I don't have an option</a>
                <a className={"waves-effect waves-light btn select2-btn" + fourthAnswerActive} onClick={e => this.onSelectSkipReason(e, 4)}>Other</a>
              </div>
            </div>
          }
        </Colxx>
      </Row>
    );
  }
}

export default SkipQuestion
