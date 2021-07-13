import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "Containers/TopNav";
import { createMarkup } from "Util/Utils";

import styles from "./styles.scss";

const ConfigPage = ({ match, projectTitle, pageContent }) => {
  const { params } = match;
  const { pageId } = params;

  const [page, setPage] = useState(null);

  useEffect(() => {
    const findIndex = pageContent.findIndex(
      (p) => p.id.toString() === pageId.toString()
    );

    if (findIndex >= 0) {
      setPage({
        ...pageContent[findIndex],
      });
    }
  }, [pageContent, pageId]);

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav
          history={history}
          menuTitle={page && page.pageName}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
        {page && (
          <div
            className={styles["config-page-main"]}
            dangerouslySetInnerHTML={createMarkup(page.pageContent)}
          ></div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, tour }) => {
  const { projectTitle } = authUser;
  const { pageContent } = tour;

  return {
    projectTitle,
    pageContent,
  };
};

export default withRouter(connect(mapStateToProps, {})(ConfigPage));
