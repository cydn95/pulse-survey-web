import React, { Component } from "react";

import AvatarComponent from "Components/avatar/Component";

import styles from "./styles.scss";

class MapStakeholderList extends Component {
  render() {
    const {
      myMapStakeholderList,
      projectMapStakeholderList,
      shCategoryList,
      projectMapShCategoryList,
      selectedMyCategoryList,
      selectedProjectCategoryList,
      onMapStakeholderClick,
      onShowSearchStakeholder
    } = this.props;

    let userCount = 0;

    let groupedMyStakeholderList = {};
    for (let i = 0; i < shCategoryList.length; i++) {
      for (let j = 0; j < myMapStakeholderList.length; j++) {
        let bAdd = false;
        if (
          myMapStakeholderList[j].shCategory.includes(shCategoryList[i].id) &&
          selectedMyCategoryList.includes(shCategoryList[i].id) &&
          shCategoryList.length > 0
        ) {
          bAdd = true;
        }

        if (shCategoryList.length === 0) {
          bAdd = true;
        }

        if (bAdd) {
          if (`sh_${shCategoryList[i].id}` in groupedMyStakeholderList) {
            groupedMyStakeholderList[
              `sh_${shCategoryList[i].id}`
            ].stakeholders.push(myMapStakeholderList[j]);
          } else {
            userCount++;
            const obj = {
              [`sh_${shCategoryList[i].id}`]: {
                id: shCategoryList[i].id,
                name: shCategoryList[i].SHCategoryName,
                stakeholders: [myMapStakeholderList[j]],
              },
            };
            groupedMyStakeholderList = {
              ...groupedMyStakeholderList,
              ...obj,
            };
          }
        }
      }
    }

    let groupedProjectStakeholderList = {};
    for (let i = 0; i < projectMapShCategoryList.length; i++) {
      for (let j = 0; j < projectMapStakeholderList.length; j++) {
        let bAdd = false;
        if (
          projectMapStakeholderList[j].shCategory.includes(
            projectMapShCategoryList[i].id
          ) &&
          selectedProjectCategoryList.includes(projectMapShCategoryList[i].id) &&
          projectMapShCategoryList.length > 0
        ) {
          bAdd = true;
        }

        if (projectMapShCategoryList.length === 0) {
          bAdd = false;
        }

        if (bAdd) {
          if (
            `sh_${projectMapShCategoryList[i].id}` in
            groupedProjectStakeholderList
          ) {
            groupedProjectStakeholderList[
              `sh_${projectMapShCategoryList[i].id}`
            ].stakeholders.push(projectMapStakeholderList[j]);
          } else {
            userCount++;
            const obj = {
              [`sh_${projectMapShCategoryList[i].id}`]: {
                id: projectMapShCategoryList[i].id,
                name: projectMapShCategoryList[i].SHCategoryName,
                stakeholders: [projectMapStakeholderList[j]],
              },
            };
            groupedProjectStakeholderList = {
              ...groupedProjectStakeholderList,
              ...obj,
            };
          }
        }
      }
    }

    return (
      <div className={styles.root}>
        {userCount === 0 && (
          <div className={styles["empty"]}>
            <img src="/assets/img/survey/stakeholder-search.svg" alt="search" />
            <span>
              <strong>No Stakeholders Selected.</strong>
            </span>
            <span>Click “<strong onClick={e => onShowSearchStakeholder()} style={{cursor: 'pointer'}}>Search Stakeholders</strong>” to add your first one!</span>
          </div>
        )}
        {userCount > 0 && (
          <div className={styles["stakeholder-list"]}>
            {Object.keys(groupedMyStakeholderList).map((key) => {
              const groupSh = groupedMyStakeholderList[key];
              return (
                <div className={styles["shcategory"]} key={`my_${key}`}>
                  <div className={styles["my-map"]}>
                    <span className={styles["map-type"]}>{`MY MAP: `}</span>
                    <span
                      className={styles["map-name"]}
                    >{`${groupSh.name.toUpperCase()}`}</span>
                  </div>
                  {groupSh.stakeholders.map((d) => {
                    let title =
                      d.projectUserTitle === ""
                        ? d.userTitle
                        : d.projectUserTitle;
                    let description =
                      d.organisation +
                      " / " +
                      (d.team === "" ? d.userTeam : d.team);
                    let percentage = (d.aoAnswered / d.aoTotal) * 100;
                    return (
                      <AvatarComponent
                        key={`my_${key}_${d.projectUserId}`}
                        className={styles["stakeholder"]}
                        username={d.fullName}
                        userId={d.userId}
                        onClick={(userId) =>
                          onMapStakeholderClick(`${userId}_SHC_${groupSh.id}`)
                        }
                        title={title}
                        description={description}
                        profilePicUrl={d.userAvatar}
                        userProgress={percentage ? Number(percentage) : 0}
                        donut={true}
                      />
                    );
                  })}
                </div>
              );
            })}
            {Object.keys(groupedProjectStakeholderList).map((key) => {
              const groupSh = groupedProjectStakeholderList[key];
              return (
                <div className={styles["shcategory"]} key={`project_${key}`}>
                  <div className={styles["project-map"]}>
                    <span className={styles["map-type"]}>{`PROJECT MAP: `}</span>
                    <span
                      className={styles["map-name"]}
                    >{`${groupSh.name.toUpperCase()}`}</span>
                  </div>
                  {groupSh.stakeholders.map((d) => {
                    let title =
                      d.projectUserTitle === ""
                        ? d.userTitle
                        : d.projectUserTitle;
                    let description =
                      d.organisation +
                      " / " +
                      (d.team === "" ? d.userTeam : d.team);
                    let percentage = (d.aoAnswered / d.aoTotal) * 100;

                    return (
                      <AvatarComponent
                        key={`my_${key}_${d.projectUserId}`}
                        className={styles["stakeholder"]}
                        username={d.fullName}
                        userId={d.userId}
                        onClick={(userId) =>
                          onMapStakeholderClick(`${userId}_SHC_${groupSh.id}`)
                        }
                        title={title}
                        description={description}
                        profilePicUrl={d.userAvatar}
                        userProgress={percentage ? Number(percentage) : 0}
                        donut={true}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default MapStakeholderList;
