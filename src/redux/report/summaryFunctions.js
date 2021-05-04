import { getCurrentYear, getAverage } from "Util/Utils";

export const getCultureResult = (resData) => {
  const cultureRet = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    for (let j = 0; j < question.aoQuestionData.length; j++) {
      const driverName = question.aoQuestionData[j].driver.driverName;

      /* Culture Result Start */
      if (driverName === "Culture") {
        const subDriver = question.aoQuestionData[j].subdriver;
        if (subDriver in cultureRet) {
          cultureRet[subDriver].value += parseInt(
            intValue,
            10
          );
          cultureRet[subDriver].count += 1;
        } else {
          cultureRet[subDriver] = {
            value: parseInt(intValue, 10),
            count: 1,
          };
        }
      }
      /* Culture Result End */
    }
  }
  
  const filteredCulture = [];

  for (const key in cultureRet) {
    filteredCulture.push({
      culture: key,
      result: parseFloat(
        cultureRet[key].value / cultureRet[key].count
      ).toFixed(2),
    });
  }

  return filteredCulture;
}

export const getOverallTrends = (resData, shGroupList) => {

  // console.log(shGroupList);
  
  const overallTrendsRet = {};
  const currentYear = getCurrentYear();

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    for (let j = 0; j < question.aoQuestionData.length; j++) {
      for (
        let k = 0;
        k < question.aoQuestionData[j].shGroup.length;
        k++
      ) {
        const shGroupId = question.aoQuestionData[j].shGroup[k];
        const filteredShGroupList = shGroupList.filter(
          (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
        );

        if (filteredShGroupList.length > 0) {
          const shGroupName = filteredShGroupList[0].SHGroupName;

          /* OverallTrend Start */
          const questionUpdatedDate = question.created_at;
          const questionYear = questionUpdatedDate.split("-")[0];

          // if (parseInt(questionYear, 10) === parseInt(currentYear, 10)) {
            const questionMonth =
              parseInt(questionUpdatedDate.split("-")[1], 10) - 1;

            if (!(shGroupName in overallTrendsRet)) {
              overallTrendsRet[shGroupName] = [
                { month: 1, value: [] },
                { month: 2, value: [] },
                { month: 3, value: [] },
                { month: 4, value: [] },
                { month: 5, value: [] },
                { month: 6, value: [] },
                { month: 7, value: [] },
                { month: 8, value: [] },
                { month: 9, value: [] },
                { month: 10, value: [] },
                { month: 11, value: [] },
                { month: 12, value: [] },
              ];
            }

            overallTrendsRet[shGroupName][questionMonth].value.push(
              intValue
            );
          // }
          /* OverallTrend End */
        }
      }
    }
  }

  const filteredOverallTrend = [];
  const filteredOverallTrendShGroupList = [];

  for (const key in overallTrendsRet) {
    filteredOverallTrendShGroupList.push(key);

    const temp = [];
    for (let i = 0; i < overallTrendsRet[key].length; i++) {
      temp.push({
        x: overallTrendsRet[key][i].month,
        y: Math.round(parseFloat(
          getAverage(overallTrendsRet[key][i].value)
        ).toFixed(2)),
      });
    }

    filteredOverallTrend.push(temp);
  }

  return {
    key: filteredOverallTrendShGroupList,
    data: filteredOverallTrend
  }
}

export const getSentimentResult = (resData) => {
  const sentimentRet = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    for (let j = 0; j < question.aoQuestionData.length; j++) {
      const driverName = question.aoQuestionData[j].driver.driverName;

      if (driverName === "Sentiment") {
        const subDriver = question.aoQuestionData[j].subdriver;
        if (subDriver in sentimentRet) {
          sentimentRet[subDriver].value += parseInt(
            intValue,
            10
          );
          sentimentRet[subDriver].count += 1;
        } else {
          sentimentRet[subDriver] = {
            value: parseInt(intValue, 10),
            count: 1,
          };
        }
      }
    }
  }

  const filteredSentiment = [];
  const filteredSentimentKeyList = [];

  for (const key in sentimentRet) {
    filteredSentimentKeyList.push(key);
    filteredSentiment.push([
      {
        name: "Pie1",
        count: parseFloat(
          sentimentRet[key].value / sentimentRet[key].count
        ).toFixed(2),
      },
      {
        name: "Pie2",
        count:
          100 -
          parseFloat(
            sentimentRet[key].value / sentimentRet[key].count
          ).toFixed(2),
      },
    ]);
  }

  return {
    key: filteredSentimentKeyList,
    data: filteredSentiment
  }
}

export const getFeedbackSummaryByShGroup = (resData, shGroupList) => {
  
  const drivers = [];
  const ret = {};
      
  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    for (let j = 0; j < question.aoQuestionData.length; j++) {
      const driverName = question.aoQuestionData[j].driver.driverName;

      if (!drivers.includes(driverName)) {
        drivers.push(driverName);
      }

      for (
        let k = 0;
        k < question.aoQuestionData[j].shGroup.length;
        k++
      ) {
        const shGroupId = question.aoQuestionData[j].shGroup[k];
        const filteredShGroupList = shGroupList.filter(
          (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
        );
        if (filteredShGroupList.length > 0) {
          const shGroupName = filteredShGroupList[0].SHGroupName;

          if (shGroupName in ret) {
            if (driverName in ret[shGroupName]) {
              ret[shGroupName][driverName].value += parseInt(
                intValue,
                10
              );
              ret[shGroupName][driverName].count += 1;
            } else {
              ret[shGroupName][driverName] = {
                value: parseInt(intValue, 10),
                count: 1,
              };
            }
          } else {
            ret[shGroupName] = {
              [driverName]: {
                value: parseInt(intValue, 10),
                count: 1,
              },
            };
          }
        }
      }
    }
  }

  const filteredRet = {
    column: ["GROUP"],
    data: [],
  };

  for (let i = 0; i < drivers.length; i++) {
    filteredRet.column.push(drivers[i].toUpperCase());
  }

  for (const key in ret) {
    const row = [];
    row.push(key);

    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i] in ret[key]) {
        row.push(
          (
            ret[key][drivers[i]].value / ret[key][drivers[i]].count
          ).toFixed(1)
        );
      } else {
        row.push(0);
      }
    }

    filteredRet.data.push(row);
  }

  return filteredRet;
}

export const getFeedbackSummaryByTeamOrOrganization = (resData, type) => {

  const drivers = [];
  const ret = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    if (!("projectUser") in question) {
      continue;
    }

    const group = type === "Team" ? question.projectUser.team : question.projectUser.user.organization;

    for (let j = 0; j < question.aoQuestionData.length; j++) {
      const driverName = question.aoQuestionData[j].driver.driverName;

      if (!drivers.includes(driverName)) {
        drivers.push(driverName);
      }

      if (group.name in ret) {
        if (driverName in ret[group.name]) {
          ret[group.name][driverName].value += parseInt(
            intValue,
            10
          );
          ret[group.name][driverName].count += 1;
        } else {
          ret[group.name][driverName] = {
            value: parseInt(intValue, 10),
            count: 1,
          };
        }
      } else {
        ret[group.name] = {
          [driverName]: {
            value: parseInt(intValue, 10),
            count: 1,
          },
        };
      }
    }
  }

  const filteredRet = {
    column: ["GROUP"],
    data: [],
  };

  for (let i = 0; i < drivers.length; i++) {
    filteredRet.column.push(drivers[i].toUpperCase());
  }

  for (const key in ret) {
    const row = [];
    row.push(key);

    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i] in ret[key]) {
        row.push(
          (
            ret[key][drivers[i]].value / ret[key][drivers[i]].count
          ).toFixed(1)
        );
      } else {
        row.push(0);
      }
    }

    filteredRet.data.push(row);
  }

  return filteredRet;
}