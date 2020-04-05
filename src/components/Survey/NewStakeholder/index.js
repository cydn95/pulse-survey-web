import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import styles from "./styles.scss";

class NewStakeholder extends Component {
  constructor(props) {
    super(props);

    if (props.update) {
      this.state = {
        stakeholder: {
          projectUserId: props.stakeholder.projectUserId,
          projectId: props.stakeholder.projectId.id,
          userId: props.stakeholder.userId.split("_")[1],
          fullName: props.stakeholder.fullName,
          teamId: props.stakeholder.teamId.split("_")[1],
          team: props.stakeholder.team,
          organisationId: props.stakeholder.organisationId.split("_")[1],
          organisation: props.stakeholder.organisation,
          shCategory: props.stakeholder.shCategory.split("_")[1],
          show: true,
          firstName: props.stakeholder.fullName.split(" ")[0],
          lastName: props.stakeholder.fullName.split(" ")[1],
          email: props.stakeholder.email,
          projectUserRoleDesc: props.stakeholder.projectUserTitle,
          projectUserTitle: props.stakeholder.projectUserRoleDesc,
        },
        answer: 0,
        btnAddDisabled: false,
      };
    } else {
      this.state = {
        answer: 0,
        stakeholder: {
          ...props.stakeholder,
        },
        btnAddDisabled: false,
      };
    }

  }

  componentWillReceiveProps(props) {
    const { stakeholder } = props;

    this.setState({
      stakeholder: {
        ...stakeholder,
      },
    });
  }

  handleInputChange = (e) => {
    this.setState({
      stakeholder: {
        ...this.state.stakeholder,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleAddStakeholder = () => {
    this.setState(
      {
        btnAddDisabled: true,
      },
      () => {
        const { stakeholder } = this.state;

        if (stakeholder.firstName.trim() === "") {
          NotificationManager.error(
            "First name must be required",
            "Info",
            2000
          );
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        if (stakeholder.lastName.trim() === "") {
          NotificationManager.error("Last name must be required", "Info", 2000);
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        if (stakeholder.email.trim() === "") {
          NotificationManager.error("Email must be required", "Info", 2000);
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        if (stakeholder.shCategory === 0) {
          NotificationManager.error(
            "SHCategory must be required",
            "Info",
            2000
          );
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        if (stakeholder.organisationId.trim() === "") {
          NotificationManager.error(
            "Organisation must be required",
            "Info",
            2000
          );
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        if (stakeholder.teamId === 0) {
          NotificationManager.error("Team must be required", "Info", 2000);
          this.setState({
            btnAddDisabled: false,
          });
          return;
        }

        const data = {
          ...stakeholder,
          show: true,
        };

        this.props.onAddStakeholder(data);
      }
    );
  };

  render() {
    const { shCategoryList, teamList } = this.props;
    const update = this.props.update ? this.props.update : false;

    const { btnAddDisabled } = this.state;

    return (
      <div className={styles.root}>
        <div>
          <h1 className={styles.title}>Add New StakeHolder</h1>
        </div>
        <div className={styles.form}>
          <FormControl className={styles["input-field"]}>
            <TextField
              className={styles.input}
              label="First Name*"
              name="firstName"
              value={this.state.stakeholder.firstName}
              onChange={(e) => this.handleInputChange(e)}
              disabled={update}
            />
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <TextField
              className={styles.input}
              label="Last Name*"
              name="lastName"
              value={this.state.stakeholder.lastName}
              onChange={(e) => this.handleInputChange(e)}
              disabled={update}
            />
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <TextField
              className={styles.input}
              name="email"
              label="Email*"
              value={this.state.stakeholder.email}
              onChange={(e) => this.handleInputChange(e)}
              disabled={update}
            />
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <TextField
              className={styles.input}
              label="Organisation*"
              name="organisationId"
              value={this.state.stakeholder.organisationId}
              onChange={(e) => this.handleInputChange(e)}
              disabled={update}
            />
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <TextField
              className={styles.input}
              label="Project Title"
              name="projectUserTitle"
              value={this.state.stakeholder.projectUserTitle}
              onChange={(e) => this.handleInputChange(e)}
              disabled={update}
            />
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <InputLabel id="team_label">Team*</InputLabel>
            <Select
              value={this.state.stakeholder.teamId}
              className={styles.select}
              name="teamId"
              label="Team*"
              disabled={update}
              onChange={(e) => this.handleInputChange(e)}
            >
              {teamList.map((team, index) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <InputLabel id="shcategory_label">Category</InputLabel>
            <Select
              value={this.state.stakeholder.shCategory}
              className={styles.select}
              name="shCategory"
              label="Sh Category*"
              onChange={(e) => this.handleInputChange(e)}
            >
              {shCategoryList.map((sh, index) => (
                <MenuItem key={sh.id} value={sh.id}>
                  {sh.SHCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles["input-field"]}>
            <div className={styles.label}>
              How would you describe this person’s role on the project?​
            </div>
            <TextField
              className={styles.input}
              label=""
              name="projectUserRoleDesc"
              value={this.state.stakeholder.projectUserRoleDesc}
              disabled={update}
              onChange={(e) => this.handleInputChange(e)}
            />
          </FormControl>
          <br />
          <div className={styles["form-button"]}>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => this.props.onCancel(e)}
            >
              Back
            </Button>
            <div className={styles.space}></div>
            <Button
              variant="contained"
              className={styles.green}
              disabled={btnAddDisabled}
              onClick={(e) => this.handleAddStakeholder()}
            >
              {update === true ? "Update Category" : "Add stakeholder"}
            </Button>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default NewStakeholder;
