import React, {} from "react";

import {useHistory} from "react-router-dom";

import { NavLink } from "react-router-dom";

import MessageBox from "Components/MessageBox";

import styles from './styles.scss';

function Error404() {
  return (
    <MessageBox
      title="404 Error"
      subTitle="NOT FOUND!"
      imageUrl="/assets/img/404.png"
    >
      We are sorry, the page you have looked for does not exist in our database. Perhaps you would
      like to go to our &nbsp;
        <NavLink to={`/`} className={styles.link}>
        homepage
        </NavLink>
      &nbsp;?
    </MessageBox>
  )
}

export default Error404;

