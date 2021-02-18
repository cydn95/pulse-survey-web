import {
  arrayAverage,
} from "Util/Utils";

export const getResultForSHGroup = (shGroupList, result) => {
  const subDriverRet = {};

  result.data.forEach((data) => {
    data.amQuestionData.forEach((aq) => {
      if (!(aq.subdriver in subDriverRet)) {
        subDriverRet[aq.subdriver] = [];
      }
    });
  });

  for (let i = 0; i < Object.keys(subDriverRet).length; i++) {
    const currentKey = Object.keys(subDriverRet)[i];

    for (let j = 0; j < shGroupList.length; j++) {
      const currentShGroup = shGroupList[j];

      let cnt = 0;
      let sum = 0;
      let trend = {};
      result.data.forEach((data) => {
        data.amQuestionData.forEach((aq) => {
          if (
            aq.shGroup.includes(currentShGroup.id) &&
            aq.subdriver === currentKey
          ) {
            cnt++;
            sum += data.integerValue;
            // console.log(data.updated_at.split("-"));
            const dateStr = data.updated_at.split("-");
            const dateKey = dateStr[0] + "-" + dateStr[1];

            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [];
            }
          }
        });
      });

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: index + 1,
          y: arrayAverage(trend[t]),
        });
      });

      subDriverRet[currentKey].push({
        value: cnt > 0 ? (sum / cnt / 10).toFixed(1) : 0,
        cnt,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}

export const getResultForTeam = (teamList, result) => {
  const subDriverRet = {};

  result.data.forEach((data) => {
    data.amQuestionData.forEach((aq) => {
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
      let sum = 0;
      let trend = {};
      result.data.forEach((data) => {
        data.amQuestionData.forEach((aq) => {
          if (
            data.subProjectUser.team.id === currentTeam.id &&
            aq.subdriver === currentKey
          ) {
            cnt++;
            sum += data.integerValue;
            // console.log(data.updated_at.split("-"));
            const dateStr = data.updated_at.split("-");
            const dateKey = dateStr[0] + "-" + dateStr[1];

            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [];
            }
          }
        });
      });

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: index + 1,
          y: arrayAverage(trend[t]),
        });
      });

      subDriverRet[currentKey].push({
        value: cnt > 0 ? (sum / cnt / 10).toFixed(1) : 0,
        cnt,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}

export const getResultForOrganization = (organizationList, result) => {
  const subDriverRet = {};

  result.data.forEach((data) => {
    data.amQuestionData.forEach((aq) => {
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
      let sum = 0;
      let trend = {};
      result.data.forEach((data) => {
        data.amQuestionData.forEach((aq) => {
          if (
            data.subProjectUser.user.organization.id === currentOrganization.id &&
            aq.subdriver === currentKey
          ) {
            cnt++;
            sum += data.integerValue;
            // console.log(data.updated_at.split("-"));
            const dateStr = data.updated_at.split("-");
            const dateKey = dateStr[0] + "-" + dateStr[1];

            if (dateKey in trend) {
              trend[dateKey].push(data.integerValue);
            } else {
              trend[dateKey] = [];
            }
          }
        });
      });

      const newTrend = [];

      Object.keys(trend).forEach((t, index) => {
        newTrend.push({
          x: index + 1,
          y: arrayAverage(trend[t]),
        });
      });

      subDriverRet[currentKey].push({
        value: cnt > 0 ? (sum / cnt / 10).toFixed(1) : 0,
        cnt,
        trend: newTrend,
      });
    }
  }

  return subDriverRet;
}