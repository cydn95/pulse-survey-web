import React, { useState, useEffect, useMemo, Fragment } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "Components/Button";
import Input from "Components/Input";
import MapStakeholderList from "./MapStakholderList";
import AllStakeholderList from "./AllStakeholderList";
import { updateStakeholder } from "Redux/actions";

import classnames from "classnames";
import styles from "./styles.scss";

const StakeholderManager = ({
  surveyUserId,
  surveyId,
  projectId,
  userId,
  projectTitle,
  myMapStakeholderList,
  projectMapStakeholderList,
  shCategoryList,
  projectMapShCategoryList,
  allStakeholders,
  teamList,
  onClickDecisionMaker,
  addNewStakeholder,
  updateStakeholder,
  myMapES,
  projectMapES,
  handleUpdateStakeholder,
}) => {
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [projectCategoryList, setProjectCategoryList] = useState([]);
  const [view, setView] = useState("manage");
  const [filterView, setFilterView] = useState(false);
  const [search, setSearch] = useState('');
  const [subView, setSubView] = useState('search');

  useEffect(() => {
    const tempMyCategoryList = [];
    const tempProjectCategoryList = [];

    shCategoryList.forEach((item) => {
      tempMyCategoryList.push(item.id);
    });

    projectMapShCategoryList.forEach((item) => {
      tempProjectCategoryList.push(item.id);
    });

    setMyCategoryList([...tempMyCategoryList]);
    setProjectCategoryList([...tempProjectCategoryList]);
  }, [shCategoryList, projectMapShCategoryList]);

  const handleToggleFilterView = (e) => {
    setFilterView(!filterView);
  };

  const handleSelectMyCategory = (categoryId) => {
    const tempCategoryList = [...myCategoryList];
    if (tempCategoryList.indexOf(categoryId) >= 0) {
      tempCategoryList.splice(tempCategoryList.indexOf(categoryId), 1);
    } else {
      tempCategoryList.push(categoryId);
    }

    setMyCategoryList([...tempCategoryList]);
  };

  const handleSelectProjectCategory = (categoryId) => {
    const tempCategoryList = [...projectCategoryList];
    if (tempCategoryList.indexOf(categoryId) >= 0) {
      tempCategoryList.splice(tempCategoryList.indexOf(categoryId), 1);
    } else {
      tempCategoryList.push(categoryId);
    }

    setProjectCategoryList([...tempCategoryList]);
  };

  const handleSearchView = () => {
    setView("search");
  };

  const handleMapView = () => {
    setView("manage");
  };

  const handleChangeSearchKeyword = (e) => {
    setSearch(e.target.value);
  }

  const userCount = useMemo(
    () => {
      const shCount = [];
      // console.log(myMapStakeholderList);
      // console.log(projectMapStakeholderList);
      for (let i = 0; i < myMapStakeholderList.length; i++) {
        // for (let j = 0; j < myMapStakeholderList[i].shCategory.length; j++) {
        //   const shCategoryId = myMapStakeholderList[i].shCategory[j];
        //   if ((!shCount.includes(shCategoryId)) && myCategoryList.includes(shCategoryId)) {
        //     shCount.push(shCategoryId);
        //   }
        // }
        if (!(shCount.includes(myMapStakeholderList[i].userId)) && myMapStakeholderList[i].shCategory.length !== 0) {
          shCount.push(myMapStakeholderList[i].userId)
        }
      }

      for (let i = 0; i < projectMapStakeholderList.length; i++) {
        // for (let j = 0; j < projectMapStakeholderList[i].shCategory.length; j++) {
        //   const shCategoryId = projectMapStakeholderList[i].shCategory[j];
        //   if ((!shCount.includes(shCategoryId)) && projectCategoryList.includes(shCategoryId)) {
        //     shCount.push(shCategoryId);
        //   }
        // }
        if (!(shCount.includes(projectMapStakeholderList[i].userId)) && projectMapStakeholderList[i].shCategory.length !== 0) {
          shCount.push(projectMapStakeholderList[i].userId)
        }
      }

      console.log('myMapStakeholderList', myMapStakeholderList)
      console.log('projectMapStakeholderList', projectMapStakeholderList)

      // return myMapStakeholderList.length + projectMapStakeholderList.length
      return shCount.length;
    },
    [myMapStakeholderList, projectMapStakeholderList/*, myCategoryList, projectCategoryList*/]
  );

  return (
    <div className={styles.root}>
      <div className={styles["project-title"]}>
        <span>{projectTitle}</span>
      </div>
      <div className={styles["nav"]}>
        <div className={styles["nav-title"]}>
          {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
          <span>
            {view === "manage" && `My Stakeholders`}
            {view === "search" && `Search Stakeholders`}
          </span>
        </div>
        <div className={styles["nav-controls"]}>
          <div className={styles["nav-buttons"]}>
            <div
              className={styles["nav-icons-wrapper"]}
              role="button"
              onClick={(e) => handleToggleFilterView()}
            >
              <img
                className={styles["nav-icons"]}
                src="/assets/img/survey/filter.svg"
                alt="filter"
              />
              <span>Filter</span>
            </div>
            {view === "manage" && (
              <div
                className={styles["nav-icons-wrapper"]}
                role="button"
                onClick={(e) => handleSearchView()}
              >
                <img
                  className={styles["nav-icons"]}
                  src="/assets/img/survey/search.svg"
                  alt="filter"
                />
                <span>Search</span>
              </div>
            )}
            {view === "search" && (
              <div
                className={styles["nav-icons-wrapper"]}
                role="button"
                onClick={(e) => handleMapView()}
              >
                <img
                  className={styles["nav-icons"]}
                  src="/assets/img/survey/mapview.svg"
                  alt="filter"
                />
                <span>My Stakeholders</span>
              </div>
            )}
          </div>
          <div className={styles["user-count"]}>
            {`${userCount} stakeholders`}
          </div>
        </div>

        {view === "search" && subView === "search" && (
          <Fragment>
            <Button
              className={styles["add-stakeholder"]}
              onClick={(e) => addNewStakeholder(e)}
            >
              <strong>+</strong>
              {` Add Stakeholder`}
            </Button>
            <input
              className={styles["search-input"]}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleChangeSearchKeyword(e)}
            />
          </Fragment>
        )}
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
                        onClick={(e) => handleSelectMyCategory(category.id)}
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
                          handleSelectProjectCategory(category.id)
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
              myMapES={myMapES}
              projectMapES={projectMapES}
              shCategoryList={shCategoryList}
              projectMapShCategoryList={projectMapShCategoryList}
              selectedMyCategoryList={myCategoryList}
              selectedProjectCategoryList={projectCategoryList}
              onMapStakeholderClick={(userId) =>
                onClickDecisionMaker(`${userId}_`)
              }
              onShowSearchStakeholder={handleSearchView}
            />
          )}
          {view === "search" && (
            <AllStakeholderList
              allStakeholders={allStakeholders}
              surveyUserId={surveyUserId}
              projectId={projectId}
              surveyId={surveyId}
              userId={userId}
              shCategoryList={shCategoryList}
              projectMapShCategoryList={projectMapShCategoryList}
              selectedMyCategoryList={myCategoryList}
              selectedProjectCategoryList={projectCategoryList}
              teamList={teamList}
              search={search}
              onUpdateStakeholder={(projectId, surveyId, stakeholder) =>
                updateStakeholder(projectId, surveyId, stakeholder, () => {
                  setView('manage')
                })
              }
              onUpdateSubView={(subView) => setSubView(subView)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

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
