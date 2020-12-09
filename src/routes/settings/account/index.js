import React from "react";
import { connect } from "react-redux";

import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import UploadImage from "./UploadImage";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import styles from "./styles.scss";

import {
  changePassword,
  getProfile,
  changeProfile,
  changeAvatar,
} from "Redux/actions";

class Account extends React.Component {
  componentDidMount() {
    const { userId, getProfile } = this.props;
    getProfile(userId);
  }

  handleChangePassword = (password, confirmPassword) => {
    const { userProfile, userToken, changePassword } = this.props;
    if (password === "") {
      NotificationManager.error("Password must be required", "Info", 2000);
      return;
    }
    if (password !== confirmPassword) {
      NotificationManager.error("Password does not match", "Info", 2000);
      return;
    }

    changePassword(
      userToken,
      userProfile.email,
      password,
      this.callbackChangePassword
    );
  };

  callbackChangePassword = (res) => {
    if (res.data === "success") {
      NotificationManager.success(
        "Password has been changed successfully",
        "Info",
        2000
      );
    }
  };

  handleChangeProfile = (profile) => {

    const { firstName, lastName, email, team, organization } = profile;
    const { userToken, changeProfile } = this.props;

    if (firstName.trim() === "") {
      NotificationManager.error("First name is required", "Info", 2000);
      return;
    }

    if (lastName.trim() === "") {
      NotificationManager.error("Last name is required", "Info", 2000);
      return;
    }

    if (team.trim() === "") {
      NotificationManager.error("Team is required", "Info", 2000);
      return;
    }

    if (organization.trim() === "") {
      NotificationManager.error("Organization is required", "Info", 2000);
      return;
    }

    changeProfile(
      userToken,
      firstName,
      lastName,
      email,
      team,
      organization,
      this.callbackChangeProfile
    );
  };

  callbackChangeProfile = (res) => {
    const { getProfile, userId } = this.props;
    if (res.data === "success") {
      NotificationManager.success(
        "Profile has been changed successfully",
        "Info",
        2000
      );
      getProfile(userId);
    }
  };

  handleChangeAvatar = (data) => {
    const { userProfile, changeAvatar } = this.props;
    changeAvatar(userProfile.avatarId, data, this.callbackChangeAvatar);
  };

  callbackChangeAvatar = (res) => {
    const { getProfile, userId } = this.props;
    if (res.status === 200) {
      NotificationManager.success(
        "Your avatar has been changed successfully",
        "Info",
        2000
      );
      getProfile(userId);
    }
  };

  render() {
    const { userProfile } = this.props;
    return (
      <div className={styles.main}>
        <ProfileInfo
          className="profile-info"
          profile={userProfile}
          onChangeProfile={(profile) => this.handleChangeProfile(profile)}
        />
        <UploadImage
          className="profile-pic"
          profile={userProfile}
          onChangeAvatar={(data) => this.handleChangeAvatar(data)}
        />
        <ChangePassword
          className="change-password"
          onChangePassword={(password, confirmPassword) =>
            this.handleChangePassword(password, confirmPassword)
          }
        />
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, account }) => {
  const { user } = authUser;
  const { profile } = account;
  return {
    userId: user.userId,
    userToken: user.accessToken,
    userProfile: profile,
  };
};

export default connect(mapStateToProps, {
  changePassword,
  getProfile,
  changeProfile,
  changeAvatar,
})(Account);
