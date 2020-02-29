import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import styles from './styles.scss';

class NewStakeholder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      answer: 0,
      stakeholder: {
        ...props.stakeholder,
      },
      btnAddDisabled: false
    };

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
      btnAddDisabled: true
    }, () => {

      const { stakeholder } = this.state;

      if (stakeholder.firstName.trim() === "") {
        NotificationManager.error('First name must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
        });
        return;
      }

      if (stakeholder.lastName.trim() === "") {
        NotificationManager.error('Last name must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
        });
        return;
      }

      if (stakeholder.email.trim() === "") {
        NotificationManager.error('Email must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
        });
        return;
      }

      if (stakeholder.shCategory === 0) {
        NotificationManager.error('SHCategory must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
        });
        return;
      }

      if (stakeholder.organisationId.trim() === "") {
        NotificationManager.error('Organisation must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
        });
        return;
      }

      if (stakeholder.teamId === 0) {
        NotificationManager.error('Team must be required', 'Info', 2000);
        this.setState({
          "btnAddDisabled": false
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
      <div className={ styles.root }>
        <div>
          <h1 className={ styles.title }>Add New StakeHolder</h1>  
        </div>
        <div className={ styles.form }>
          <div className={ styles['input-field'] }>
            <TextField
              className={ styles.input } 
              label="First Name*"
              name="firstName"
              value={ this.state.stakeholder.firstName }
              onChange={ e => this.handleInputChange(e) }
            />
          </div>
          <div className={ styles['input-field'] }>
            <TextField
              className={ styles.input } 
              label="Last Name*"
              name="lastName"
              value={this.state.stakeholder.lastName}
              onChange={ e => this.handleInputChange(e) }
            />
          </div>
          <div className={ styles['input-field'] }>
            <TextField
              className={ styles.input } 
              label="Email*"
              name="email"
              value={this.state.stakeholder.email}
              onChange={ e => this.handleInputChange(e) }
            />
          </div>
          <div className={ styles['input-field'] }>
            <Select
              value={this.state.shCategory} 
              className={ styles.input }
              name="shCategory"
              label="Sh Category*"
              onChange={e => this.handleInputChange(e)}
            >
              {shCategoryList.map((sh, index) =>
                 <MenuItem key={sh.id} value={sh.id}>{sh.SHCategoryName}</MenuItem>
              )}
            </Select>
          </div>
          <div className={ styles['input-field'] }>
            <TextField
              className={ styles.input } 
              label="Organisation*"
              name="organisationId"
              value={this.state.stakeholder.organisationId}
              onChange={ e => this.handleInputChange(e) }
            />
          </div>
          <div className={ styles['input-field'] }>
            <Select
              value={this.state.teamId} 
              className={ styles.input }
              name="teamId"
              label="Sh Category*"
              onChange={e => this.handleInputChange(e)}
            >
              {teamList.map((team, index) =>
                 <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
              )}
            </Select>
          </div>
          <div className={ styles['form-button'] }>
            {/* <a className="waves-effect waves-light btn btn-danger active" 
              onClick={e=>this.props.onCancel(e)}>Back</a>&nbsp;&nbsp; */}
            <Button 
              variant="contained"
              color="secondary"
              onClick={e=>this.props.onCancel(e)}>
              Back
            </Button>
            <div className={styles.space}></div>
            <Button 
              variant="contained"
              className={styles.green}
              disabled={ btnAddDisabled } 
              onClick={e => this.handleAddStakeholder()}>
              Add stakeholder
            </Button>
          </div>
        </div>
        <NotificationContainer/>
      </div>
    );
  }
}

export default NewStakeholder;
