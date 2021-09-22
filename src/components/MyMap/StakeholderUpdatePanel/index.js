import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  updateStakeholderCategory,
  stakeholderList,
  kMapData,
  projectMapData,
} from "Redux/actions";

import dlgStyles from "./styles.scss";

const StakeholderUpdatePanel = ({
  open,
  onClose,
  currentUser,
  myMapCategory,
  projectMapCategory,
  projectId,
  surveyId,
  surveyUserId,
  actionUpdateStakeholderCategory,
  actionStakeholderList,
  actionKMapData,
  actionProjectMapData,
  userId,
  shCategoryChanged,
}) => {
  const [selectedMyCategory, setSelectedMyCategory] = useState([]);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState([]);

  useEffect(() => {
    const myCategory = [];
    const projectCategory = [];
    // console.log('myMapCategory', myMapCategory)
    // console.log('currentUser', currentUser)
    for (let i = 0; i < myMapCategory.length; i++) {
      const id = myMapCategory[i].id;

      if (currentUser.shCategory.includes(id)) {
        myCategory.push(id);
      }
    }

    for (let i = 0; i < projectMapCategory.length; i++) {
      const id = projectMapCategory[i].id;

      if (currentUser.shCategory.includes(id)) {
        projectCategory.push(id);
      }
    }

    setSelectedMyCategory(myCategory);
    setSelectedProjectCategory(projectCategory);
  }, [currentUser, myMapCategory, projectMapCategory]);

  const handleSelectMyCategory = (id) => {
    const index = selectedMyCategory.findIndex((elem) => elem === id);

    const category = [...selectedMyCategory];
    if (index === -1) {
      category.push(id);
      setSelectedMyCategory(category);
    } else {
      category.splice(index, 1);
      setSelectedMyCategory(category);
    }
  };

  const handleSelectProjectCategory = (id) => {
    const index = selectedProjectCategory.findIndex((elem) => elem === id);

    const category = [...selectedProjectCategory];
    if (index === -1) {
      category.push(id);
      setSelectedProjectCategory(category);
    } else {
      category.splice(index, 1);
      setSelectedProjectCategory(category);
    }
  };

  // useEffect(() => {
  //   console.log("loading");
  //   actionStakeholderList(surveyUserId, surveyId);
  // }, [surveyId, surveyUserId]);

  useEffect(() => {
    const projectUser = {
      project: parseInt(projectId, 10),
      survey: parseInt(surveyId, 10),
      id: parseInt(currentUser.projectUserId, 10),
      user: parseInt(currentUser.userId.split("_")[1], 10),
      team: parseInt(currentUser.teamId.split("_")[1], 10),
      shMyCategory: selectedMyCategory,
      shProjectCategory: selectedProjectCategory,
      projectUserTitle: currentUser.projectUserTitle,
      // shGroup: null,
      myProjectUser: surveyUserId,
    };

    actionUpdateStakeholderCategory(
      currentUser.projectUserId,
      projectUser,
      callbackUpdate
    );
  }, [
    selectedMyCategory,
    selectedProjectCategory,
    projectId,
    surveyId,
    currentUser,
  ]);
  // const handleUpdateCategory = () => {

  // };

  const callbackUpdate = () => {
    shCategoryChanged()
    // console.log("callback");
    // actionStakeholderList(surveyUserId, surveyId);
    // window.location.reload(false);
    // onClose();
    // console.log(isStart);
    // if (isStart) {
    //   setIsStart(false);
    //   return;
    // }
    // actionKMapData(surveyUserId, userId);
    // actionProjectMapData(surveyUserId, userId);
    // actionStakeholderList(surveyUserId, surveyId);
  };

  return (
    <div className={dlgStyles.content}>
      <div className={dlgStyles["sub-title"]}>My Map:</div>
      <div className={dlgStyles.stakeholders}>
        {myMapCategory.map((map) => {
          const selected = selectedMyCategory.includes(map.id);
          return (
            <FormControlLabel
              key={`my-map-category-${map.id}`}
              control={
                <Checkbox
                  style={{ color: "#fff" }}
                  color="primary"
                  checked={selected}
                  name="checkedA"
                  onClick={(e) => handleSelectMyCategory(map.id)}
                />
              }
              label={map.SHCategoryName}
            />
          );
        })}
      </div>
      <div className={dlgStyles["sub-title"]}>Project Map:</div>
      <div className={dlgStyles.stakeholders}>
        {projectMapCategory.map((map) => {
          const selected = selectedProjectCategory.includes(map.id);
          return (
            <FormControlLabel
              key={`project-map-category-${map.id}`}
              control={
                <Checkbox
                  style={{ color: "#fff" }}
                  checked={selected}
                  name="checkedA"
                  onClick={(e) => handleSelectProjectCategory(map.id)}
                />
              }
              label={map.SHCategoryName}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectId, surveyId, surveyUserId, user } = authUser;
  return { projectId, surveyUserId, surveyId, userId: user.userId };
};

export default connect(mapStateToProps, {
  actionUpdateStakeholderCategory: updateStakeholderCategory,
  actionStakeholderList: stakeholderList,
  actionKMapData: kMapData,
  actionProjectMapData: projectMapData,
})(StakeholderUpdatePanel);
