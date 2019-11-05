import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import M from "materialize-css";

import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewStakeholder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      answer: 0,
      stakeholder: {
        ...props.stakeholder,
        projectId: Date.now(),
	      userId: Date.now()  
      }
    };
  }

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  componentWillReceiveProps(props) {
    const { stakeholder } = props;
    this.setState({
      'stakeholder': {
        ...stakeholder
      }
    });
  }

  onSelectAnswer = (e, answer) => {
    e.preventDefault();
    
    const organization = answer;

    this.setState({
      stakeholder: {
        ...this.state.stakeholder,
        'organization': organization
      }
    });
  }

  handleInputChange = e => {
    this.setState({
      stakeholder: {
        ...this.state.stakeholder,
        [e.target.name]: e.target.value
      }
    });
  }

  handleAddStakeholder = () => {
    const stakeholder = { 
      ...this.state.stakeholder,
      show: true
    };

    this.props.onAddStakeholder(stakeholder);
  }

  render() {
    
    let firstAnswerActive = this.state.stakeholder.organization === 1 ? ' active' : '';
    let secondAnswerActive = this.state.stakeholder.organization === 2 ? ' active' : '';

    return (
      <Row>
        <Colxx xs="12">
          <h1 className="mt-s">Add New StakeHolder</h1>  
          <div className="input-field">
            <input id="firstName" type="text" className="validate" 
              name="firstName" value={this.state.stakeholder.firstName} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field">
            <input id="lastName" type="text" className="validate"
                name="lastName" value={this.state.stakeholder.lastName} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field">
            <select value={this.state.stakeholder.shType} name="shType" onChange={e => this.handleInputChange(e)} >
              <option value="0">--Select--</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
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
            <input id="email" type="email" className="validate"
              name="email" value={this.state.stakeholder.email} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="phone" type="tel" className="validate"
              name="phone" value={this.state.stakeholder.phone} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field">
            <h2 className="label">Organisation</h2>
            <div className="input-field anwser-select2">
              <a className={"waves-effect waves-light btn select2-btn " + firstAnswerActive} onClick={e => this.onSelectAnswer(e, 1)}>
                He/she you works for us?</a>
              <a className={"waves-effect waves-light btn select2-btn " + secondAnswerActive} onClick={e => this.onSelectAnswer(e, 2)}>
                He/she you works for someone else</a>
            </div>
          </div>
          <div className="input-field">
            <input type="text" id="autocomplete-input" className="autocomplete" 
              name="team" value={this.state.stakeholder.team} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="autocomplete-input"><i className="fas fa-search"></i> What team he/she is on?</label>
          </div>
          <div className="input-field">
            <Button className="waves-effect waves-light btn-xs right" onClick={e => this.handleAddStakeholder()}>Add stakeholder</Button>
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default NewStakeholder;
