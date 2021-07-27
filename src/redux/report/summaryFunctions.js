import { getCurrentYear, getCurrentMonth, MONTH, getAverage } from "Util/Utils";

export const getCultureResult = (resData) => {
  const cultureRet = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    const questionData = question.amQuestionData; 

    for (let j = 0; j < questionData.length; j++) {
      const driver = questionData[j].driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

      /* Culture Result Start */
      if (driverName === "Culture") {
        const subDriver = questionData[j].subdriver;
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
  const currentMonth = getCurrentMonth();

  const dateKeys = [];
  for (let i = 0; i < 6; i++) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month <= 0) {
      month += 12;
      year = currentYear - 1;
    }

    const key = `${MONTH(month)} ${year}`;

    dateKeys.push({
      key,
      value: []
    });
  }

  // console.log(dateKeys.reverse());

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    const questionData = question.amQuestionData; 

    for (let j = 0; j < questionData.length; j++) {
      for (
        let k = 0;
        k < questionData[j].shGroup.length;
        k++
      ) {
        const shGroupId = questionData[j].shGroup[k];
        const filteredShGroupList = shGroupList.filter(
          (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
        );

        if (filteredShGroupList.length > 0) {
          const shGroupName = filteredShGroupList[0].SHGroupName;

          /* OverallTrend Start */
          const questionUpdatedDate = question.created_at;

          const dateSplits = questionUpdatedDate.split("-");
          if (dateSplits.length < 2) {
            continue;
          }
          const questionYear = dateSplits[0];
          const questionMonth = dateSplits[1];

          const key = `${MONTH(Number(questionMonth))} ${questionYear}`;
          
          // console.log(key);

          if (!(shGroupName in overallTrendsRet)) {
            overallTrendsRet[shGroupName] = [
              ...dateKeys.reverse()
            ];
          }

          const findIndex = overallTrendsRet[shGroupName].findIndex((item) => item.key === key);
          if (findIndex >= 0) {
            overallTrendsRet[shGroupName][findIndex].value.push(intValue);
          }

          /* OverallTrend End */
        }
      }
    }
  }

  // console.log(overallTrendsRet);

  const filteredOverallTrend = [];
  const filteredOverallTrendShGroupList = [];

  for (const key in overallTrendsRet) {
    filteredOverallTrendShGroupList.push(key);

    const temp = [];
    for (let i = 0; i < overallTrendsRet[key].length; i++) {
      temp.push({
        x: overallTrendsRet[key][i].key,
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

    const questionData = question.amQuestionData; 

    for (let j = 0; j < questionData.length; j++) {
      const driver = questionData[j].driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

      if (driverName === "Sentiment") {
        const subDriver = questionData[j].subdriver;
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
  
  // console.log('data', resData);
  // console.log('shGroupList', shGroupList);

  const drivers = [];
  const ret = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    if (!question.projectUser.shGroup) {
      continue;
    }

    // if (question.projectUser.user.email == "cetest@noemail.com") {
    //   console.log(question.projectUser.shGroup.SHGroupName, question.projectUser);
    // }

    // console.log(question.projectUser.shGroup.SHGroupName);

    const questionData = question.amQuestionData; 

    for (let j = 0; j < questionData.length; j++) {
      const driver = questionData[j].driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

      if (!drivers.includes(driverName)) {
        drivers.push(driverName);
      }

      for (
        let k = 0;
        k < questionData[j].shGroup.length;
        k++
      ) {
        const shGroupId = questionData[j].shGroup[k];
        const filteredShGroupList = shGroupList.filter(
          (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
        );
        if (filteredShGroupList.length > 0) {
          const shGroupName = filteredShGroupList[0].SHGroupName;
          const projectUserShGroupName = question.projectUser.shGroup.SHGroupName;

          if (shGroupName !== projectUserShGroupName) {
            continue;
          }

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

    let group = null;
    if (type === "Team") {
      group = question.projectUser.team;
    }
    if (type === "Organization" && question.projectUser.projectOrganization) {
       group = {
         name: question.projectUser.projectOrganization
       }
    }

    if (!group) {
      continue;
    }

    const questionData = question.amQuestionData;

    for (let j = 0; j < questionData.length; j++) {
      const driver = questionData[j].driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

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