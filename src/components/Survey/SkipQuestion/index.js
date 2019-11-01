import React, { Component } from "react";
import { Row } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colxx } from "Components/CustomBootstrap";

const skipChoices = [
  "It doesn't apply to me",
  "I don't understand it",
  "I don't have an option",
  "Other"
]
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

  componentWillReceiveProps(props) {
    const { answer } = props;
    if (answer !== '' && answer !== 0) {
      this.setState({
        reason: 0,
        skipToogle: false
      });
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
    }, () => {
      this.props.onSkip(skipChoices[answer - 1]);
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

    return (
      <Row>
        <Colxx xs="12">
          {!this.state.commentToggle &&
            <a href="/" className="comment-button" onClick={(e) => this.onShowCommentText(e)}><FontAwesomeIcon icon="plus-circle"/> Add Comment</a>
          }
          {this.state.commentToggle &&
            <a href="/" className="comment-button" onClick={(e) => this.onShowCommentText(e)}><FontAwesomeIcon icon="minus-circle"/> Hide Comment</a>
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
              <div className="anwser-select-n mt-3">
              {
                skipChoices.map((item, index) => {
                  let active = (index + 1) === this.state.reason ? 'active' : '';
                  return (
                    <a key={index}  className={"waves-effect waves-light btn select2-btn " + active}
                      onClick={e => this.onSelectSkipReason(e, index + 1)}>
                      {item}
                    </a>
                  )
                })
              }
              </div>
            </div>
          }
        </Colxx>
      </Row>
    );
  }
}

export default SkipQuestion
