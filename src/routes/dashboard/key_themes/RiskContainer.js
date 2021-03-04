import React from "react";

import KeyThemesTable from "Components/report/KeyThemes/Table";

import styles from "./styles.scss";

import { tableData } from "./dummy";

const RiskContainer = () => {
  return (
    <div className={styles["keythemes-content-wrapper"]}>
      <div className={styles["keythemes-content-title"]}>Risks</div>
      <div className={styles["keythemes-content"]}>
        <KeyThemesTable data={tableData} />
      </div>
    </div>
  );
};

export default RiskContainer;
