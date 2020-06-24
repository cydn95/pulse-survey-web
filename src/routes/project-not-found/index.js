import React from "react";

import { NavLink } from "react-router-dom";
import MessageBox from "Components/MessageBox";

import styles from "./styles.scss";

function ProjectNotFound() {
  return (
    <MessageBox title="Project Not Found" subTitle="">
      Please select a project first.
      <br />
      <NavLink to={`/app/settings/projects`} className={styles.link}>
        Go to Setting Page
      </NavLink>
    </MessageBox>
  );
}

export default ProjectNotFound;
