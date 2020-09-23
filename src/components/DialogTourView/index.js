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

import { nikelTourContent } from "Redux/actions";

import dlgStyles from "./styles.scss";

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
    color: "white",
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

const DialogTourView = ({
  open,
  onClose,
  nikelContent,
  actionNikelTourContent,
}) => {
  const [step, setStep] = useState(0);
  const [tour, setTour] = useState(null);

  useEffect(() => {
    setTour(nikelContent.length === 0 ? null : nikelContent[step]);
  }, [step]);

  useEffect(() => {
    actionNikelTourContent();
  }, [actionNikelTourContent]);

  useEffect(() => {
    setTour(nikelContent[step]);
  }, [nikelContent]);

  useEffect(() => {
    setStep(0);
  }, [open]);

  const containerBackgroundStyle = () => {
    return {
      background: `${tour.background}`,
    };
  };

  const imgBackgroundStyle = () => {
    return {
      background: `${tour.background} url('${tour.img}') center/contain no-repeat`,
    };
  };

  const onSelect = (position) => {
    setStep(position);
  };

  const onNext = () => {
    if (step === nikelContent.length - 1) {
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
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
      {tour && (
        <Fragment>
          <DialogTitle
            id="customized-dialog-title"
            background={tour.background}
            onClose={(e) => onClose(e)}
          ></DialogTitle>
          <DialogContent>
            <div className={dlgStyles.content}>
              <div
                className={dlgStyles["bg-section"]}
                style={containerBackgroundStyle()}
              >
                <div
                  className={dlgStyles.img}
                  style={imgBackgroundStyle()}
                ></div>
              </div>
              <div className={dlgStyles.description}>
                <h1>{tour.title}</h1>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={createMarkup(tour.content)}
                />
              </div>
              <div className={dlgStyles.control}>
                <input
                  type="button"
                  value="Back"
                  className={dlgStyles.back}
                  onClick={(e) => onBack()}
                />
                <input
                  type="button"
                  value="Next"
                  className={dlgStyles.next}
                  onClick={(e) => onNext()}
                />
              </div>
              <div className={dlgStyles.navigator}>
                <SlideNavigator
                  onSelect={(position) => onSelect(position)}
                  cnt={nikelContent.length}
                  position={step}
                />
              </div>
            </div>
          </DialogContent>
        </Fragment>
      )}
    </Dialog>
  );
};

const mapStateToProps = ({ tour }) => {
  const { nikelContent } = tour;
  return { nikelContent };
};

export default connect(mapStateToProps, {
  actionNikelTourContent: nikelTourContent,
})(DialogTourView);
