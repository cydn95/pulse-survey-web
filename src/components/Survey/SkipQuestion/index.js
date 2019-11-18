import React, { Component } from "react";
import { Row } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colxx } from "Components/CustomBootstrap";

class SkipQuestion extends Component {

  constructor(props) {
    super(props);

    const { skipQuestionList, skipOption } = props;

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
      comment: '',
      optionList
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

    const { optionList } =  this.state;

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
          {!this.state.skipToogle && optionList.length > 0 && 
            <a class="skip" href="/" onClick={(e) => this.onSkipQuestion(e)}>Skip this question</a>
          }
          {this.state.skipToogle && optionList.length > 0 && 
            <div class="skip">
              <div>
                Why are you skiping this question? <a href="/" onClick={(e) => this.onSkipQuestion(e)}>Cancel skip</a>
              </div>
              <div className="anwser-select-n mt-3">
              {
                optionList.map((item, index) => {
                  let active = (item.id) === this.state.reason ? 'active' : '';
                  return (
                    <a key={item.id}  className={"waves-effect waves-light btn select2-btn " + active}
                      onClick={e => this.onSelectSkipReason(e, item.id)}>
                      {item.optionName}
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
