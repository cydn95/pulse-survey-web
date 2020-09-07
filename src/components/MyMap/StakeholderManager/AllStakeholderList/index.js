import React, { Component } from "react";

import { Draggable } from "react-drag-and-drop";

import AvatarComponent from "Components/avatar/Component";
import { NewStakeholder } from "Components/Survey";

import styles from "./styles.scss";

class AllStakeholderList extends Component {
  constructor(props) {
    super(props);

    this.defaultStakeholder = {
      projectUserId: this.props.surveyUserId,
      projectId: this.props.projectId,
      userId: this.props.userId,
      fullName: "",
      teamId: "",
      team: "",
      organisationId: "",
      organisation: "",
      shCategory: "",
      show: true,
      firstName: "",
      lastName: "",
      email: "",
      myProjectUser: this.props.surveyUserId,
    };
    this.state = {
      shId: 0,
      viewType: "search",
      selectedStakeholder: {
        ...this.defaultStakeholder,
      },
    };
  }

  handleArrowClick = (stakeholder) => {
    this.setState({
      viewType: "category",
      selectedStakeholder: stakeholder,
    });
  };

  handleUpdateStakeholder = (stakeholder) => {
    const { projectId, surveyId, onUpdateStakeholder } = this.props;
    onUpdateStakeholder(projectId, surveyId, stakeholder);
    this.setState({
      viewType: "search",
    });
  };

  render() {
    const {
      allStakeholders,
      surveyUserId,
      projectId,
      shCategoryList,
      projectMapShCategoryList,
      selectedMyCategoryList,
      selectedProjectCategoryList,
      teamList,
    } = this.props;

    let filteredStakeholderList = [];
    if (
      selectedMyCategoryList.length > 0 ||
      selectedProjectCategoryList.length > 0
    ) {
      for (let i = 0; i < allStakeholders.length; i++) {
        const i1 = allStakeholders[i].shCategory.filter((value) =>
          selectedMyCategoryList.includes(value)
        );
        const i2 = allStakeholders[i].shCategory.filter((value) =>
          selectedProjectCategoryList.includes(value)
        );
        if (
          (i1.length > 0 || i2.length > 0) &&
          allStakeholders[i].projectId.toString() === projectId.toString()
        ) {
          filteredStakeholderList.push(allStakeholders[i]);
        }
      }
    } else {
      filteredStakeholderList = [...allStakeholders];
    }

    const { viewType, selectedStakeholder } = this.state;
    let userCount = allStakeholders.length;

    return (
      <div className={styles.root}>
        {userCount === 0 && (
          <div className={styles["empty"]}>
            <img src="/assets/img/survey/stakeholder-search.svg" alt="search" />
            <span>
              <strong>No Stakeholders.</strong>
            </span>
            <span>Click “Add Stakeholders” to add your first one!</span>
          </div>
        )}
        {userCount > 0 && viewType === "search" && (
          <div className={styles["stakeholder-list"]}>
            <div className={styles["shcategory"]}>
              {filteredStakeholderList.map((d) => {
                let title =
                  d.projectUserTitle === "" ? d.userTitle : d.projectUserTitle;
                let description =
                  d.organisation +
                  " / " +
                  (d.team === "" ? d.userTeam : d.team);
                let percentage = (d.aoAnswered / d.aoTotal) * 100;
                return (
                  <div className={styles.stakeholder} key={d.projectUserId}>
                    <Draggable type="stakeholder" data={d.projectUserId}>
                      <AvatarComponent
                        className={styles["avatar-comp"]}
                        key={d.username}
                        username={d.fullName}
                        title={title}
                        description={description}
                        profilePicUrl={d.userAvatar}
                        userProgress={percentage}
                        arrow={true}
                        stakeholder={{
                          ...d,
                          myProjectUser: surveyUserId,
                        }}
                        onArrowClick={(e, stakeholder) =>
                          this.handleArrowClick(stakeholder)
                        }
                        donut={false}
                      />
                    </Draggable>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {viewType === "category" && (
          <NewStakeholder
            shCategoryList={shCategoryList}
            projectMapShCategoryList={projectMapShCategoryList}
            teamList={teamList}
            onCancel={(e) =>
              this.setState({
                viewType: "search",
              })
            }
            onAddStakeholder={(stakeholder) =>
              this.handleUpdateStakeholder({
                ...stakeholder,
                myProjectUser: surveyUserId,
              })
            }
            update={true}
            stakeholder={selectedStakeholder}
          />
        )}
      </div>
    );
  }
}

export default AllStakeholderList;