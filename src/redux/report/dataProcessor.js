import { getCurrentYear, getCurrentMonth, MONTH, arrayAverage, getPrevMonthData, compareDate } from "Util/Utils";

// const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const compare = (a, b) => {
  if (a.created_at > b.created_at) {
    return 1;
  }

  if (a.created_at < b.created_at) {
    return -1;
  }

  return 0;
}

export const getResultForSHGroup = (shGroupList, result) => {
  // console.log(shGroupList);
  // console.log(result);

  const subDriverRet = {};

  const resultData = [...result.data];
  resultData.sort(compare);

  resultData.forEach((data) => {
    let questionData = [];
    if ("amQuestion" in data) {
      questionData = data.amQuestion;
    } else {
      questionData = data.aoQuestion;
    }
    // if ("aoQuestionData" in data) {
    //   questionData = data.aoQuestionData;
    // }

    // questionData.forEach((aq) => {
      if (!(questionData.subdriver in subDriverRet)) {
        subDriverRet[questionData.subdriver] = [];
      }
    // });
  });

  // console.log(subDriverRet);
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();

  for (let i = 0; i < Object.keys(subDriverRet).length; i++) {
    const currentKey = Object.keys(subDriverRet)[i];

    for (let j = 0; j < shGroupList.length; j++) {
      const currentShGroup = shGroupList[j];

      let cnt = 0;
      let sum = 0;
      let trend = {};
      let question = "";
      const stakeholders = [];

      for (let k = 0; k < resultData.length; k++) {

        const data = resultData[k];

        if (!("subProjectUser" in data)) {
          continue
        }

        // if (!(data.subProjectUser.shType && data.subProjectUser.shType.shTypeName === "Stakeholder")) {
        //   continue;
        // }

        if (data.subProjectUser.shGroup === null || data.subProjectUser.shGroup.SHGroupName !== currentShGroup.SHGroupName) {
          continue;
        }

        if (!stakeholders.includes(data.subProjectUser.id)) {
          stakeholders.push(data.subProjectUser.id)
        }

        let questionData = [];
        if ("amQuestion" in data) {
          questionData = data.amQuestion;
        } else {
          questionData = data.aoQuestion;
        }
        // if ("aoQuestionData" in data) {
        //   questionData = data.aoQuestionData;
        // }

        // questionData.forEach((aq) => {
          // if (
          //   aq.shGroup.includes(currentShGroup.id) &&
          //   aq.subdriver === currentKey
          // ) {
          if (questionData.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            // const dateKey = dateStr[0] + "-" + dateStr[1];  // Year - Month
            const dateKey = MONTH(Number(dateStr[1])) + " " + dateStr[0];
            // const dateKey = dateStr[1];    // Only Month
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = questionData.questionText;
            }

            if (dateKey in trend) {
              trend[dateKey][data.projectUser] = data.integerValue;
            } else {
              trend[dateKey] = {[data.projectUser]: data.integerValue};
            }
          }
        // });
      }

      // console.log('step1')

      Object.keys(trend).map((d, idx, self) => {
        for (let i=0; i <= idx; i++) {
          trend[d] = {...trend[d], ...trend[self[i]]}
        }
      })
      // console.log('step2')

      const newTrend = [];
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const keys = [];
      for (let i = 0; i < 5; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month <= 0) {
          month += 12;
          year = currentYear - 1;
        }

        const key = `${MONTH(month)} ${year}`;

        keys.push({
          key,
          value: 0,
        });
      }
      // console.log('step3', trend)
      
      const reverseKeys = [...keys.reverse()];
      // console.log('step3', reverseKeys)
      let prevYValue = {};
      reverseKeys.map((d, idx) => {
        if(Object.keys(trend).length === 0) {
          return d
        }
        // console.log('step4-0', d.key)
        if (trend[d.key]) {
          prevYValue = {...trend[d.key]}
        } else {
          if(idx === 0) {
            // console.log('step4-1')
            if(compareDate(Object.keys(trend)[0], d.key)) {
              return d
            }
            // console.log('step4-2')
            prevYValue = getPrevMonthData(trend, d.key)
          }
        }

        let sum2 = 0
        Object.keys(prevYValue).map(key => {
          sum2 += prevYValue[key]
        })

        newTrend.push({
          x: d.key,
          y: sum2 / (10 * Object.keys(prevYValue).length),
        })
        return d;
      })

      // console.log('step5')


      // Object.keys(trend).forEach((t, index) => {
      //   newTrend.push({
      //     x: t,
      //     y: arrayAverage(trend[t]) / 10,
      //   });
      // });
      subDriverRet[currentKey].push({
        value: cnt > 0 ? ((sum / cnt / 10).toFixed(1) > 100 ? 100 : (sum / cnt / 10).toFixed(1)) : 0,
        question,
        cnt,
        stakeholders,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}

export const getResultForTeam = (teamList, result) => {
  const subDriverRet = {};

  const resultData = [...result.data];
  resultData.sort(compare);

  resultData.forEach((data) => {
    let questionData = [];
    if ("amQuestion" in data) {
      questionData = data.amQuestion;
    } else {
      questionData = data.aoQuestion;
    }
    // if ("aoQuestionData" in data) {
    //   questionData = data.aoQuestionData;
    // }

    // questionData.forEach((aq) => {
      if (!(questionData.subdriver in subDriverRet)) {
        subDriverRet[questionData.subdriver] = [];
      }
    // });
  });

  for (let i = 0; i < Object.keys(subDriverRet).length; i++) {
    const currentKey = Object.keys(subDriverRet)[i];

    for (let j = 0; j < teamList.length; j++) {
      const currentTeam = teamList[j];

      let cnt = 0;
      const stakeholders = [];
      let question = "";
      let sum = 0;
      let trend = {};

      for (let k = 0; k < resultData.length; k++) {

        const data = resultData[k];

        if (!("subProjectUser" in data)) {
          continue
        }

        // if (!(data.subProjectUser.shType && data.subProjectUser.shType.shTypeName === "Team Member")) {
        //   continue;
        // }

        if (data.subProjectUser.team === null || data.subProjectUser.team.name !== currentTeam.name) {
          continue;
        }

        if (!stakeholders.includes(data.subProjectUser.id)) {
          stakeholders.push(data.subProjectUser.id)
        }

        let questionData = [];
        if ("amQuestion" in data) {
          questionData = data.amQuestion;
        } else {
          questionData = data.aoQuestion;
        }
        // if ("aoQuestionData" in data) {
        //   questionData = data.aoQuestionData;
        // }

        // questionData.forEach((aq) => {
          // if (
          //   data.subProjectUser.team.id === currentTeam.id &&
          //   aq.subdriver === currentKey
          // ) {
          if (questionData.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            const dateKey = MONTH(Number(dateStr[1])) + " " + dateStr[0];
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = questionData.questionText;
            }

            if (dateKey in trend) {
              trend[dateKey][data.projectUser] = data.integerValue;
            } else {
              trend[dateKey] = {[data.projectUser]: data.integerValue};
            }
          }
        // });
      }

      Object.keys(trend).map((d, idx, self) => {
        for (let i=0; i <= idx; i++) {
          trend[d] = {...trend[d], ...trend[self[i]]}
        }
      })

      const newTrend = [];
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const keys = [];
      for (let i = 0; i < 5; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month <= 0) {
          month += 12;
          year = currentYear - 1;
        }

        const key = `${MONTH(month)} ${year}`;

        keys.push({
          key,
          value: 0,
        });
      }

      const reverseKeys = [...keys.reverse()];
      let prevYValue = {};
      reverseKeys.map((d, idx) => {
        // console.log('trend', trend)
        // console.log('prevYValue', prevYValue)
        if(Object.keys(trend).length === 0) {
          return d
        }
        if (trend[d.key]) {
          prevYValue = {...trend[d.key]}
        } else {
          if(idx === 0) {
            if(compareDate(Object.keys(trend)[0], d.key)) {
              return d
            }
            prevYValue = getPrevMonthData(trend, d.key)
          }
        }
        let sum2 = 0
        Object.keys(prevYValue).map(key => {
          sum2 += prevYValue[key]
        })

        newTrend.push({
          x: d.key,
          y: sum2 / (10 * Object.keys(prevYValue).length),
        })
        return d;
      })

      // Object.keys(trend).forEach((t, index) => {
      //   newTrend.push({
      //     x: t,
      //     y: arrayAverage(trend[t]) / 10,
      //   });
      // });

      subDriverRet[currentKey].push({
        value: cnt > 0 ? ((sum / cnt / 10).toFixed(1) > 100 ? 100 : (sum / cnt / 10).toFixed(1)) : 0,
        cnt,
        stakeholders,
        question,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}

export const getResultForOrganization = (organizationList, result) => {
  const subDriverRet = {};

  const resultData = [...result.data];
  resultData.sort(compare);

  resultData.forEach((data) => {
    let questionData = [];
    if ("amQuestion" in data) {
      questionData = data.amQuestion;
    } else {
      questionData = data.aoQuestion;
    }
    // if ("aoQuestionData" in data) {
    //   questionData = data.aoQuestionData;
    // }

    // questionData.forEach((aq) => {
      if (!(questionData.subdriver in subDriverRet)) {
        subDriverRet[questionData.subdriver] = [];
      }
    // });
  });

  for (let i = 0; i < Object.keys(subDriverRet).length; i++) {
    const currentKey = Object.keys(subDriverRet)[i];

    for (let j = 0; j < organizationList.length; j++) {
      const currentOrganization = organizationList[j];

      let cnt = 0;
      const stakeholders = [];
      let sum = 0;
      let trend = {};
      let question = "";

      for (let k = 0; k < resultData.length; k++) {

        const data = resultData[k];

        if (!("subProjectUser" in data)) {
          continue
        }

        if (!("projectOrganization" in data.subProjectUser && data.subProjectUser.projectOrganization !== "")) {
          continue;
        }

        if (data.subProjectUser.projectOrganization !== currentOrganization.id) {
          continue;
        }

        if (!stakeholders.includes(data.subProjectUser.id)) {
          stakeholders.push(data.subProjectUser.id)
        }

        let questionData = [];
        if ("amQuestion" in data) {
          questionData = data.amQuestion;
        } else {
          questionData = data.aoQuestion;
        }
        // if ("aoQuestionData" in data) {
        //   questionData = data.aoQuestionData;
        // }

        // questionData.forEach((aq) => {
          // if (
          //   data.subProjectUser.user.organization.id === currentOrganization.id &&
          //   aq.subdriver === currentKey
          // ) {
          if (questionData.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            const dateKey = MONTH(Number(dateStr[1])) + " " + dateStr[0];
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = questionData.questionText;
            }

            if (dateKey in trend) {
              trend[dateKey][data.projectUser] = data.integerValue;
            } else {
              trend[dateKey] = {[data.projectUser]: data.integerValue};
            }
          }
        // });
      }

      Object.keys(trend).map((d, idx, self) => {
        for (let i=0; i <= idx; i++) {
          trend[d] = {...trend[d], ...trend[self[i]]}
        }
      })

      const newTrend = [];
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const keys = [];
      for (let i = 0; i < 5; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month <= 0) {
          month += 12;
          year = currentYear - 1;
        }

        const key = `${MONTH(month)} ${year}`;

        keys.push({
          key,
          value: 0,
        });
      }

      const reverseKeys = [...keys.reverse()];
      let prevYValue = {};
      reverseKeys.map((d, idx) => {
        // console.log('trend', trend)
        if(Object.keys(trend).length === 0) {
          return d
        }
        if (trend[d.key]) {
          prevYValue = {...trend[d.key]}
        } else {
          if(idx === 0) {
            if(compareDate(Object.keys(trend)[0], d.key)) {
              return d
            }
            prevYValue = getPrevMonthData(trend, d.key)
          }
        }
        
        let sum2 = 0
        Object.keys(prevYValue).map(key => {
          sum2 += prevYValue[key]
        })

        newTrend.push({
          x: d.key,
          y: sum2 / (10 * Object.keys(prevYValue).length),
        })
        return d;
      })

      // Object.keys(trend).forEach((t, index) => {
      //   newTrend.push({
      //     x: t,
      //     y: arrayAverage(trend[t]) / 10,
      //   });
      // });

      subDriverRet[currentKey].push({
        value: cnt > 0 ? ((sum / cnt / 10).toFixed(1) > 100 ? 100 : (sum / cnt / 10).toFixed(1)) : 0,
        cnt,
        stakeholders,
        question,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}
