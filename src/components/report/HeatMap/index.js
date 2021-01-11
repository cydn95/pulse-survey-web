import React, { useMemo, useState, useEffect } from "react";

import { removeSpace } from "../../../services/axios/utility";
import TrendLine from "Components/report/syncfusion/TrendLine";

import styles from "./styles.scss";
import classnames from "classnames";

const getColor = (val) => {
  if (val <= 10) {
    return "#ec644b";
  }

  if (val <= 20) {
    return "#385e61";
  }

  if (val <= 30) {
    return "#436f5e";
  }

  if (val <= 40) {
    return "#4e815a";
  }

  if (val <= 50) {
    return "#548958";
  }

  if (val <= 60) {
    return "#639e54";
  }

  if (val <= 70) {
    return "#6eb052";
  }

  if (val <= 80) {
    return "#73b851";
  }

  if (val <= 90) {
    return "#3498db";
  }

  return "#00b7a2";
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
