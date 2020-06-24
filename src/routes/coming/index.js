import React from "react";

import { NavLink } from "react-router-dom";
import MessageBox from "Components/MessageBox";

import styles from "./styles.scss";

function ComingSoon() {
  return (
    <MessageBox
      title="Coming Soon"
      subTitle="STAY TUNED!"
      imageUrl="/assets/img/comingsoon.png"
    >
      We are currently working on a super exciting feature
      <br />
      <NavLink to={`/`} className={styles.link}>
        Go to Homepage
      </NavLink>
    </MessageBox>
  );
}

export default ComingSoon;
