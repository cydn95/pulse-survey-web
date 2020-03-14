import React, { Component } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import {
  setCurrentMenuClassName,
  logoutUser
} from "Redux/actions";

import styles from './styles.scss';

class Sidebar extends Component {

  handleClickMenu = (e, menu) => {
    e.preventDefault();
    
    const { history, setCurrentMenuClassName } = this.props;

    setCurrentMenuClassName(menu);

    history.push('/app/' + menu);
  }

  render() {
    const { currentClassName } = this.props;

    return (
      <div className={ styles.root }>
        <div className={ styles.logo }></div>
        <div className={ styles.link }>
          <ul className={ styles.nav }>
            <li className={ styles["nav--item"] }>
              <NavLink
                className={ classnames(styles["nav--item--link"], { [styles.active]: currentClassName === 'about-me' ? true : false }) }
                to="/app/about-me"
                onClick={(e) => this.handleClickMenu(e, 'about-me')}>
                <svg className={ classnames(styles.icon) } viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none"/>
                  </g>
                  <g>
                    <path d="m10.54 10.443c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                    <path d="m16.69 18.803c-0.19-3.62-3.17-6.45-6.79-6.45s-6.6 2.83-6.79 6.45l-2-0.1c0.24-4.68 4.1-8.34 8.79-8.34 4.68 0 8.54 3.67 8.79 8.34l-2 0.1z"/>
                  </g>
                </svg>
                <span className={ classnames(styles.name) }>About Me</span>
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ classnames(styles["nav--item--link"], { [styles.active]: currentClassName === 'my-map' ? true : false }) }
                to="/app/my-map"
                onClick={(e) => this.handleClickMenu(e, 'my-map')}>
                <svg className={ classnames(styles.icon) } viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none"/>
                  </g>
                  <g stroke="null">
                    <path d="m2.642 9.5924c0.50308 0 0.94019 0.18144 1.3031 0.55257s0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257-0.94019-0.18144-1.3031-0.55257-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257zm2.5484 2.3257v-0.93194h1.3938v0.93194h-1.3938zm12.066 1.3855c0.57731 0 1.0721 0.20618 1.4763 0.6103s0.6103 0.89895 0.6103 1.4763-0.20618 1.0721-0.6103 1.4763-0.89895 0.6103-1.4763 0.6103-1.0721-0.20618-1.4763-0.6103-0.6103-0.89895-0.6103-1.4763l0.032989-0.28865-2.3752-1.3608c-0.3134 0.3134-0.65978 0.54432-1.0474 0.70926s-0.79998 0.24742-1.2453 0.24742c-0.57731 0-1.1216-0.14845-1.6247-0.4371s-0.89895-0.68452-1.1876-1.1876-0.4371-1.0474-0.4371-1.6247c0-0.51958 0.11546-1.0062 0.34638-1.4515s0.54432-0.82473 0.93194-1.1299l-0.95668-2.0618h-0.09072c-0.57731 0-1.0721-0.20618-1.4763-0.6103s-0.6103-0.89895-0.6103-1.4763 0.20618-1.0721 0.6103-1.4763 0.89895-0.6103 1.4763-0.6103 1.0721 0.20618 1.4763 0.6103 0.6103 0.89895 0.6103 1.4763c0 0.61854-0.23917 1.1381-0.72576 1.567l0.95668 2.0041c0.23092-0.057731 0.46185-0.09072 0.69277-0.09072 0.57731 0 1.1216 0.14845 1.6247 0.4371s0.89895 0.68452 1.1876 1.1876 0.4371 1.0474 0.4371 1.6247c0 0.37113-0.065978 0.74225-0.20618 1.1299l2.2598 1.3113c0.40412-0.38762 0.88246-0.58556 1.4268-0.58556zm-9.7483-7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.30515 0.20618 0.49484 0.20618zm3.0185 7.8844c0.50308 0 0.94019-0.18144 1.3031-0.55257s0.55257-0.79998 0.55257-1.3031-0.18144-0.94019-0.55257-1.3031-0.79998-0.55257-1.3031-0.55257-0.94019 0.18144-1.3031 0.55257-0.55257 0.79998-0.55257 1.3031 0.18144 0.94019 0.55257 1.3031 0.79998 0.55257 1.3031 0.55257zm5.1628-4.7834-1.3938 1.0474-0.57731-0.7505 1.3938-1.0474 0.57731 0.7505zm1.7979-0.3134c-0.50308 0-0.94019-0.18144-1.3031-0.55257s-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257 0.94019 0.18144 1.3031 0.55257 0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257zm-0.23092 7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.2969 0.20618 0.49484 0.20618z" stroke="null"/>
                  </g>
                </svg>
                <span className={ classnames(styles.name) }>My Map</span>
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ classnames(styles["nav--item--link"], { [styles.active]: currentClassName === 'project-map' ? true : false }) }
                to="/app/project-map"
                onClick={(e) => this.handleClickMenu(e, 'project-map')}>
                <svg className={ classnames(styles.icon) } viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none"/>
                  </g>
                  <g stroke="null">
                    <path d="m18.381 2.7343c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-0.93349h-7.4856v1.3738l2.4306 4.2359h3.188c0.25539 0 0.47555 0.096872 0.66049 0.28181s0.28181 0.4051 0.28181 0.66049v3.7428c0 0.25539-0.096872 0.47555-0.28181 0.66049s-0.4051 0.28181-0.66049 0.28181h-3.7428c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.505l-2.8093-4.914h-2.7917c-0.25539 0-0.47555-0.088065-0.66049-0.28181-0.18494-0.18494-0.28181-0.4051-0.28181-0.66049v-3.7516c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7428c0.25539 0 0.47555 0.088065 0.66049 0.28181 0.18494 0.18494 0.28181 0.4051 0.28181 0.66049v0.93349h7.4856v-0.93349c0-0.25539 0.088065-0.47555 0.28181-0.66049 0.18494-0.18494 0.4051-0.28181 0.66049-0.28181h3.7252v0.008807zm-13.562 4.2095v-2.8093h-2.8093v2.8093h2.8093zm3.7428 6.5521v2.8093h2.8093v-2.8093h-2.8093zm9.3525-6.5521v-2.8093h-2.8093v2.8093h2.8093z" stroke="null"/>
                  </g>
                </svg>
                <span className={ classnames(styles.name) }>Project Map</span>
              </NavLink>
            </li>

            <li className={ styles["nav--item"] }>
              <NavLink
                className={ classnames(styles["nav--item--link"], { [styles.active]: currentClassName === 'me' ? true : false } ) }
                to="/app/me"
                onClick={(e) => this.handleClickMenu(e, 'me')}>
                <svg className={ classnames(styles.icon) } viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="-1" y="-1" width="22" height="22" fill="none"/>
                  </g>
                  <g stroke="null">
                    <path className="st0" d="m16.751 4.0538c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695v9.7509c0 0.52871-0.19068 0.98809-0.58072 1.3695s-0.84074 0.58072-1.3695 0.58072h-13.651c-0.52871 0-0.98809-0.19068-1.3695-0.58072s-0.58072-0.84074-0.58072-1.3695v-9.7509c0-0.52871 0.19068-0.98809 0.58072-1.3695s0.84074-0.58072 1.3695-0.58072h4.3857v-0.97942c0-0.26002 0.095342-0.49404 0.28603-0.68473s0.4247-0.28603 0.68473-0.28603h2.9296c0.26002 0 0.49404 0.095342 0.68473 0.28603s0.28603 0.4247 0.28603 0.68473v0.97942h4.3944zm0.48538 11.701v-9.7509c0-0.13868-0.043337-0.26002-0.13868-0.3467s-0.20802-0.13868-0.3467-0.13868h-4.3857v1.4648h-4.8798v-1.4648h-4.3857c-0.13868 0-0.26002 0.043337-0.3467 0.13868s-0.13868 0.20802-0.13868 0.3467v9.7509c0 0.13868 0.043337 0.26002 0.13868 0.3467s0.20802 0.13868 0.3467 0.13868h3.441l-0.03467-0.095342v-0.58072c0-0.48538 0.19935-0.90142 0.59805-1.2481s0.87541-0.52005 1.4475-0.52005c0.10401 0 0.23402 0.03467 0.3987 0.095342 0.32936 0.10401 0.65006 0.15601 0.97942 0.15601s0.65006-0.052005 0.97942-0.15601c0.18202-0.060672 0.31203-0.095342 0.3987-0.095342 0.57205 0 1.0488 0.17335 1.4475 0.52005s0.59805 0.76274 0.59805 1.2481v0.58072l-0.03467 0.095342h3.441c0.13868 0 0.26002-0.043337 0.3467-0.13868s0.13001-0.20802 0.13001-0.3467zm-7.3153-6.83c0.52871 0 0.98809 0.19068 1.3695 0.58072s0.58072 0.84074 0.58072 1.3695-0.19068 0.98809-0.58072 1.3695-0.84074 0.58072-1.3695 0.58072-0.98809-0.19068-1.3695-0.58072-0.58072-0.84074-0.58072-1.3695 0.19068-0.98809 0.58072-1.3695 0.84074-0.58072 1.3695-0.58072zm-0.97075-5.3565v1.9502h1.9502v-1.9502h-1.9502z" stroke="null"/>
                  </g>
                </svg>
                <span className={ classnames(styles.name) }>Dashboard</span>
              </NavLink>
            </li>
            <li className={ styles["nave--space"]}>

            </li>
          </ul>
        </div>
        <div className={styles.space}></div>
        <div className={ classnames(styles.link, styles.bottom) }>
          <ul className={ styles.nav }>
            <li className={ styles["nav--item"] }>
              <NavLink
                className={ classnames(styles["nav--item--link"], { [styles.active]: currentClassName === 'settings' ? true : false }) }
                to="/app/settings"
                onClick={(e) => this.handleClickMenu(e, 'settings')}>
                <span className={ classnames(styles.name) }>Settings</span>
              </NavLink>
            </li>
            <li className={ styles["nav--item"] }>
              <a
                href=""
                className={ styles["nav--item--link"] }
                onClick={(e) => { e.preventDefault(); this.props.logoutUser() }}>
                <span className={ classnames(styles.name) }>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ menu }) => {
  const {
    currentClassName
  } = menu;
  return {
    currentClassName
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setCurrentMenuClassName, logoutUser }
  )(Sidebar)
);
