import React, { Component } from "react";

import { Button } from "reactstrap";

class Welcome extends Component {
  handleContinue = (e) => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <div className="welcome">
        <div className="welcome__content">
          <a className="welcome__content--help">
            HELP US MAKE PROJECT ALFA BETTER
          </a>
          <h1 className="welcome__content--title">
            Pulse is more than a survey.
          </h1>
          <p className="welcome__content--description">
            This platform has been taught many of the important concepts​
            involved in this project. This questionnaire is not designed to
            point fingers or find people to blame - but only to vimprove how we
            communicate and collaborate. ​Your responses will be anonymised and
            combined with others to guide managers on new focus areas to improve
            team/stakeholder engagement and project performance.​
          </p>
          <p className="welcome__content--description">
            The questions are divided into two parts:
          </p>
          <div className="welcome__content__about">
            <div className="welcome__content__about__section">
              <h2 className="welcome__content__about__section--subtitle2">
                About You
              </h2>
              <p className="welcome__content__about__section--description">
                What you think / feel about the project.​
              </p>
              <img
                className="welcome__content__about__section--img"
                src="/assets/img/email/main-1.png"
                alt=""
              />
            </div>
            <div className="welcome__content__about__section">
              <h2 className="welcome__content__about__section--subtitle2">
                About Others
              </h2>
              <p className="welcome__content__about__section--description">
                What you assume other people are thinking​ or feeling about the
                project.​​
              </p>
              <img
                className="welcome__content__about__section--img"
                src="/assets/img/email/main-2.png"
                alt=""
              />
              <Button
                className="welcome__content__about__section--continue edge-btn green"
                onClick={(e) => this.handleContinue(e)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
