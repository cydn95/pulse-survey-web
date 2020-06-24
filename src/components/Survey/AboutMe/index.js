import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

import M from "materialize-css";

import { connect } from "react-redux";

import { aboutMe } from "Redux/actions";

const choice = ["Team Member", "Internal", "External"];

class AboutMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skipToogle: false,
      aboutme: this.props.aboutMe,
      shType: -1,
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  onSkipQuestion = (e) => {
    e.preventDefault();

    this.setState({
      skipToogle: !this.state.skipToogle,
    });
  };

  inputChange = (e) => {
    this.setState(
      {
        aboutme: {
          ...this.state.aboutme,
          [e.target.name]: e.target.value,
        },
      },
      () => {
        this.props.onInputAboutMe(this.state.aboutme);
      }
    );
  };

  onSelectAnswer = (e, answer) => {
    e.preventDefault();
    this.setState({
      shType: answer,
    });
  };
  render() {
    const { teamData, shgroupData } = this.props;

    return (
      <div>
        <Row>
          <Colxx xs="12" className="survey-content">
            <div className="mt-1">
              <h1>About Me</h1>
            </div>
            <div className="mt-xs">
              <form>
                <section className="form">
                  <div className="input-field">
                    <input
                      id="first_name"
                      type="text"
                      className="validate"
                      defaultValue=""
                    />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="input-field">
                    <input
                      id="last_name"
                      type="text"
                      className="validate"
                      defaultValue=""
                    />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                  <div className="input-field">
                    <input
                      id="role"
                      type="text"
                      className="validate"
                      defaultValue=""
                    />
                    <label htmlFor="role">Role</label>
                  </div>
                  <div className="input-field">
                    <select
                      value={this.state.aboutme.team}
                      name="team"
                      onChange={(e) => this.inputChange(e)}
                    >
                      <option value="0">Select</option>
                      {teamData.map((team, index) => (
                        <option key={index} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <label>Team</label>
                  </div>
                  <div className="input-field hide">
                    <input
                      id="new_team"
                      type="text"
                      className="validate"
                      defaultValue=""
                    />
                    <label htmlFor="new_team">Team - No Team</label>
                    <div className="no-results">
                      <span className="no-results-header">
                        <i className="iconsmind-Magnifi-Glass"></i> No teams
                        found
                      </span>
                      <button className="waves-effect waves-light btn btn-second">
                        Create new team
                      </button>
                    </div>
                  </div>
                  <div className="input-field">
                    <select
                      value={this.state.aboutme.shGroup}
                      name="shGroup"
                      onChange={(e) => this.inputChange(e)}
                    >
                      <option value="0">Select</option>
                      {shgroupData.map((sh, index) => (
                        <option key={index} value={sh.id}>
                          {sh.SHGroupName}
                        </option>
                      ))}
                    </select>
                    <label>Stakeholder Group</label>
                  </div>
                  <div className="input-field">
                    <p>Stakeholder Type</p>
                    <div className="anwser-select2">
                      {choice.map((item, index) => {
                        let active =
                          index === this.state.shType ? "active" : "";
                        return (
                          <button
                            key={index}
                            className={
                              "waves-effect waves-light btn-large select2-btn " +
                              active
                            }
                            onClick={(e) => this.onSelectAnswer(e, index)}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </Colxx>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ common, settings, survey }) => {
  const { locale } = settings;
  const { teamList, shgroupList } = common;
  const { aboutMe } = survey;

  return {
    teamData: teamList,
    shgroupData: shgroupList,
    aboutMe,
    locale,
  };
};

export default connect(mapStateToProps, {
  onInputAboutMe: aboutMe,
})(AboutMe);
