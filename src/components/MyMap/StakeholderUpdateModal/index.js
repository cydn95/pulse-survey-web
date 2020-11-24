import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import SlideNavigator from "Components/SlideNavigator";
import { createMarkup } from "Util/Utils";

import { nikelTourContent, updateStakeholderCategory } from "Redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import dlgStyles from "./styles.scss";
import classnames from "classnames";

const styles = (theme) => ({
  root: {
    margin: 0,
    background: "#eee",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
    color: "rgb(42, 55, 71)",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, background, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
      style={{
        background: background,
      }}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={(e) => onClose(e)}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    height: "100%",
    padding: 0,
  },
}))(MuiDialogContent);

const StakeholderUpdateModal = ({
  open,
  onClose,
  currentUser,
  myMapCategory,
  projectMapCategory,
  projectId,
  surveyId,
  surveyUserId,
  actionUpdateStakeholderCategory,
}) => {
  const [selectedMyCategory, setSelectedMyCategory] = useState([]);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState([]);

  useEffect(() => {
    const myCategory = [];
    const projectCategory = [];

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

  const handleUpdateCategory = () => {
    const projectUser = {
      project: parseInt(projectId, 10),
      survey: parseInt(surveyId, 10),
      id: parseInt(currentUser.projectUserId, 10),
      user: parseInt(currentUser.userId.split("_")[1], 10),
      team: parseInt(currentUser.teamId.split("_")[1], 10),
      shMyCategory: selectedMyCategory,
      shProjectCategory: selectedProjectCategory,
      projectUserTitle: currentUser.projectUserTitle,
      shGroup: null,
      myProjectUser: surveyUserId,
    };

    actionUpdateStakeholderCategory(
      currentUser.projectUserId,
      projectUser,
      callbackUpdate
    );
  };

  const callbackUpdate = () => {
    console.log('callback');
    window.location.reload(false);
    // onClose();
  };

  return (
    <Dialog
      onClose={(e) => onClose(e)}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
      classes={{ paper: dlgStyles.root }}
    >
      <Fragment>
        <DialogTitle
          id="customized-dialog-title"
          background="#fff"
          onClose={(e) => onClose(e)}
        ></DialogTitle>
        <DialogContent>
          <div className={dlgStyles.content}>
            <div className={dlgStyles.description}>
              <h1>
                To add this stakeholder to your map, select from the options
                below:​
              </h1>
            </div>

            <div className={dlgStyles["sub-title"]}>
              <strong>My Map:{` `}How does this person relate to you?</strong>
            </div>
            <div className={dlgStyles.stakeholders}>
              {myMapCategory.map((map) => {
                const selected = selectedMyCategory.includes(map.id);

                return (
                  <div
                    role="button"
                    key={`my-map-category-${map.id}`}
                    className={classnames(dlgStyles.stakeholder, {
                      [dlgStyles.green]: selected,
                    })}
                    onClick={(e) => handleSelectMyCategory(map.id)}
                  >
                    <div className={dlgStyles["stakeholder-content"]}>
                      <img src={map.icon} alt={map.SHCategoryName} />
                      <span>{map.SHCategoryName}</span>
                    </div>

                    {selected && (
                      <div className={dlgStyles["stakeholder-mark"]}>
                        <div className={dlgStyles.circle}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={dlgStyles["sub-title"]}>
              <strong>
                Project Map:{` `}How does this person relate to the project?
              </strong>
            </div>
            <div className={dlgStyles.stakeholders}>
              {projectMapCategory.map((map) => {
                const selected = selectedProjectCategory.includes(map.id);
                return (
                  <div
                    role="button"
                    key={`my-map-category-${map.id}`}
                    className={classnames(dlgStyles.stakeholder, {
                      [dlgStyles.green]: selected,
                    })}
                    onClick={(e) => handleSelectProjectCategory(map.id)}
                  >
                    <div className={dlgStyles["stakeholder-content"]}>
                      <img src={map.icon} alt={map.SHCategoryName} />
                      <span>{map.SHCategoryName}</span>
                    </div>
                    {selected && (
                      <div className={dlgStyles["stakeholder-mark"]}>
                        <div className={dlgStyles.circle}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={dlgStyles.control}>
              <input
                type="button"
                value="Save"
                className={dlgStyles.next}
                onClick={(e) => handleUpdateCategory()}
              />
            </div>
          </div>
        </DialogContent>
      </Fragment>
    </Dialog>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectId, surveyId, surveyUserId } = authUser;
  return { projectId, surveyUserId, surveyId };
};

export default connect(mapStateToProps, {
  actionUpdateStakeholderCategory: updateStakeholderCategory,
})(StakeholderUpdateModal);
