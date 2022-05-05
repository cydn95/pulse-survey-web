import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

import KeyThemesCarousel from "Components/report/KeyThemes/Carousel";

import styles from "./styles.scss";

import {
  textValueReport,
  getAcknowledgementReport,
  setAcknowledgementReport,
} from "Redux/actions";

const CarouselContainer = ({
  label,
  tab,
  actionTextValue,
  surveyId,
  surveyUserId,
  actionSetAcknowledgementReport,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  const [flagPanelOpen, setFlagPanelOpen] = useState(false);
  const [ackPanelOpen, setAckPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleToggleFlag = (id) => {
    setAckPanelOpen(false);
    if (id !== selectedId) {
      setSelectedId(id);
      setFlagPanelOpen(true)
    } else {
      setFlagPanelOpen(!flagPanelOpen);
    }
  }

  const handleToggleAck = (id) => {
    setFlagPanelOpen(false);
    if (id !== selectedId) {
      setSelectedId(id);
      setAckPanelOpen(true);
    } else {
      setAckPanelOpen(!ackPanelOpen)
    }
  }

  const callback = (res) => {
    setLoading(false);
    setData(res);
    // console.log('res', res)
  };

  useEffect(() => {
    setLoading(true);
    actionTextValue(surveyId, tab, surveyUserId, callback);
  }, [tab, actionTextValue, surveyId, surveyUserId]);

  const callbackAck = () => {
    actionTextValue(surveyId, tab, surveyUserId, callback);
  };

  const handleAck = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const oldValue = d.myStatus.length > 0 ? d.myStatus[0].acknowledgeStatus : 0;
    const param = {
      amResponse: d.id,
      projectUser: surveyUserId,
      acknowledgeStatus: Number(oldValue) === Number(value) ? 0 : Number(value),
    };
    if (responseId === 0) {
      param.likeStatus = 0;
      param.flagStatus = 0;
    }

    actionSetAcknowledgementReport(responseId, param, callbackAck);
  };

  const handleFlag = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const oldValue = d.myStatus.length > 0 ? d.myStatus[0].flagStatus : 0;
    const param = {
      amResponse: d.id,
      orgAmResponse: d.id,
      projectUser: surveyUserId,
      flagStatus: Number(oldValue) === Number(value) ? 0 : Number(value),
    };
    if (responseId === 0) {
      param.likeStatus = 0;
      param.acknowledgeStatus = 0;
    }

    actionSetAcknowledgementReport(responseId, param, callbackAck);
  };

  const handleLike = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const oldValue = d.myStatus.length > 0 ? d.myStatus[0].likeStatus : 0;
    const param = {
      amResponse: d.id,
      projectUser: surveyUserId,
      likeStatus: Number(oldValue) === Number(value) ? 0 : Number(value),
    };
    if (responseId === 0) {
      param.flagStatus = 0;
      param.acknowledgeStatus = 0;
    }
    actionSetAcknowledgementReport(responseId, param, callbackAck);
  };

  return (
    <div className={styles["keythemes-content-wrapper"]}>
      <div className={styles["keythemes-content-title"]}>{label}</div>
      {loading ? (
        <ReactLoading
          className={styles["keythemes-content-loading"]}
          type={"bars"}
          color={"grey"}
        />
      ) : (
        <div className={styles["keythemes-content"]}>
          {data.length > 0 ? (
            data.map((d) => {
              if (d.topicValue === "") return null;
              if (d.myStatus.length > 0) {
                if (d.myStatus[0].flagStatus > 0) {
                  return null;
                }
              }

              return (
                <KeyThemesCarousel
                  data={d}
                  responseId={d.id}
                  key={`keytheme_carousel_${d.id}`}
                  text={d.topicValue}
                  value={d.integerValue}
                  onAck={(value) => handleAck(d, value)}
                  onFlag={(value) => handleFlag(d, value)}
                  onLike={(value) => handleLike(d, value)}
                  flagPanelOpen={flagPanelOpen}
                  ackPanelOpen={ackPanelOpen}
                  onToggleFlag={() => handleToggleFlag(d.id)}
                  onToggleAck={() => handleToggleAck(d.id)}
                  selectedId={selectedId}
                />
              );
            })
          ) : (
            <h2 className={styles["keythemes-content-nodata"]}>No Data</h2>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { surveyId, surveyUserId } = authUser;

  return {
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionTextValue: textValueReport,
  actionGetAcknowledgement: getAcknowledgementReport,
  actionSetAcknowledgementReport: setAcknowledgementReport,
})(CarouselContainer);
