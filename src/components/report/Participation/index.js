import React from "react";

import { ResponsiveSmile as Smile } from "./Smile";

import styles from "./styles.scss";

const Participation = ({ allData, allCount, teamData, teamCount, labels }) => {

  return (
    <div className={styles["participation-root"]}>
      <div className={styles.content}>
        <div className={styles["content-item"]}>
          <Smile
            className={styles.donut}
            keySelector={(data) => data.name}
            valueSelector={(data) => data.count}
            width={100}
            height={100}
            type="Team Members"
            subDriver={teamCount}
            data={teamData}
          />
          <p>Team Members</p>
        </div>
        <div className={styles["content-item"]}>
          <Smile
            className={styles.donut}
            keySelector={(data) => data.name}
            valueSelector={(data) => data.count}
            width={100}
            height={100}
            subDriver={allCount}
            type="Stakeholders"
            data={allData}
          />
          <p>Stakeholders</p>
        </div>
      </div>
    </div>
  );
};

export default Participation;
