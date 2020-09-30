import React from "react";

import { ResponsiveSmile as Smile } from "./Smile";

import styles from "./styles.scss";

const Participation = ({ allData, allCount, teamData, teamCount, labels }) => {
  return (
    <div className={styles["participation-root"]}>
      <div className={styles.content}>
        <Smile
          className={styles.donut}
          keySelector={(data) => data.name}
          valueSelector={(data) => data.count}
          width={100}
          height={100}
          sentiment={"happy"}
          subDriver={allCount}
          data={allData}
        />
        <Smile
          className={styles.donut}
          keySelector={(data) => data.name}
          valueSelector={(data) => data.count}
          width={100}
          height={100}
          sentiment={"happy"}
          subDriver={teamCount}
          data={teamData}
        />
      </div>
    </div>
  );
};

export default Participation;
