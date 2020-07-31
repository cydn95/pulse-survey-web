import React from "react";
import { connect } from "react-redux";

import { Button } from "reactstrap";

import styles from "./styles.scss";
import classnames from "classnames";

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
            So much more than a survey.
          </h1>
          <p className={styles["welcome__content--description"]}>
            This platform has been taught many of the important concepts​
            involved in this project. This questionnaire is not designed to
            point fingers or find people to blame - but only to improve how we
            communicate and collaborate. ​Your responses will be anonymised and
            combined with others to guide managers on new focus areas to improve
            team/stakeholder engagement and project performance.​
          </p>
          <p className={styles["welcome__content--description"]}>
            The questions are divided into two parts:
          </p>
          <div className={styles["welcome__content__about"]}>
            <div className={styles["welcome__content__about__section"]}>
              <h2
                className={
                  styles["welcome__content__about__section--subtitle2"]
                }
              >
                About Me
              </h2>
              <p
                className={
                  styles["welcome__content__about__section--description"]
                }
              >
                What you think / feel about the project.​
              </p>
              <img
                className={styles["welcome__content__about__section--img"]}
                src="/assets/img/email/main-1.png"
                alt=""
              />
            </div>
            <div className={styles["welcome__content__about__section"]}>
              <h2
                className={
                  styles["welcome__content__about__section--subtitle2"]
                }
              >
                About Others
              </h2>
              <p
                className={
                  styles["welcome__content__about__section--description"]
                }
              >
                What you assume other people are thinking​ or feeling about the
                project.​​
              </p>
              <img
                className={styles["welcome__content__about__section--img"]}
                src="/assets/img/email/main-2.png"
                alt=""
              />
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
