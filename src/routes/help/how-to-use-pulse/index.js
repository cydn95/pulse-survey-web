import React from "react";
import { connect } from "react-redux";

import { Button } from "reactstrap";

import styles from "./styles.scss";
import classnames from "classnames";
import { ABOUT_ME, ABOUT_ME_DESC, ABOUT_OTHERS, ABOUT_OTHERS_DESC, HELP_HEADER, HELP_DESC } from "../../../constants/defaultValues";

import { updateGuideStatusSuccess } from "Redux/actions";

const HowToUsePulse = ({
  history,
  surveyUserId,
  actionUpdateGuideStatusSuccess,
}) => {
  const handleContinue = (e) => {
    if (
      surveyUserId == undefined ||
      surveyUserId == null ||
      surveyUserId <= 0
    ) {
      // history.push("/app/settings/projects");
      actionUpdateGuideStatusSuccess(false);
      actionUpdateGuideStatusSuccess(true);
      return;
    } else {
      history.push("/app/about-me");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles["welcome"]}>
        <div className={styles["welcome__content"]}>
          <h1 className={styles["welcome__content--title"]}>
            {HELP_HEADER}
          </h1>
          <p className={styles["welcome__content--description"]}>
            {HELP_DESC}
          </p>
          {/* <p className={styles["welcome__content--description"]}>
            The questions are divided into two parts:
          </p> */}
          <div className={styles["welcome__content__about"]}>
            <div className={styles["welcome__content__about__section"]}>
              <img
                className={styles["welcome__content__about__section--img"]}
                src="/assets/img/how-to-use-pulse-about-me.png"
                alt=""
              />
              <h2
                className={
                  styles["welcome__content__about__section--subtitle2"]
                }
              >
                {ABOUT_ME}
              </h2>
              <p
                className={
                  styles["welcome__content__about__section--description"]
                }
              >
                {ABOUT_ME_DESC}
              </p>
            </div>
            <div className={styles["welcome__content__about__section"]}>
              <img
                className={styles["welcome__content__about__section--img"]}
                src="/assets/img/how-to-use-pulse-about-others.png"
                alt=""
              />
              <h2
                className={
                  styles["welcome__content__about__section--subtitle2"]
                }
              >
                {ABOUT_OTHERS}
              </h2>
              <p
                className={
                  styles["welcome__content__about__section--description"]
                }
              >
                {ABOUT_OTHERS_DESC}
              </p>
              <Button
                className={classnames(
                  styles["welcome__content__about__section--continue"],
                  styles["edge-btn"],
                  styles.green
                )}
                onClick={(e) => handleContinue(e)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { surveyUserId } = authUser;

  return {
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionUpdateGuideStatusSuccess: updateGuideStatusSuccess,
})(HowToUsePulse);
