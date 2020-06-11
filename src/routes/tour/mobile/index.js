import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import MobileTourView from "Components/MobileTourView";
import { MOBILE_TOUR_CONTENT } from "Constants/defaultValues";

import { nikelTourContent } from "Redux/actions";

import styles from "./styles.scss";

const MobileTour = ({ history, nikelContent, actionNikelTourContent }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    actionNikelTourContent();
  }, [actionNikelTourContent]);

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
      {nikelContent.length > 0 && (
        <MobileTourView
          tour={nikelContent[step]}
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

const mapStateToProps = ({ tour }) => {
  const { nikelContent } = tour;
  return { nikelContent };
};

export default connect(mapStateToProps, {
  actionNikelTourContent: nikelTourContent,
})(MobileTour);
