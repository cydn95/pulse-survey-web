import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import ReactLoading from "react-loading";

import { getAverage } from "Util/Utils";

import {
  driverList,
  teamList,
  shgroupList,
  myMatrixReport,
  projectMatrixReport,
  topPositiveNegative,
  wordcloud,
  bubbleChart,
} from "Redux/actions";

import BubbleChart from "Components/report/BubbleChart";
import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

const TAB_MY_MATRIX = 1;
const TAB_PROJECT_MATRIX = 2;

const GROUP_BY_PERSON = "Person";
const GROUP_BY_SHGROUP = "SHGroup";
const GROUP_BY_TEAM = "Team";
const GROUP_BY_ORG = "Organization";

const GROUP_BY = [
  GROUP_BY_PERSON,
  GROUP_BY_SHGROUP,
  GROUP_BY_TEAM,
  GROUP_BY_ORG,
];

const GraphInfoSelector = ({
  className,
  label,
  data,
  value,
  onChange = (e) => {},
}) => (
  <div className={className}>
    <span className={styles["content-control-item-label"]}>{label}</span>
    <Select
      value={value}
      className={styles["content-control-item-value"]}
      onChange={(e) => onChange(e)}
    >
      {data.length > 0 &&
        data.map((d) => (
          <MenuItem key={`chart-${label}-${d}`} value={d}>
            {d}
          </MenuItem>
        ))}
    </Select>
  </div>
);

const ReportMatrix = ({
  history,
  projectTitle,
  projectId,
  surveyId,
  surveyUserId,
  teamList,
  shgroupList,
  actionGetShGroupList,
  actionGetTeamList,
  actionMyMatrixReport,
  actionProjectMatrixReport,
}) => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(TAB_MY_MATRIX);

  const [reportData, setReportData] = useState(null);
  const [driverList, setDriverList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const [horizontal, setHorizontal] = useState("");
  const [vertical, setVertical] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [groupBy, setGroupBy] = useState(GROUP_BY_PERSON);

  const [filterGroup, setFilterGroup] = useState([]);
  const [filterTeam, setFilterTeam] = useState([]);
  const [filterOrganization, setFilterOrganization] = useState([]);

  const callbackMatrix = (data) => {
    setLoading(false);

    const tempDriverList = [];
    const tempOrganizationList = [];

    setReportData(data);

    data.forEach((d) => {
      tempDriverList.push(d.driverName);
      if (d.aoResponseData.length > 0) {
        const organization = d.aoResponseData[0].projectUser.user.organization;
        if (tempOrganizationList.findIndex((t) => t.id === organization.id)) {
          tempOrganizationList.push(organization);
        }
      }
    });

    setDriverList(tempDriverList);
    setOrganizationList(tempOrganizationList);

    if (tempDriverList.length > 0) {
      setHorizontal(tempDriverList[0]);
      setSize(tempDriverList[0]);
      setColor(tempDriverList[0]);
    }

    if (tempDriverList.length > 1) {
      setVertical(tempDriverList[1]);
    } else {
      setVertical(tempDriverList[0]);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (tab === TAB_MY_MATRIX) {
      actionMyMatrixReport(surveyId, surveyUserId, callbackMatrix);
    } else {
      actionProjectMatrixReport(surveyId, surveyUserId, callbackMatrix);
    }
  }, [
    tab,
    surveyId,
    surveyUserId,
    actionMyMatrixReport,
    actionProjectMatrixReport,
  ]);

  useEffect(() => {
    actionGetTeamList(projectId, surveyId);
    actionGetShGroupList(surveyId);
  }, [actionGetTeamList, actionGetShGroupList, projectId, surveyId]);

  const filteredReportData = useMemo(() => {
    if (!reportData) return null;
    const tempData = {};

    // Making init data
    for (let i = 0; i < reportData.length; i++) {
      const data = reportData[i];

      if (data.aoResponseData.length === 0) continue;
      const aoResponse = data.aoResponseData[0];

      if (filterGroup.length > 0) {
        if (
          !aoResponse.projectUser.shGroup ||
          !filterGroup.includes(aoResponse.projectUser.shGroup.id)
        ) {
          continue;
        }
      }

      if (filterTeam.length > 0) {
        if (
          !aoResponse.projectUser.team ||
          !filterTeam.includes(aoResponse.projectUser.team.id)
        ) {
          continue;
        }
      }

      if (filterOrganization > 0) {
        if (
          !aoResponse.projectUser.user.organization ||
          !filterOrganization.includes(
            aoResponse.projectUser.user.organization.id
          )
        ) {
          continue;
        }
      }

      const driverName = data.driverName;
      const integerValue = aoResponse.integerValue;

      let info = {
        id: aoResponse.projectUser.user.id,
        name: `${aoResponse.projectUser.user.first_name} ${aoResponse.projectUser.user.last_name}`,
      };

      if (groupBy === GROUP_BY_SHGROUP) {
        info = {
          id: aoResponse.projectUser.shGroup.id,
          name: aoResponse.projectUser.shGroup.SHGroupName,
        };
      } else if (groupBy === GROUP_BY_TEAM) {
        info = {
          id: aoResponse.projectUser.team.id,
          name: aoResponse.projectUser.team.name,
        };
      } else if (groupBy === GROUP_BY_ORG) {
        info = {
          id: aoResponse.projectUser.user.organization.id,
          name: aoResponse.projectUser.user.organization.name,
        };
      }

      if (`id_${info.id}` in tempData) {
        if (driverName in tempData[`id_${info.id}`]) {
          tempData[`id_${info.id}`][driverName].values.push(integerValue);
        } else {
          tempData[`id_${info.id}`][driverName] = {
            values: [integerValue],
          };
        }
      } else {
        tempData[`id_${info.id}`] = {
          name: info.name,
          [driverName]: {
            values: [integerValue],
          },
        };
      }
    }

    // Making bubble chart
    // { x: 92.2, y: 7.8, size: 1.347, text: "China" },

    const ret = [];
    Object.keys(tempData).forEach((key) => {
      const data = tempData[key];
      if (
        horizontal in data &&
        vertical in data &&
        size in data &&
        color in data
      ) {
        ret.push({
          x: getAverage(data[horizontal].values) / 10,
          y: getAverage(data[vertical].values) / 10,
          size: getAverage(data[size].values),
          color: Math.floor(getAverage(data[color].values) / 10),
          text: data.name,
        });
      }
    });

    return ret;
  }, [
    reportData,
    horizontal,
    vertical,
    size,
    color,
    groupBy,
    filterGroup,
    filterTeam,
    filterOrganization,
  ]);

  const handleSelectFilterGroup = (id) => {
    const tempList = [...filterGroup];
    const findIndex = tempList.findIndex((f) => f === id);
    if (findIndex >= 0) {
      tempList.splice(findIndex, 1);
    } else {
      tempList.push(id);
    }

    setFilterGroup(tempList);
  };

  const handleSelectFilterTeam = (id) => {
    const tempList = [...filterTeam];
    const findIndex = tempList.findIndex((f) => f === id);
    if (findIndex >= 0) {
      tempList.splice(findIndex, 1);
    } else {
      tempList.push(id);
    }

    setFilterTeam(tempList);
  };

  const handleSelectFilterOrganization = (id) => {
    const tempList = [...filterOrganization];
    const findIndex = tempList.findIndex((f) => f === id);
    if (findIndex >= 0) {
      tempList.splice(findIndex, 1);
    } else {
      tempList.push(id);
    }

    setFilterOrganization(tempList);
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="Matrix">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>
        <div className={styles["content-chart"]}>
          <div className={styles["content-chart-tab"]}>
            <div
              role="button"
              className={classnames(styles["content-chart-tab-item"], {
                [styles.active]: tab === TAB_MY_MATRIX,
              })}
              onClick={(e) => setTab(TAB_MY_MATRIX)}
            >
              My Matrix
            </div>
            <div
              role="button"
              className={classnames(styles["content-chart-tab-item"], {
                [styles.active]: tab === TAB_PROJECT_MATRIX,
              })}
              onClick={(e) => setTab(TAB_PROJECT_MATRIX)}
            >
              Project Matrix
            </div>
          </div>
          <div className={styles["content-chart-content"]}>
            {loading ? (
              <ReactLoading
                className={styles["content-chart-loading"]}
                type={"bars"}
                color={"grey"}
              />
            ) : (
              filteredReportData && (
                <BubbleChart
                  data={filteredReportData}
                  x={horizontal}
                  y={vertical}
                />
              )
            )}
          </div>
        </div>
        <div className={styles["content-control"]}>
          <GraphInfoSelector
            className={styles["content-control-item"]}
            label="Horizontal Axis"
            data={driverList}
            value={horizontal}
            onChange={(e) => setHorizontal(e.target.value)}
          />
          <GraphInfoSelector
            className={styles["content-control-item"]}
            label="Vertical Axis"
            data={driverList}
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
          />
          <GraphInfoSelector
            className={styles["content-control-item"]}
            label="Bubble Size"
            data={driverList}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <GraphInfoSelector
            className={styles["content-control-item"]}
            label="Color"
            data={driverList}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <br />
          <br />
          <GraphInfoSelector
            className={styles["content-control-item"]}
            label="Group"
            data={GROUP_BY}
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          />
          <div className={styles["content-control-item"]}>
            <span className={styles["content-control-item-label"]}>
              Filters
            </span>
            <div className={styles["content-control-filter"]}>
              <div className={styles["content-control-filter-title"]}>
                Group:
              </div>
              <div className={styles["content-control-filter-content"]}>
                {shgroupList.map((sh) => {
                  const selected = filterGroup.includes(sh.id);
                  return (
                    <Chip
                      className={styles["filter-chipset"]}
                      label={sh.SHGroupName}
                      key={`filter_shgroup_${sh.id}`}
                      color={selected ? "secondary" : "default"}
                      onClick={(e) => handleSelectFilterGroup(sh.id)}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles["content-control-filter"]}>
              <div className={styles["content-control-filter-title"]}>
                Team:
              </div>
              <div className={styles["content-control-filter-content"]}>
                {teamList.map((t) => {
                  const selected = filterTeam.includes(t.id);
                  return (
                    <Chip
                      className={styles["filter-chipset"]}
                      label={t.name}
                      key={`filter_team_${t.id}`}
                      color={selected ? "secondary" : "default"}
                      onClick={(e) => handleSelectFilterTeam(t.id)}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles["content-control-filter"]}>
              <div className={styles["content-control-filter-title"]}>
                Organization:
              </div>
              <div className={styles["content-control-filter-content"]}>
                {organizationList.map((t) => {
                  const selected = filterOrganization.includes(t.id);
                  return (
                    <Chip
                      className={styles["filter-chipset"]}
                      label={t.name}
                      key={`filter_organization_${t.id}`}
                      color={selected ? "secondary" : "default"}
                      onClick={(e) => handleSelectFilterOrganization(t.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, common }) => {
  const { projectTitle, projectId, surveyId, surveyUserId } = authUser;
  const { teamList, shgroupList } = common;

  return {
    projectTitle,
    projectId,
    surveyId,
    surveyUserId,
    teamList,
    shgroupList,
  };
};

export default connect(mapStateToProps, {
  actionMyMatrixReport: myMatrixReport,
  actionProjectMatrixReport: projectMatrixReport,
  actionGetDriverList: driverList,
  actionGetTeamList: teamList,
  actionGetShGroupList: shgroupList,
  actionTopPositiveNegative: topPositiveNegative,
  actionWordCloud: wordcloud,
  actionBubbleChart: bubbleChart,
})(ReportMatrix);
