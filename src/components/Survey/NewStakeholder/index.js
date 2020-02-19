import React, { Component } from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import M from "materialize-css";

import { Button } from 'reactstrap';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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

      const { stakeholder } = this.state;

      if (stakeholder.firstName.trim() == "") {
        NotificationManager.error('First name must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": ""
        });
        return;
      }

      if (stakeholder.lastName.trim() == "") {
        NotificationManager.error('Last name must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": ""
        });
        return;
      }

      if (stakeholder.shCategory == 0) {
        NotificationManager.error('SHCategory must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": ""
        });
        return;
      }

      if (stakeholder.organisationId.trim() == "") {
        NotificationManager.error('Organisation must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": ""
        });
        return;
      }

      if (stakeholder.teamId === 0) {
        NotificationManager.error('Team must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": ""
        });
        return;
      }

      const data = { 
        ...stakeholder,
        show: true
      };
  
      this.props.onAddStakeholder(data);
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
            <label htmlFor="firstName">First Name<span className="require">*</span></label>
          </div>
          <div className="input-field">
            <input id="lastName" type="text" className="validate"
                name="lastName" value={this.state.stakeholder.lastName} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="lastName">Last Name<span className="require">*</span></label>
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
            <label>SH Category<span className="require">*</span></label>
          </div>
          <div className="input-field">
            <input id="organisation" type="text" className="validate" 
              name="organisationId" value={this.state.stakeholder.organisationId} onChange={e => this.handleInputChange(e)} />
            <label htmlFor="organisation">Organization<span className="require">*</span></label>
          </div>
          <div className="input-field">
            <select value={this.state.stakeholder.teamId} name="teamId" onChange={e => this.handleInputChange(e)} >
              <option value="0">--Select--</option>
              {teamList.map((team, index) =>
                <option key={team.id} value={team.id}>{team.name}</option>
              )}
            </select>
            <label>Team<span className="require">*</span></label>
          </div>
          <div className="input-field">
            <a className="waves-effect waves-light btn btn-danger active" 
              onClick={e=>this.props.onCancel(e)}>Back</a>&nbsp;&nbsp;
            <Button disabled={ btnAddDisabled }  className="waves-effect waves-light btn-xs right" onClick={e => this.handleAddStakeholder()}>Add stakeholder</Button>
          </div>
        </Colxx>
        <NotificationContainer/>
      </Row>
    );
  }
}

export default NewStakeholder;
