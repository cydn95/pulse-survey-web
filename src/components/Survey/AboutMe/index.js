import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import M from 'materialize-css';

class AboutMe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      skipToogle: false
    }
  }

  componentDidMount() {
    M.AutoInit();
  }

  onSkipQuestion = (e) => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Colxx xs="12" md="6" className="survey-content">
            <div>Project</div>
            <div className="mt-xs">
              <h1 className="project-name">Alfa Project</h1>
            </div>
            <div className="mt-h">
              <h1>About Me</h1>
            </div>
            <div className="mt-xs">
              <form>
                <section className="form">
                  <div className="input-field">
                    <input id="first_name" type="text" className="validate"/>
                    <label for="first_name">First Name</label>
                  </div>
                  <div className="input-field">
                    <input id="last_name" type="text" className="validate"/>
                    <label for="last_name">Last Name</label>
                  </div>
                  <div className="input-field">
                    <input id="role" type="text" className="validate"/>
                    <label for="role">Role</label>
                  </div>
                  <div className="input-field">
                    <select>
                      <option value="1">Team 1</option>
                      <option value="2">Team 2</option>
                      <option value="3" selected="selected">Team 3</option>
                    </select>
                    <label>Team</label>
                  </div>
                  <div className="input-field">
                    <input id="new_team" type="text" className="validate" />
                    <label for="new_team">Team - No Team</label>
                    <div className="no-results">
                      <span className="no-results-header">
                        <i className="iconsmind-Magnifi-Glass"></i> No teams found
                      </span>
                      <button className="waves-effect waves-light btn btn-second">Create new team</button>
                    </div>
                  </div>
                  <div className="input-field">
                    <select>
                      <option value="1">Group 1</option>
                      <option value="2">Group 2</option>
                      <option value="3" selected="selected">Group3</option>
                    </select>
                    <label>Stackholder Group</label>
                  </div>
                  <div className="input-field">
                    <p>
                      Stackholder Type
                    </p>
                    <div className="anwser-select2">
                      <a className="waves-effect waves-light btn-large select2-btn active">Team Member</a>
                      <a className="waves-effect waves-light btn-large select2-btn">Internal</a>
                      <a className="waves-effect waves-light btn-large select2-btn">External</a>
                    </div>
                  </div>
                  <div className="input-field mt-xs">
                    <button className="waves-effect waves-light btn black btn-continue right">Add Stackholder</button>
                  </div>
                </section>
              </form>
            </div>
          </Colxx>
          <Colxx xs="12" md="6" className="survey-image type-aboutme">
            <div className="project-ai-logo">project-ai-logo</div>
          </Colxx>
        </Row>
      </div>
    );
  }
}

export default AboutMe
