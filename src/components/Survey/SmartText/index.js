import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SkipQuestion from "../SkipQuestion";

class SmartText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      smartListToggle: false,
      smartText: ''
    }
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
      smartText: ''
    });
  }

  onSelectSmart = (text) => {
    this.setState({
      smartText: text,
      smartListToggle: false
    });
  }

  onInputSmartText = e => {
    this.setState({
      smartText: e.target.value
    });
  }
  render() {
    const { question } = this.props;
    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">{question.questionText}</h1>
          <textarea onClick={e => this.onShowSmartList()} onChange={e => this.onInputSmartText(e)} className="materialize-textarea" rows="1" value={this.state.smartText}/>
          <SkipQuestion />
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
    );
  }
}

export default SmartText
