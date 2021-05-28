import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import MobileTourView from "Components/MobileTourView";

import { nikelTourContent } from "Redux/actions";

import styles from "./styles.scss";

const MobileTour = ({ history, projectTitle, nikelContent, actionNikelTourContent, surveyId }) => {
  const [step, setStep] = useState(0);
  const [content, setContent] = useState(null);

  useEffect(() => {

    if (surveyId !== null && surveyId > 0) {
      actionNikelTourContent(surveyId);
    }
  }, [actionNikelTourContent, surveyId]);

  useEffect(() => {
    const content = nikelContent.length === 0 ? null : { ...nikelContent[step] }
    if (content) {
      content.title = content.title.replace(/{{PROJECT}}/i, projectTitle);
      content.content = content.content.replace(/{{PROJECT}}/i, projectTitle)
    }
    setContent(content);
  }, [nikelContent, step, projectTitle])

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < nikelContent.length - 1) {
      setStep(step + 1);
    } else {
      history.push("/app/about-me");
    }
  };

  const handleSelectStep = (position) => {
    setStep(position);
  };

  return (
    <div className={styles.root}>
      {content && (
        <MobileTourView
          tour={content}
          onBack={(e) => handleBack()}
          onNext={(e) => handleNext()}
          onSelect={(position) => handleSelectStep(position)}
          length={nikelContent.length}
          index={step}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser, tour }) => {
  const { nikelContent } = tour;
  const { projectTitle, surveyId } = authUser;
  return { projectTitle, nikelContent, surveyId };
};

export default connect(mapStateToProps, {
  actionNikelTourContent: nikelTourContent,
})(MobileTour);
