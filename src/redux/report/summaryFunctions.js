import { getCurrentYear, getCurrentMonth, MONTH, getAverage } from "Util/Utils";
import { controlType, controlTypeText } from "Constants/defaultValues";

export const getCultureResult = (resData) => {
  const cultureRet = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    if (question.controlType !== "SLIDER") continue;
    const intValue = question.integerValue;

    const questionData = question.amQuestion;

    // for (let j = 0; j < questionData.length; j++) {
      const driver = questionData.driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

      /* Culture Result Start */
      if (driverName === "Culture") {
        const subDriver = questionData.subdriver;
        if (subDriver in cultureRet) {
          cultureRet[subDriver].value += parseInt(intValue, 10);
          cultureRet[subDriver].count += 1;
        } else {
          cultureRet[subDriver] = {
            value: parseInt(intValue, 10),
            count: 1,
          };
        }
      }
      /* Culture Result End */
    // }
  }

  const filteredCulture = [];

  for (const key in cultureRet) {
    filteredCulture.push({
      culture: key,
      result: parseFloat(cultureRet[key].value / cultureRet[key].count).toFixed(
        2
      ),
    });
  }

  return filteredCulture;
};

export const getOverallTrends = (resData, shGroupList, projectId) => {
  // console.log('shGroupList', shGroupList);
  // console.log('resData', resData)

  const overallTrendsRet = [];
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
      value: [],
    });
  }

  const reverseKeys = [...dateKeys.reverse()];

  // console.log(dateKeys.reverse());

  let questions = resData.filter(question => question.project.toString() === projectId.toString())
  questions.sort((a, b) => a.updated_at.localeCompare(b.updated_at))
  let handledData = questions.map(q => {
    return {
      key: `${MONTH(Number(q.updated_at.split("-")[1]))} ${q.updated_at.split("-")[0]}`,
      user: q.projectUser,
      intValue: q.integerValue
    }
  })
  let data = [...handledData]
  data.reverse()
  reverseKeys.map(r => {
    let index = data.findIndex(d => d.key === r.key)
    if (index === -1) return r;
    let temp = []
    let length = handledData.length;
    for (let i = 0; i < length - index; i++) {
      temp[handledData[i].user] = handledData[i].intValue
    }
    Object.keys(temp).map(key => {
      r.value.push(temp[key])
      return key
    })
    console.log('r', r)
    return r
  })
  let prevValue
  reverseKeys.map((r, idx) => {
    overallTrendsRet.push({
      x: r.key,
      y: Math.round(r.value.length ? r.value.reduce((pre, crr) => pre + crr, 0) / r.value.length : (idx === 0 ? 0 : overallTrendsRet[idx - 1].y)).toFixed(2),
    })
    return r;
  })
  let tempData = []
  tempData.push(overallTrendsRet)
  tempData.push(overallTrendsRet)
  // for (let i = 0; i < questions.length; i++) {
  //   const question = questions[i];
  //   const intValue = question.integerValue;
  //   if (!question.latestResponse) {
  //     continue;
  //   }

  //   if (question.project.toString() !== projectId.toString()) {
  //     continue
  //   }

  //   const questionData = question.amQuestionData;

  //   // console.log('question', question)

  //   for (let j = 0; j < questionData.length; j++) {
  //     for (let k = 0; k < questionData[j].shGroup.length; k++) {
  //       // console.log('overallTrendsRet', overallTrendsRet)
  //       const shGroupId = questionData[j].shGroup[k];
  //       const filteredShGroupList = shGroupList.filter(
  //         (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
  //       );

  //       if (filteredShGroupList.length > 0) {
  //         const shGroupName = filteredShGroupList[0].SHGroupName;

  //         /* OverallTrend Start */
  //         const questionUpdatedDate = question.updated_at;

  //         const dateSplits = questionUpdatedDate.split("-");
  //         if (dateSplits.length < 2) {
  //           continue;
  //         }
  //         const questionYear = dateSplits[0];
  //         const questionMonth = dateSplits[1];

  //         const key = `${MONTH(Number(questionMonth))} ${questionYear}`;

  //         // console.log(key);

  //         if (!(shGroupName in overallTrendsRet)) {
  //           overallTrendsRet[shGroupName] = [...reverseKeys];
  //         }

  //         const findIndex = overallTrendsRet[shGroupName].findIndex(
  //           (item) => item.key === key
  //         );
  //         if (findIndex >= 0) {
  //           overallTrendsRet[shGroupName][findIndex].value.push(intValue);
  //         }

  //         /* OverallTrend End */
  //       }
  //     }
  //   }
  // }

  // const filteredOverallTrend = [];
  // const filteredOverallTrendShGroupList = [];

  // for (const key in overallTrendsRet) {
  //   filteredOverallTrendShGroupList.push(key);

  //   const temp = [];

  //   let prevYValue = 0;

  //   for (let i = 0; i < overallTrendsRet[key].length; i++) {
  //     let yValue = Math.round(
  //       parseFloat(getAverage(overallTrendsRet[key][i].value)).toFixed(2)
  //     );

  //     // previous month value
  //     if (overallTrendsRet[key][i].value.length === 0) {
  //       yValue = prevYValue;
  //     }

  //     prevYValue = yValue;

  //     temp.push({
  //       x: overallTrendsRet[key][i].key,
  //       y: yValue,
  //     });
  //   }

  //   filteredOverallTrend.push(temp);
  // }
  // console.log('filteredOverallTrend', filteredOverallTrend);

  return {
    key: [],
    data: tempData,
  };
};

export const getSentimentResult = (resData) => {
  const sentimentRet = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];

    if (question.controlType !== controlTypeText(controlType.SLIDER)) {
      continue;
    }

    if (!question.latestResponse) {
      continue;
    }

    const intValue = question.integerValue;

    const questionData = question.amQuestion;

    // for (let j = 0; j < questionData.length; j++) {
      const driver = questionData.driver;

      if (!driver) {
        continue;
      }

      const driverName = driver.driverName;

      if (driverName === "Sentiment") {
        const subDriver = questionData.subdriver;
        if (subDriver in sentimentRet) {
          sentimentRet[subDriver].value += parseInt(intValue, 10);
          sentimentRet[subDriver].count += 1;
        } else {
          sentimentRet[subDriver] = {
            value: parseInt(intValue, 10),
            count: 1,
          };
        }
      }
    // }
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
          parseFloat(sentimentRet[key].value / sentimentRet[key].count).toFixed(
            2
          ),
      },
    ]);
  }

  return {
    key: filteredSentimentKeyList,
    data: filteredSentiment,
  };
};

export const getFeedbackSummaryByShGroup = (resData) => {
  // console.log('data', resData);

  const drivers = [];
  const ret = {};

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    if (question.controlType.toString() !== controlTypeText(controlType.SLIDER).toString()) {
      continue;
    }

    if (question.latestResponse !== true) {
      continue;
    }

    if (!("subProjectUser" in question)) {
      continue;
    }

    // if (question.projectUser.user.email == "cetest@noemail.com") {
    //   console.log(question.projectUser.shGroup.SHGroupName, question.projectUser);
    // }

    // console.log(question.projectUser.shGroup.SHGroupName);

    const questionData = question.amQuestion;

    // for (let j = 0; j < questionData.length; j++) {
      const driver = questionData.driver;
      const subdriver = questionData.subdriver;

      if (!driver || !subdriver) {
        continue;
      }

      const driverName = driver.driverName;

      if (driverName === "Engagement" && subdriver !== "Actual Engagement") {
        continue;
      }
      if (driverName === "Sentiment" && subdriver !== "Overall Sentiment") {
        continue;
      }
      if (driverName === "Influence" && subdriver !== "Personal Influence") {
        continue;
      }
      if (driverName === "Interest" && subdriver !== "Concern") {
        continue;
      }
      if (driverName === "Confidence" && subdriver !== "General Confidence") {
        continue;
      }
      if (driverName === "Culture" && subdriver !== "Overall Culture") {
        continue;
      }
      // if (driverName === "Relationships" && subdriver !== "Trust of leaders") {
      //   continue;
      // }
      if (driverName === "Relationships") {
        continue;
      }

      if (!drivers.includes(driverName)) {
        drivers.push(driverName);
      }

      // for (let k = 0; k < shGroupList.length; k++) {
      // const currentShGroupName = shGroupList[k].SHGroupName;
      const shGroupName = question.subProjectUser.shGroup.SHGroupName;

      // if (currentShGroupName.toString() === shGroupName.toString()) {
      //   continue;
      // }

      if (shGroupName in ret) {
        if (driverName in ret[shGroupName]) {
          ret[shGroupName][driverName].value += parseInt(intValue, 10);
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
      // }
    // }
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
          (ret[key][drivers[i]].value / ret[key][drivers[i]].count).toFixed(1)
        );
      } else {
        row.push(0);
      }
    }

    filteredRet.data.push(row);
  }

  return filteredRet;
};

export const getFeedbackSummaryByTeamOrOrganization = (resData, type) => {
  const drivers = [];
  const ret = {};

  // console.log('resData', resData)

  for (let i = 0; i < resData.length; i++) {
    const question = resData[i];
    const intValue = question.integerValue;

    if (question.controlType !== controlTypeText(controlType.SLIDER)) {
      continue;
    }

    if (!"subProjectUser" in question) {
      continue;
    }

    let group = null;
    if (type === "Team") {
      group = question.subProjectUser.team;
    }
    if (
      type === "Organization" &&
      question.subProjectUser.projectOrganization
    ) {
      group = {
        name: question.subProjectUser.projectOrganization,
      };
    }

    if (!group) {
      continue;
    }

    if (!question.latestResponse) {
      continue;
    }

    const questionData = question.amQuestion;

    // for (let j = 0; j < questionData.length; j++) {
      const driver = questionData.driver;
      const subdriver = questionData.subdriver;

      if (!driver || !subdriver) {
        continue;
      }

      const driverName = driver.driverName;

      if (driverName === "Engagement" && subdriver !== "Actual Engagement") {
        continue;
      }
      if (driverName === "Sentiment" && subdriver !== "Overall Sentiment") {
        continue;
      }
      if (driverName === "Influence" && subdriver !== "Personal Influence") {
        continue;
      }
      if (driverName === "Interest" && subdriver !== "Concern") {
        continue;
      }
      if (driverName === "Confidence" && subdriver !== "General Confidence") {
        continue;
      }
      if (driverName === "Culture" && subdriver !== "Overall Culture") {
        continue;
      }
      // if (driverName === "Relationships" && subdriver !== "Trust of leaders") {
      //   continue;
      // }
      if (driverName === "Relationships") {
        continue;
      }

      if (!drivers.includes(driverName)) {
        drivers.push(driverName);
      }

      if (group.name in ret) {
        if (driverName in ret[group.name]) {
          ret[group.name][driverName].value += parseInt(intValue, 10);
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
    // }
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
          (ret[key][drivers[i]].value / ret[key][drivers[i]].count).toFixed(1)
        );
      } else {
        row.push(0);
      }
    }

    filteredRet.data.push(row);
  }

  return filteredRet;
};
