import React, {} from "react";
import { withRouter } from "react-router-dom";

import MessageBox from "Components/MessageBox";

import styles from './styles.scss';

function Error500(props) {
  return (
    <MessageBox
      title="500 Error"
      subTitle="INTERNAL SERVER ERROR"
      imageUrl="/assets/img/500.png"
    >
      The server has encountered an internal server misconfiguration and was unable to complete your request. Would you like to&nbsp; 
        <span onClick={() => props.history.goBack()} className={styles.link}>
        go back
        </span>
      &nbsp;?
    </MessageBox>
  )
}

export default withRouter(Error500);

