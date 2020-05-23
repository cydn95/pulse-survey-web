import React from "react";

import MobileTourView from "Components/MobileTourView";
import { MOBILE_TOUR_CONTENT } from "Constants/defaultValues";

import styles from "./styles.scss";

class MobileTour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  handleBack = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState((state, props) => ({
        step: state.step - 1,
      }));
    }
  };

  handleNext = () => {
    const { step } = this.state;
    const { history } = this.props;

    if (step < MOBILE_TOUR_CONTENT.length - 1) {
      this.setState((state, props) => ({
        step: state.step + 1,
      }));
    } else {
      history.push('/app/about-me');
    }
  };

  handleSelectStep = (position) => {
    this.setState({
      step: position
    });
  }

  render() {
    const { step } = this.state;
    
    return (
      <div className={styles.root}>
        <MobileTourView
          tour={MOBILE_TOUR_CONTENT[step]}
          onBack={(e) => this.handleBack()}
          onNext={(e) => this.handleNext()}
          onSelect={position => this.handleSelectStep(position)}
          length={MOBILE_TOUR_CONTENT.length}
          index={step}
        />
      </div>
    );
  }
}

export default MobileTour;
