import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import M from "materialize-css";

import { Button } from 'reactstrap';

class NewStakeholder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      answer: 0,
      stakeholder: {
        ...props.stakeholder,
      },
      btnAddDisabled: ""
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
      },
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
    
    this.setState({
      btnAddDisabled: "disabled"
    }, () => {
      const stakeholder = { 
        ...this.state.stakeholder,
        show: true
      };
  
      this.props.onAddStakeholder(stakeholder);
    });
  }

  render() {
    
    const { shCategoryList, teamList } = this.props;
    const { btnAddDisabled } = this.state;

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
            <input id="email" type="email" className="validate"
              name="email" value={this.state.stakeholder.email} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <select value={this.state.stakeholder.shCategory} name="shCategory" onChange={e => this.handleInputChange(e)} >
              <option value="0">--Select--</option>
              {shCategoryList.map((sh, index) =>
                <option key={sh.id} value={sh.id}>{sh.SHCategoryName}</option>
              )}
            </select>
            <label>SH Category</label>
          </div>
          <div className="input-field">
            <input id="organisation" type="text" className="validate" 
              name="organisationId" value={this.state.stakeholder.organisationId} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="organisation">Organization</label>
          </div>
          <div className="input-field">
            <select value={this.state.stakeholder.teamId} name="teamId" onChange={e => this.handleInputChange(e)} >
              <option value="0">--Select--</option>
              {teamList.map((team, index) =>
                <option key={team.id} value={team.id}>{team.name}</option>
              )}
            </select>
            <label>Team</label>
          </div>
          <div className="input-field">
            <a className="waves-effect waves-light btn btn-danger active" 
              onClick={e=>this.props.onCancel(e)}>Back</a>&nbsp;&nbsp;
            <Button disabled={ btnAddDisabled }  className="waves-effect waves-light btn-xs right" onClick={e => this.handleAddStakeholder()}>Add stakeholder</Button>
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default NewStakeholder;
