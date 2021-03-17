import React, { useMemo, useState, useEffect } from "react";

import { removeSpace } from "../../../services/axios/utility";
import TrendLine from "Components/report/syncfusion/TrendLine";

import styles from "./styles.scss";
import classnames from "classnames";

const getColor = (val) => {
  if (val < 4) {
    return "#c00000";   // dark red
  }

  if (val < 5) {
    return "#e56965";   // lighter red
  }

  if (val < 7) {
    return "#4da9ef";   // blue
  }

  if (val < 8) {
    return "#8acbc1";   // lighter green
  }

  return "#00b7a2";     // solid green
};

const HeatMap = ({ data, chartWidth }) => {

  const colP = useMemo(() => {
    if (Object.keys(data).length > 0) {
      return 100 / (data[Object.keys(data)[0]].length + 1);
    }
    return 100;
  }, [data]);

  const [trendVisible, setTrendVisible] = useState({});

  useEffect(() => {
    let temp = {};
    Object.keys(data).forEach((key, index) => {
      if (index > 0) {
        temp[removeSpace(key)] = false;
      }
    });
    // console.log(temp);
    setTrendVisible({ ...temp });
  }, [data]);

  const toggleTrendVisible = (selectedKey) => {
    const tempValue = !trendVisible[selectedKey];
    let temp = {};
    Object.keys(trendVisible).forEach((key) => {
      temp[key] = false;
    });

    temp[selectedKey] = tempValue;
    setTrendVisible({ ...temp });
  };

  return (
    <div className={styles.root}>
      {Object.keys(data).map((key, rowNum) => {
        const keyValue = removeSpace(key);
        return (
          <div key={`heatmap-row-wrapper-${keyValue}`}>
            <div key={`heatmap-row-${keyValue}`} className={styles["map-row"]}>
              <div
                className={styles["map-col"]}
                style={{ width: `${colP}%`, cursor: 'pointer' }}
                onClick={(e) => toggleTrendVisible(keyValue)}
              >
                {key}
              </div>
              {data[key].map((d, index) => {
                const style =
                  rowNum >= 2 ? { background: getColor(Number(d.value)) } : {};
                return (
                  <div
                    key={`heatmap-col-${keyValue}-${index}`}
                    className={styles["map-col"]}
                    style={{ width: `${colP}%`, ...style }}
                  >
                    {d.value}
                  </div>
                );
              })}
            </div>
            {rowNum > 0 && (
              <div
                key={`heatmap-row-trend-${keyValue}`}
                className={classnames(styles["map-row"], {
                  [styles.show]: trendVisible[keyValue],
                  [styles.hide]: !trendVisible[keyValue],
                })}
              >
                <div
                  className={styles["map-col-trend"]}
                  style={{ width: `${colP}%`, cursor: 'pointer' }}
                  onClick={e => toggleTrendVisible(keyValue)}
                >
                  Trend
                </div>
                {data[key].map((d, index) => {
                  const style =
                    rowNum >= 2 ? { background: getColor(Number(d.value)) } : {};
                  return (
                    <div
                      key={`heatmap-col-trend-${keyValue}-${index}`}
                      className={classnames(styles["map-col-trend"])}
                      style={{ width: `${colP}%` }}
                    >
                      {chartWidth > 0 && <TrendLine data={d.trend} num={`${keyValue}-${index}`} width={chartWidth} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HeatMap;
