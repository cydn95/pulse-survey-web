import React, { Component } from "react";
import { connect } from "react-redux";

import Joyride, { STATUS } from "react-joyride";
import a11yChecker from "a11y-checker";
import { MobileGuide } from "Components/Tooltip";

import classnames from "classnames";
import { withRouter } from "react-router-dom";

import BottomBarMenuItem from "./BottomBarMenuItem";
import {
  setMainMenuClassName,
  setSubMenuClassName,
  projectListByUser,
} from "Redux/actions";

import styles from './styles.scss';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
      run: false,
      stepIndex: 0,
      steps: [
        {
          content: (
            <div className={styles.guide}>
              <div className={styles["guide__icon"]}>
                <svg
                  className={classnames(styles["guide__icon__image"])}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g stroke="none" strokeWidth="1">
                    <g transform="translate(-120.000000, -264.000000)">
                      <g transform="translate(120.000000, 267.000000)">
                        <rect x="11" y="4" width="1" height="8"></rect>
                        <path d="M21,9.0093689 C21,8.45190985 20.5490746,8 20.0052288,8 L2.99477117,8 C2.44537422,8 2,8.44335318 2,9.0093689 L2,12 L3,12 L3,9 L20,9 L20,12 L21,12 L21,9.0093689 Z"></path>
                        <path d="M17,0.497698784 C17,0.222827336 16.7702494,0 16.4987692,0 L6.50123084,0 C6.22440869,0 6,0.21484375 6,0.497698784 L6,4.50230122 C6,4.77717266 6.22975063,5 6.50123084,5 L16.4987692,5 C16.7755913,5 17,4.78515625 17,4.50230122 L17,0.497698784 Z"></path>
                        <path d="M5,13.4976988 C5,13.2228273 4.78515625,13 4.50230122,13 L0.497698784,13 C0.222827336,13 0,13.2148438 0,13.4976988 L0,17.5023012 C0,17.7771727 0.21484375,18 0.497698784,18 L4.50230122,18 C4.77717266,18 5,17.7851562 5,17.5023012 L5,13.4976988 Z"></path>
                        <path d="M14,13.4976988 C14,13.2228273 13.7851562,13 13.5023012,13 L9.49769878,13 C9.22282734,13 9,13.2148438 9,13.4976988 L9,17.5023012 C9,17.7771727 9.21484375,18 9.49769878,18 L13.5023012,18 C13.7771727,18 14,17.7851562 14,17.5023012 L14,13.4976988 Z"></path>
                        <path d="M23,13.4976988 C23,13.2228273 22.7851562,13 22.5023012,13 L18.4976988,13 C18.2228273,13 18,13.2148438 18,13.4976988 L18,17.5023012 C18,17.7771727 18.2148438,18 18.4976988,18 L22.5023012,18 C22.7771727,18 23,17.7851562 23,17.5023012 L23,13.4976988 Z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <h2 className={styles["guide__title"]}>Step 1</h2>
              <p className={styles["guide__content"]}>
                Make sure your on the right project
              </p>
            </div>
          ),
          placement: "bottom",
          target: ".b-menu-my-projects",
          disableBeacon: true,
        },
        {
          content: (
            <div className={styles.guide}>
              <div className={styles["guide__icon"]}>
                <svg
                  className={classnames(styles["guide__icon__image"])}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none" />
                  </g>
                  <g>
                    <path d="m10.54 10.443c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                    <path d="m16.69 18.803c-0.19-3.62-3.17-6.45-6.79-6.45s-6.6 2.83-6.79 6.45l-2-0.1c0.24-4.68 4.1-8.34 8.79-8.34 4.68 0 8.54 3.67 8.79 8.34l-2 0.1z" />
                  </g>
                </svg>
              </div>
              <h2 className={styles["guide__title"]}>Step 2</h2>
              <p className={styles["guide__content"]}>
                Rate how you feel the Project is going
              </p>
            </div>
          ),
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
          placement: "bottom",
          target: ".b-menu-about-me",
        },
        {
          content: (
            <div className={styles.guide}>
              <div className={styles["guide__icon"]}>
                <svg
                  className={classnames(styles["guide__icon__image"])}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none" />
                  </g>
                  <g stroke="null">
                    <path
                      d="m2.642 9.5924c0.50308 0 0.94019 0.18144 1.3031 0.55257s0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257-0.94019-0.18144-1.3031-0.55257-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257zm2.5484 2.3257v-0.93194h1.3938v0.93194h-1.3938zm12.066 1.3855c0.57731 0 1.0721 0.20618 1.4763 0.6103s0.6103 0.89895 0.6103 1.4763-0.20618 1.0721-0.6103 1.4763-0.89895 0.6103-1.4763 0.6103-1.0721-0.20618-1.4763-0.6103-0.6103-0.89895-0.6103-1.4763l0.032989-0.28865-2.3752-1.3608c-0.3134 0.3134-0.65978 0.54432-1.0474 0.70926s-0.79998 0.24742-1.2453 0.24742c-0.57731 0-1.1216-0.14845-1.6247-0.4371s-0.89895-0.68452-1.1876-1.1876-0.4371-1.0474-0.4371-1.6247c0-0.51958 0.11546-1.0062 0.34638-1.4515s0.54432-0.82473 0.93194-1.1299l-0.95668-2.0618h-0.09072c-0.57731 0-1.0721-0.20618-1.4763-0.6103s-0.6103-0.89895-0.6103-1.4763 0.20618-1.0721 0.6103-1.4763 0.89895-0.6103 1.4763-0.6103 1.0721 0.20618 1.4763 0.6103 0.6103 0.89895 0.6103 1.4763c0 0.61854-0.23917 1.1381-0.72576 1.567l0.95668 2.0041c0.23092-0.057731 0.46185-0.09072 0.69277-0.09072 0.57731 0 1.1216 0.14845 1.6247 0.4371s0.89895 0.68452 1.1876 1.1876 0.4371 1.0474 0.4371 1.6247c0 0.37113-0.065978 0.74225-0.20618 1.1299l2.2598 1.3113c0.40412-0.38762 0.88246-0.58556 1.4268-0.58556zm-9.7483-7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.30515 0.20618 0.49484 0.20618zm3.0185 7.8844c0.50308 0 0.94019-0.18144 1.3031-0.55257s0.55257-0.79998 0.55257-1.3031-0.18144-0.94019-0.55257-1.3031-0.79998-0.55257-1.3031-0.55257-0.94019 0.18144-1.3031 0.55257-0.55257 0.79998-0.55257 1.3031 0.18144 0.94019 0.55257 1.3031 0.79998 0.55257 1.3031 0.55257zm5.1628-4.7834-1.3938 1.0474-0.57731-0.7505 1.3938-1.0474 0.57731 0.7505zm1.7979-0.3134c-0.50308 0-0.94019-0.18144-1.3031-0.55257s-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257 0.94019 0.18144 1.3031 0.55257 0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257zm-0.23092 7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.2969 0.20618 0.49484 0.20618z"
                      stroke="null"
                    />
                  </g>
                </svg>
              </div>
              <h2 className={styles["guide__title"]}>Step 3</h2>
              <p className={styles["guide__content"]}>
                Now tell us your views on how others see the project
              </p>
            </div>
          ),
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
          placement: "bottom",
          target: ".b-menu-about-others",
        },
      ],
    };
  }

  handleStartGuide = () => {
    this.setState({
      run: true,
    });
  };

  handleStopGuide = () => {
    this.setState({
      run: false,
    });
  };

  componentWillReceiveProps(props) {
    const { screenMode } = props;

    a11yChecker();

    if (screenMode === "mobile") {
      setTimeout(this.handleStartGuide, 1000);
    } else {
      setTimeout(this.handleStopGuide, 500);
    }
  }

  componentWillMount() {
    const { getProjectListByUser, user, projectList } = this.props;
    if (projectList.length === 0) {
      getProjectListByUser(user.userId);
    }
  }

  handleClickMainMenu = (e, menu, navigate) => {
    e.preventDefault();

    const { history, setMainMenuClassName, mainMenuClassName } = this.props;

    setMainMenuClassName(menu);

    if (navigate) {
      this.setState({
        subMenuOpen: false,
      });
      history.push("/app/" + menu);
    } else {
      if (menu === mainMenuClassName) {
        this.setState({
          subMenuOpen: !this.state.subMenuOpen,
        });
      } else {
        this.setState({
          subMenuOpen: true,
        });
      }
    }
  };

  handleClickSubMenu = (e, menu, to) => {
    e.preventDefault();

    const { history, setSubMenuClassName } = this.props;

    setSubMenuClassName(menu);

    this.setState({
      subMenuOpen: false,
    });

    history.push(to);
  };

  handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }
  };

  getHelpers = (helpers) => {
    this.helpers = helpers;
  };

  render() {
    const { mainMenuClassName, subMenuClassName, projectList } = this.props;
    const { subMenuOpen, run, steps } = this.state;

    return (
      <div className={styles.root}>
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          getHelpers={this.getHelpers}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          skipBeacon={true}
          tooltipComponent={MobileGuide}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <div className={styles["main-menu"]}>
          <div className={styles.link}>
            <ul className={styles.nav}>
              <li
                className={classnames(
                  styles["nav--item"],
                  "b-menu-my-projects"
                )}
              >
                <BottomBarMenuItem
                  to="/app/my-project"
                  menuKey="my-project"
                  menuTitle="My Project"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g stroke="none" strokeWidth="1">
                      <g transform="translate(-120.000000, -264.000000)">
                        <g transform="translate(120.000000, 267.000000)">
                          <rect x="11" y="4" width="1" height="8"></rect>
                          <path d="M21,9.0093689 C21,8.45190985 20.5490746,8 20.0052288,8 L2.99477117,8 C2.44537422,8 2,8.44335318 2,9.0093689 L2,12 L3,12 L3,9 L20,9 L20,12 L21,12 L21,9.0093689 Z"></path>
                          <path d="M17,0.497698784 C17,0.222827336 16.7702494,0 16.4987692,0 L6.50123084,0 C6.22440869,0 6,0.21484375 6,0.497698784 L6,4.50230122 C6,4.77717266 6.22975063,5 6.50123084,5 L16.4987692,5 C16.7755913,5 17,4.78515625 17,4.50230122 L17,0.497698784 Z"></path>
                          <path d="M5,13.4976988 C5,13.2228273 4.78515625,13 4.50230122,13 L0.497698784,13 C0.222827336,13 0,13.2148438 0,13.4976988 L0,17.5023012 C0,17.7771727 0.21484375,18 0.497698784,18 L4.50230122,18 C4.77717266,18 5,17.7851562 5,17.5023012 L5,13.4976988 Z"></path>
                          <path d="M14,13.4976988 C14,13.2228273 13.7851562,13 13.5023012,13 L9.49769878,13 C9.22282734,13 9,13.2148438 9,13.4976988 L9,17.5023012 C9,17.7771727 9.21484375,18 9.49769878,18 L13.5023012,18 C13.7771727,18 14,17.7851562 14,17.5023012 L14,13.4976988 Z"></path>
                          <path d="M23,13.4976988 C23,13.2228273 22.7851562,13 22.5023012,13 L18.4976988,13 C18.2228273,13 18,13.2148438 18,13.4976988 L18,17.5023012 C18,17.7771727 18.2148438,18 18.4976988,18 L22.5023012,18 C22.7771727,18 23,17.7851562 23,17.5023012 L23,13.4976988 Z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li
                className={classnames(styles["nav--item"], "b-menu-about-me")}
              >
                <BottomBarMenuItem
                  to="/app/about-me"
                  menuKey="about-me"
                  menuTitle="About Me"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, true)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g>
                      <path d="m10.54 10.443c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                      <path d="m16.69 18.803c-0.19-3.62-3.17-6.45-6.79-6.45s-6.6 2.83-6.79 6.45l-2-0.1c0.24-4.68 4.1-8.34 8.79-8.34 4.68 0 8.54 3.67 8.79 8.34l-2 0.1z" />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li
                className={classnames(
                  styles["nav--item"],
                  "b-menu-about-others"
                )}
              >
                <BottomBarMenuItem
                  to="/app/about-others"
                  menuKey="about-others"
                  menuTitle="About Others"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, true)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g stroke="null">
                      <path
                        d="m18.381 2.7343c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-0.93349h-7.4856v1.3738l2.4306 4.2359h3.188c0.25539 0 0.47555 0.096872 0.66049 0.28181s0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.505l-2.8093-4.914h-2.7917c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.7516c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7428c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v0.93349h7.4856v-0.93349c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7252v0.008807zm-13.562 4.2095v-2.8093h-2.8093v2.8093h2.8093zm3.7428 6.5521v2.8093h2.8093v-2.8093h-2.8093zm9.3525-6.5521v-2.8093h-2.8093v2.8093h2.8093z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
              <li className={styles["nav--item"]}>
                <BottomBarMenuItem
                  to="/app/dashboard"
                  menuKey="dashboard"
                  menuTitle="Dashboard"
                  className={styles["nav--item--link"]}
                  mainMenuClassName={mainMenuClassName}
                  onClickMenu={(e, menuKey) =>
                    this.handleClickMainMenu(e, menuKey, false)
                  }
                >
                  <svg
                    className={classnames(styles.icon)}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect x="-1" y="-1" width="22" height="22" fill="none" />
                    </g>
                    <g stroke="null">
                      <path
                        d="m16.751 4.0538c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695v9.7509c0 0.52871-0.19068 0.98809-0.58072 1.3695s-0.84074 0.58072-1.3695 0.58072h-13.651c-0.52871 0-0.98809-0.19068-1.3695-0.58072s-0.58072-0.84074-0.58072-1.3695v-9.7509c0-0.52871 0.19068-0.98809 0.58072-1.3695s0.84074-0.58072 1.3695-0.58072h4.3857v-0.97942c0-0.26002 0.095342-0.49404 0.28603-0.68473s0.4247-0.28603 0.68473-0.28603h2.9296c0.26002 0 0.49404 0.095342 0.68473 0.28603s0.28603 0.4247 0.28603 0.68473v0.97942h4.3944zm0.48538 11.701v-9.7509c0-0.13868-0.043337-0.26002-0.13868-0.3467s-0.20802-0.13868-0.3467-0.13868h-4.3857v1.4648h-4.8798v-1.4648h-4.3857c-0.13868 0-0.26002 0.043337-0.3467 0.13868s-0.13868 0.20802-0.13868 0.3467v9.7509c0 0.13868 0.043337 0.26002 0.13868 0.3467s0.20802 0.13868 0.3467 0.13868h3.441l-0.03467-0.095342v-0.58072c0-0.48538 0.19935-0.90142 0.59805-1.2481s0.87541-0.52005 1.4475-0.52005c0.10401 0 0.23402 0.03467 0.3987 0.095342 0.32936 0.10401 0.65006 0.15601 0.97942 0.15601s0.65006-0.052005 0.97942-0.15601c0.18202-0.060672 0.31203-0.095342 0.3987-0.095342 0.57205 0 1.0488 0.17335 1.4475 0.52005s0.59805 0.76274 0.59805 1.2481v0.58072l-0.03467 0.095342h3.441c0.13868 0 0.26002-0.043337 0.3467-0.13868s0.13001-0.20802 0.13001-0.3467zm-7.3153-6.83c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695-0.19068 0.98809-0.58072 1.3695-0.84074 0.58072-1.3695 0.58072-0.98809-0.19068-1.3695-0.58072-0.58072-0.84074-0.58072-1.3695 0.19068-0.98809 0.58072-1.3695 0.84074-0.58072 1.3695-0.58072zm-0.97075-5.3565v1.9502h1.9502v-1.9502h-1.9502z"
                        stroke="null"
                      />
                    </g>
                  </svg>
                </BottomBarMenuItem>
              </li>
            </ul>
          </div>
        </div>
        {mainMenuClassName === "my-project" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                {projectList.map((project, index) => (
                  <li key={index} className={styles["nav--item"]}>
                    <BottomBarMenuItem
                      to={`/app/my-project/${project.project.projectName}`}
                      menuKey={project.project.projectName}
                      menuTitle={project.project.projectName}
                      className={styles["nav--item--link"]}
                      mainMenuClassName={subMenuClassName}
                      onClickMenu={(e, menuKey) =>
                        this.handleClickSubMenu(
                          e,
                          menuKey,
                          `/app/my-project/${project.project.projectName}`
                        )
                      }
                    ></BottomBarMenuItem>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.space}></div>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/my-project/create"
                    menuKey="create-project"
                    menuTitle="Create a new project"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/my-project/create"
                      )
                    }
                  />
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/my-project/join"
                    menuKey="join-project"
                    menuTitle="Join an existing project"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/my-project/join"
                      )
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
        {mainMenuClassName === "dashboard" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/dashboard/report-1"
                    menuKey="report-1"
                    menuTitle="Report 1"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/dashboard/report-1"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/dashboard/report-2"
                    menuKey="report-2"
                    menuTitle="Report 2"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/dashboard/report-2"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
              </ul>
            </div>
            <div className={styles.space}></div>
          </div>
        )}
        {mainMenuClassName === "help" && subMenuOpen && (
          <div className={styles["sub-menu"]}>
            <div className={styles.link}>
              <ul className={styles.nav}>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/how-to-use-pulse"
                    menuKey="how-to-use-pulse"
                    menuTitle="How to use Pulse"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/how-to-use-pulse"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/turn-on-guide-mode"
                    menuKey="turn-on-guide-mode"
                    menuTitle="Turn On Guide Mode"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/turn-on-guide-mode"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/faq"
                    menuKey="faq"
                    menuTitle="FAQ"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(e, menuKey, "/app/help/faq")
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/safe-to-speak"
                    menuKey="safe-to-speak"
                    menuTitle="Safe to Speak?"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/safe-to-speak"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
                <li className={styles["nav--item"]}>
                  <BottomBarMenuItem
                    to="/app/help/code-of-conduct"
                    menuKey="code-of-conduct"
                    menuTitle="Code of Conduct"
                    className={styles["nav--item--link"]}
                    mainMenuClassName={subMenuClassName}
                    onClickMenu={(e, menuKey) =>
                      this.handleClickSubMenu(
                        e,
                        menuKey,
                        "/app/help/code-of-conduct"
                      )
                    }
                  ></BottomBarMenuItem>
                </li>
              </ul>
            </div>
            <div className={styles.space}></div>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = ({ menu, settings, authUser }) => {
  const { mainMenuClassName, subMenuClassName } = menu;
  const { projectList } = settings;
  const { user } = authUser;

  return {
    user,
    projectList,
    mainMenuClassName,
    subMenuClassName,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    setMainMenuClassName,
    setSubMenuClassName,
    getProjectListByUser: projectListByUser,
  })(BottomBar)
);
