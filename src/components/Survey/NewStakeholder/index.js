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
import classnames from "classnames";

class NewStakeholder extends Component {
  constructor(props) {
    super(props);

    if (props.update) {
      const myCategoryList = [];
      const projectCategoryList = [];

      props.shCategoryList.forEach((item) => {
        if (props.stakeholder.shCategory.indexOf(item.id) >= 0) {
          myCategoryList.push(item.id);
        }
      });

      props.projectMapShCategoryList.forEach((item) => {
        if (props.stakeholder.shCategory.indexOf(item.id) >= 0) {
          projectCategoryList.push(item.id);
        }
      });

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
          myCategoryList: myCategoryList,
          projectCategoryList: projectCategoryList,
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

        if (
          stakeholder.myCategoryList.length === 0 &&
          stakeholder.projectCategoryList.length === 0
        ) {
          NotificationManager.error(
            "Select at least one category",
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

  handleSelectMyCategory = (categoryId) => {
    const myCategoryList = [...this.state.stakeholder.myCategoryList];
    if (myCategoryList.indexOf(categoryId) >= 0) {
      myCategoryList.splice(myCategoryList.indexOf(categoryId), 1);
    } else {
      myCategoryList.push(categoryId);
    }

    this.setState({
      stakeholder: {
        ...this.state.stakeholder,
        myCategoryList,
      },
    });
  };

  handleSelectProjectCategory = (categoryId) => {
    const projectCategoryList = [...this.state.stakeholder.projectCategoryList];
    if (projectCategoryList.indexOf(categoryId) >= 0) {
      projectCategoryList.splice(projectCategoryList.indexOf(categoryId), 1);
    } else {
      projectCategoryList.push(categoryId);
    }

    this.setState({
      stakeholder: {
        ...this.state.stakeholder,
        projectCategoryList,
      },
    });
  };

  render() {
    const { shCategoryList, projectMapShCategoryList, teamList } = this.props;
    const update = this.props.update ? this.props.update : false;
    const { btnAddDisabled, stakeholder } = this.state;
    const { myCategoryList, projectCategoryList } = stakeholder;

    return (
      <div className={styles.root}>
        <div>
          <h1 className={styles.title}>{`${update ? 'Update' : 'Add '}`} StakeHolder</h1>
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
          <div className={styles["category-wrapper"]}>
            <div className={styles["category-type"]}>
              <strong>My Map: </strong>How does this person relate to you?
            </div>
            <div className={styles["category-section"]}>
              {shCategoryList.map((category) => {
                const gray =
                  myCategoryList.indexOf(category.id) >= 0 ? true : false;
                return (
                  <div
                    className={styles.category}
                    key={`category_${category.id}`}
                  >
                    <img
                      src={category.icon}
                      alt=""
                      className={classnames({ [styles.gray]: !gray })}
                      onClick={(e) => this.handleSelectMyCategory(category.id)}
                    />
                    <span>{category.SHCategoryName}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles["category-wrapper"]}>
            <div className={styles["category-type"]}>
              <strong>Project Map: </strong>How does this person relate to the
              project?
            </div>
            <div className={styles["category-section"]}>
              {projectMapShCategoryList.map((category) => {
                const gray =
                  projectCategoryList.indexOf(category.id) >= 0 ? true : false;
                return (
                  <div
                    className={styles.category}
                    key={`category_${category.id}`}
                  >
                    <img
                      src={category.icon}
                      alt=""
                      className={classnames({ [styles.gray]: !gray })}
                      onClick={(e) =>
                        this.handleSelectProjectCategory(category.id)
                      }
                    />
                    <span>{category.SHCategoryName}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <FormControl className={styles["input-field"]}>
            <div className={styles.label}>
              {`How would you describe this person’s role on the project?​`}
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
