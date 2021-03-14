import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

import { textValueReport } from "Redux/actions";
import KeyThemesTable from "Components/report/KeyThemes/Table";

import styles from "./styles.scss";

const TableContainer = ({
  tab,
  label,
  actionTextValue,
  surveyId,
  surveyUserId,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const callback = (res) => {
    setLoading(false);
    setData(res);
  };

  useEffect(() => {
    setLoading(true);
    actionTextValue(surveyId, tab, surveyUserId, callback);
  }, [tab, actionTextValue, surveyId, surveyUserId]);

  return (
    <div className={styles["keythemes-content-wrapper"]}>
      <div className={styles["keythemes-content-title"]}>{label}</div>
      <div className={styles["keythemes-content"]}>
        {loading ? (
          <ReactLoading
            className={styles["keythemes-content-loading"]}
            type={"bars"}
            color={"grey"}
          />
        ) : data.length > 0 ? (
          <KeyThemesTable data={data} />
        ) : (
          <h2 className={styles["keythemes-content-nodata"]}>No Data</h2>
        )}
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
