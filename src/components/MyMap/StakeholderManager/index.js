import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import MapStakeholderList from "./MapStakholderList";
import { updateStakeholder } from "Redux/actions";

import classnames from "classnames";
import styles from "./styles.scss";

class StakeholderManager extends Component {
  constructor(props) {
    super(props);

    const myCategoryList = [];
    const projectCategoryList = [];

    const { shCategoryList, projectMapShCategoryList } = this.props;
    shCategoryList.forEach((item) => {
      myCategoryList.push(item.id);
    });

    projectMapShCategoryList.forEach((item) => {
      projectCategoryList.push(item.id);
    });

    this.state = {
      view: "manage",
      filterView: false,
      myCategoryList: myCategoryList,
      projectCategoryList: projectCategoryList,
    };
  }

  handleToggleFilterView = (e) => {
    this.setState({
      filterView: !this.state.filterView,
    });
  };

  handleSelectMyCategory = (categoryId) => {
    const myCategoryList = [...this.state.myCategoryList];
    if (myCategoryList.indexOf(categoryId) >= 0) {
      myCategoryList.splice(myCategoryList.indexOf(categoryId), 1);
    } else {
      myCategoryList.push(categoryId);
    }

    this.setState({
      myCategoryList,
    });
  };

  handleSelectProjectCategory = (categoryId) => {
    const projectCategoryList = [...this.state.projectCategoryList];
    if (projectCategoryList.indexOf(categoryId) >= 0) {
      projectCategoryList.splice(projectCategoryList.indexOf(categoryId), 1);
    } else {
      projectCategoryList.push(categoryId);
    }

    this.setState({
      projectCategoryList,
    });
  };

  render() {
    const {
      projectTitle,
      myMapStakeholderList,
      projectMapStakeholderList,
      shCategoryList,
      projectMapShCategoryList,
      onClickDecisionMaker,
    } = this.props;

    const {
      view,
      filterView,
      myCategoryList,
      projectCategoryList,
    } = this.state;

    const userCount =
      myMapStakeholderList.length + projectMapStakeholderList.length;

    return (
      <div className={styles.root}>
        <div className={styles["project-title"]}>
          <span>{projectTitle}</span>
        </div>
        <div className={styles["nav"]}>
          <div className={styles["nav-title"]}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>{view === "manage" && `Manage Stakeholders`}</span>
          </div>
          <div className={styles["nav-controls"]}>
            <div className={styles["nav-buttons"]}>
              <div
                className={styles["nav-icons-wrapper"]}
                role="button"
                onClick={(e) => this.handleToggleFilterView()}
              >
                <img
                  className={styles["nav-icons"]}
                  src="/assets/img/survey/filter.svg"
                  alt="filter"
                />
                <span>Filter</span>
              </div>
              {/* <div className={styles["nav-icons-wrapper"]}>
                <img
                  className={styles["nav-icons"]}
                  src="/assets/img/survey/mapview.svg"
                  alt="filter"
                />
                <span>Map View</span>
              </div> */}
            </div>
            <div className={styles["user-count"]}>
              {`${userCount} stakeholders`}
            </div>
          </div>
        </div>
        <div className={styles["scroll-section"]}>
          {filterView && (
            <div className={styles["filter-controls"]}>
              <div className={styles["category-wrapper"]}>
                <div className={styles["category-type"]}>
                  <strong>My Map: </strong>
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
                          onClick={(e) =>
                            this.handleSelectMyCategory(category.id)
                          }
                        />
                        <span>{category.SHCategoryName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className={styles["category-wrapper"]}>
                <div className={styles["category-type"]}>
                  <strong>Project Map: </strong>
                </div>
                <div className={styles["category-section"]}>
                  {projectMapShCategoryList.map((category) => {
                    const gray =
                      projectCategoryList.indexOf(category.id) >= 0
                        ? true
                        : false;
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
            </div>
          )}
          <div className={styles.content}>
            {view === "manage" && (
              <MapStakeholderList
                myMapStakeholderList={myMapStakeholderList}
                projectMapStakeholderList={projectMapStakeholderList}
                shCategoryList={shCategoryList}
                projectMapShCategoryList={projectMapShCategoryList}
                selectedMyCategoryList={myCategoryList}
                selectedProjectCategoryList={projectCategoryList}
                onMapStakeholderClick={(userId) =>
                  onClickDecisionMaker(`${userId}_`)
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common, authUser }) => {
  const { teamList, shCategoryList, projectMapShCategoryList } = common;
  const { projectId, user, surveyId, surveyUserId } = authUser;
  return {
    projectId,
    surveyId,
    userId: user.userId,
    surveyUserId,
    teamList,
    shCategoryList,
    projectMapShCategoryList,
  };
};

export default connect(mapStateToProps, { updateStakeholder })(
  StakeholderManager
);
