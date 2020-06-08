import React, { Component } from "react";
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from "react-joyride";
import styled from "styled-components";
import { grommet } from "grommet/themes";
import { Box, Button, Grommet, Heading } from "grommet";

import a11yChecker from "a11y-checker";

// import styles from './styles.scss';

const Wrapper = styled(Grommet)`
  background-color: #3c3f41;
  color: #fff;
  padding-bottom: 50px;
  height: 100vh;
`;

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      stepIndex: [],
      run: false
    }
  }

  componentDidMount() {
    this.setState(
      {
        run: true,
        steps: [
          {
            content: (
              <div>
                You can interact with your own components through the spotlight.
                <br />
                Click the menu above!
              </div>
            ),
            disableBeacon: true,
            disableOverlayClose: true,
            hideCloseButton: true,
            hideFooter: true,
            placement: "bottom",
            spotlightClicks: true,
            styles: {
              options: {
                zIndex: 10000,
              },
            },
            target: null,
            title: "Menu",
          },
        ],
      },
      () => {
        a11yChecker();
      }
    );
  }

  render() {
    return (
        <Wrapper theme={grommet} full={true} id="outerContainer">
          dfdd
        </Wrapper>
    )
  }
}

export default Tooltip;