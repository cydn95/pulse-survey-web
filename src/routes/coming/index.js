import React, { Component, Fragment } from "react";

import MessageBox from "Components/MessageBox";

function ComingSoon() {
  return (
    <MessageBox
      title="Coming Soon"
      subTitle="STAY TUNED!"
      imageUrl="/assets/img/profile-pic-l-2.jpg"
    >
      We are currently working on a super exciting feature
    </MessageBox>
  )
}

export default ComingSoon;
