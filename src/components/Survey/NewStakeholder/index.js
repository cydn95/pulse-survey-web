import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";
import M from "materialize-css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewStakeholder extends Component {

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  constructor(props) {
    super(props);

    const { question } = this.props
    
    this.state = {
      answer: {
        ...question.answer
      }
    };
  }

  onSelectAnswer = (e, answer) => {
    e.preventDefault();
    
    this.setState({
      "answer": answer
    });
  }

  render() {
    
    let firstAnswerActive = this.state.answer === 1 ? ' active' : '';
    let secondAnswerActive = this.state.answer === 2 ? ' active' : '';

    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">Add New StakeHolder</h1>  
          <div className="input-field">
            <input id="first_name" type="text" className="validate"/>
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field">
            <input id="last_name" type="text" className="validate"/>
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="input-field">
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3" selected="selected">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
              <option value="6">Option 6</option>
              <option value="7">Option 7</option>
              <option value="8">Option 8</option>
              <option value="9">Option 9</option>
              <option value="10">Option 10</option>
              <option value="11">Option 11</option>
              <option value="12">Option 12</option>
              <option value="13">Option 13</option>
              <option value="14">Option 14</option>
              <option value="15">Option 15</option>
              <option value="16">Option 16</option>
              <option value="17">Option 17</option>
            </select>
            <label>SH Type</label>
          </div>
          <div className="input-field">
            <input id="email" type="email" className="validate"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="phone" type="tel" className="validate"/>
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field">
            <h2 className="label">Organisation</h2>
            <div className="input-field anwser-select2">
              <a className={"waves-effect waves-light btn select2-btn " + firstAnswerActive} onClick={e => this.onSelectAnswer(e, 1)}>
                Answer1</a>
              <a className={"waves-effect waves-light btn select2-btn " + secondAnswerActive} onClick={e => this.onSelectAnswer(e, 2)}>
                Answer2</a>
            </div>
          </div>
          <div className="input-field">
            <input type="text" id="autocomplete-input" className="autocomplete" />
            <label htmlFor="autocomplete-input"><i className="fas fa-search"></i> What team he/she is on? (type M to test it)</label>
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default NewStakeholder;
