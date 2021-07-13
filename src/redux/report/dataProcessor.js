import {
  arrayAverage,
} from "Util/Utils";

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  const subDriverRet = {};

  const resultData = [...result.data];
  resultData.sort(compare);

  resultData.forEach((data) => {
    let questionData = [];
    if ("amQuestionData" in data) {
      questionData = data.amQuestionData;
    }
    if ("aoQuestionData" in data) {
      questionData = data.aoQuestionData;
    }

    questionData.forEach((aq) => {
      if (!(aq.subdriver in subDriverRet)) {
        subDriverRet[aq.subdriver] = [];
      }
    });
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

        if (!("projectUser" in data)) {
          continue
        }

        if (data.projectUser.shGroup === null || data.projectUser.shGroup.id !== currentShGroup.id) {
          continue;
        }

        if (!stakeholders.includes(data.projectUser.id)) {
          stakeholders.push(data.projectUser.id)
        }

        let questionData = [];
        if ("amQuestionData" in data) {
          questionData = data.amQuestionData;
        }
        if ("aoQuestionData" in data) {
          questionData = data.aoQuestionData;
        }
        
        questionData.forEach((aq) => {
          // if (
          //   aq.shGroup.includes(currentShGroup.id) &&
          //   aq.subdriver === currentKey
          // ) {
          if (aq.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            // const dateKey = dateStr[0] + "-" + dateStr[1];  // Year - Month
            const dateKey = MONTH[Number(dateStr[1]) - 1] + " " + dateStr[0];
            // const dateKey = dateStr[1];    // Only Month
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = aq.questionText;
            }
            
            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [data.integerValue];
            }
          }
        });
      }

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: t,
          y: arrayAverage(trend[t]) / 10,
        });
      });

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
    if ("amQuestionData" in data) {
      questionData = data.amQuestionData;
    }
    if ("aoQuestionData" in data) {
      questionData = data.aoQuestionData;
    }

    questionData.forEach((aq) => {
      if (!(aq.subdriver in subDriverRet)) {
        subDriverRet[aq.subdriver] = [];
      }
    });
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

        if (!("projectUser" in data)) {
          continue
        }

        if (data.projectUser.team === null || data.projectUser.team.id !== currentTeam.id) {
          continue;
        }

        if (!stakeholders.includes(data.projectUser.id)) {
          stakeholders.push(data.projectUser.id)
        }

        let questionData = [];
        if ("amQuestionData" in data) {
          questionData = data.amQuestionData;
        }
        if ("aoQuestionData" in data) {
          questionData = data.aoQuestionData;
        }

        questionData.forEach((aq) => {
          // if (
          //   data.subProjectUser.team.id === currentTeam.id &&
          //   aq.subdriver === currentKey
          // ) {
          if (aq.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            const dateKey = MONTH[Number(dateStr[1]) - 1] + " " + dateStr[0];
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = aq.questionText;
            }

            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [data.integerValue];
            }
          }
        });
      }

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: t,
          y: arrayAverage(trend[t]) / 10,
        });
      });

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
    if ("amQuestionData" in data) {
      questionData = data.amQuestionData;
    }
    if ("aoQuestionData" in data) {
      questionData = data.aoQuestionData;
    }

    questionData.forEach((aq) => {
      if (!(aq.subdriver in subDriverRet)) {
        subDriverRet[aq.subdriver] = [];
      }
    });
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

        if (!("projectUser" in data)) {
          continue
        }

        if (data.projectUser.user === null || data.projectUser.user.organization === null || data.projectUser.user.organization.id !== currentOrganization.id) {
          continue;
        }

        if (!stakeholders.includes(data.projectUser.id)) {
          stakeholders.push(data.projectUser.id)
        }

        let questionData = [];
        if ("amQuestionData" in data) {
          questionData = data.amQuestionData;
        }
        if ("aoQuestionData" in data) {
          questionData = data.aoQuestionData;
        }

        if ("projectUser" in data) {
          if (!(stakeholders.includes(data.projectUser.id)) && data.projectUser.user.organization.id === currentOrganization.id) {
            stakeholders.push(data.projectUser.id)
          }
        }

        questionData.forEach((aq) => {
          // if (
          //   data.subProjectUser.user.organization.id === currentOrganization.id &&
          //   aq.subdriver === currentKey
          // ) {
          if (aq.subdriver === currentKey) {
            cnt++;
            sum += data.integerValue;
            const dateStr = data.created_at.split("-");
            const dateKey = MONTH[Number(dateStr[1]) - 1] + " " + dateStr[0];
            // const dateStr = data.created_at.split("T");
            // const dateKey = dateStr[0];

            if (question === "") {
              question = aq.questionText;
            }

            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [data.integerValue];
            }
          }
        });
      }

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: t,
          y: arrayAverage(trend[t]) / 10,
        });
      });

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

