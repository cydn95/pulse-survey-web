import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "Components/Button";

import Input from "./search";
import TabPanel from "Components/TabPanel";
import AvatarComponent from "../avatar/Component";
import { NewStakeholder } from "Components/Survey";

import { Draggable } from "react-drag-and-drop";

import { updateStakeholder } from "Redux/actions";

import styles from "./styles.scss";

const getSuggestions = (data, filter) => {
  return data.filter((d) => d.fullName.indexOf(filter) !== -1);
};

const getSuggestionsWithSh = (data, filter, shId) => {
  return data.filter(
    (d) => d.fullName.indexOf(filter) !== -1 && d.shCategory.indexOf(shId) >= 0
  );
};

function SearchBar(props) {
  const {
    decisionMakers,
    allStakeholders,
    searchKey,
    addNewStakeholder,
    onClickDecisionMaker,
    shCategoryList,
    projectMapShCategoryList,
    teamList,
    projectId,
    userId,
    updateStakeholder,
    onSearchFocus,
    onSearchBlur
  } = props;

  const defaultStakeholder = {
    projectUserId: "",
    projectId: projectId,
    userId: userId,
    fullName: "",
    teamId: "",
    team: "",
    organisationId: "",
    organisation: "",
    shCategory: "",
    show: true,
    firstName: "",
    lastName: "",
    email: ""
  };

  const [filter, setFilter] = useState(searchKey);
  const [shId, setShId] = useState(0);
  const [viewType, setViewType] = useState("search");
  const [selectedStakeholder, setSelectedStakeholder] = useState({
    ...defaultStakeholder,
  });

  useEffect(() => {
    setFilter(searchKey);
  }, [searchKey]);

  const handleUpdateStakeholder = (stakeholder) => {
    updateStakeholder(stakeholder);
    setViewType("search");
  };

  const handleArrowClick = (stakeholder) => {
    setViewType("category");
    setSelectedStakeholder(stakeholder);
  };

  return (
    <div className={styles.main}>
      {viewType === "search" && (
        <div>
          <div className={styles["input-wrapper"]}>
            <Input
              onFocus={(e) => onSearchFocus(e)}
              onBlur={(e) => onSearchBlur(e)}
              placeholder="Search"
              value={filter}
              onChange={setFilter}
              onCancel={() => setFilter("")}
            />
          </div>
          <div className={styles["suggestion-list"]}>
            <TabPanel
              selectedTab="decision"
              onSelectSH={(e, id) => setShId(id)}
              data={[
                {
                  title: "Decision Makers",
                  name: "decision",
                  type: "combo",
                  list: shCategoryList,
                  content: (
                    <div className={styles["tab-content"]}>
                      <span className={styles.cnt}>
                        {getSuggestionsWithSh(decisionMakers, filter, shId)
                          .length === 0
                          ? `No Users`
                          : getSuggestionsWithSh(decisionMakers, filter, shId)
                              .length + ` Users`}
                      </span>
                      {getSuggestionsWithSh(decisionMakers, filter, shId).map(
                        (d, index) => {
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
                              key={d.projectUserId}
                              className={styles["avatar-comp"]}
                              username={d.fullName}
                              userId={d.userId}
                              onClick={(userId) => onClickDecisionMaker(`${userId}_`)}
                              title={title}
                              description={description}
                              profilePicUrl={d.userAvatar}
                              userProgress={percentage}
                              donut={true}
                            />
                          );
                        }
                      )}
                    </div>
                  ),
                },
                {
                  title: "All Stakeholders",
                  name: "all-stakeholders",
                  type: "default",
                  content: (
                    <div className={styles["tab-content"]}>
                      <span className={styles.cnt}>
                        {getSuggestions(allStakeholders, filter).length === 0
                          ? `No Users`
                          : getSuggestions(allStakeholders, filter).length +
                            ` Users`}
                      </span>
                      {getSuggestions(allStakeholders, filter).map(
                        (d, index) => {
                          let title =
                            d.projectUserTitle === ""
                              ? d.userTitle
                              : d.projectUserTitle;
                          let description =
                            d.organisation +
                            " / " +
                            (d.team === "" ? d.userTeam : d.team);
                          return (
                            <Draggable
                              key={d.projectUserId}
                              type="stakeholder"
                              data={d.projectUserId}
                            >
                              <AvatarComponent
                                className={styles["avatar-comp"]}
                                key={d.username}
                                username={d.fullName}
                                title={title}
                                description={description}
                                profilePicUrl={d.userAvatar}
                                userProgress={(10 + index * 10) % 100}
                                arrow={true}
                                stakeholder={d}
                                onArrowClick={(e, stakeholder) =>
                                  handleArrowClick(stakeholder)
                                }
                                donut={false}
                              />
                            </Draggable>
                          );
                        }
                      )}
                    </div>
                  ),
                },
              ]}
            ></TabPanel>
          </div>
          <Button
            className={styles["add-stakeholder"]}
            onClick={addNewStakeholder}
          >
            Add New Stakeholder
          </Button>
        </div>
      )}
      {viewType === "category" && (
        <NewStakeholder
          shCategoryList={shCategoryList}
          projectMapShCategoryList={projectMapShCategoryList}
          teamList={teamList}
          onCancel={(e) => setViewType("search")}
          onAddStakeholder={(stakeholder) =>
            handleUpdateStakeholder(stakeholder)
          }
          update={true}
          stakeholder={selectedStakeholder}
        />
      )}
    </div>
  );
}

SearchBar.defaultProps = {
  searchKey: "",
  data: [],
};

SearchBar.propTypes = {
  searchKey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  addNewStakeholder: PropTypes.func.isRequired,
  shCategoryList: PropTypes.arrayOf(PropTypes.any),
  teamList: PropTypes.arrayOf(PropTypes.any),
  projectId: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = ({ common, authUser }) => {
  const { teamList, shCategoryList, projectMapShCategoryList } = common;
  const { projectId, user } = authUser;
  return {
    projectId,
    userId: user.userId,
    teamList,
    shCategoryList,
    projectMapShCategoryList,
  };
};

export default connect(mapStateToProps, { updateStakeholder })(SearchBar);
