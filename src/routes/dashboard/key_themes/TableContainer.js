import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { textValueReport } from "Redux/actions";

import KeyThemesTable from "Components/report/KeyThemes/Table";

import styles from "./styles.scss";
// import { tableData } from "./dummy";

const TableContainer = ({ tab, label, actionTextValue, surveyId, surveyUserId }) => {
  const [data, setData] = useState([]);

  const callback = (res) => {
    setData(res);
  };

  useEffect(() => {
    actionTextValue(surveyId, tab, surveyUserId, callback);
  }, [tab, actionTextValue, surveyId, surveyUserId]);

  return (
    <div className={styles["keythemes-content-wrapper"]}>
      <div className={styles["keythemes-content-title"]}>{label}</div>
      <div className={styles["keythemes-content"]}>
        <KeyThemesTable data={data} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { surveyId, surveyUserId } = authUser;

  return {
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionTextValue: textValueReport,
})(TableContainer);
