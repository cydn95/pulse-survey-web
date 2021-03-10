import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import KeyThemesCarousel from "Components/report/KeyThemes/Carousel";

import styles from "./styles.scss";

import {
  textValueReport,
  getAcknowledgementReport,
  setAcknowledgementReport,
  // actionSetAcknowledgementReport,
} from "Redux/actions";

const CarouselContainer = ({
  label,
  tab,
  actionTextValue,
  surveyId,
  surveyUserId,
  // actionGetAcknowledgement,
  actionSetAcknowledgementReport,
}) => {
  const [data, setData] = useState([]);

  const callback = (res) => {
    setData(res);
  };

  useEffect(() => {
    actionTextValue(surveyId, tab, surveyUserId, callback);
  }, [tab, actionTextValue, surveyId, surveyUserId]);

  const callbackAck = () => {
    actionTextValue(surveyId, tab, surveyUserId, callback);
  };

  const handleAck = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const param = {
      amResponse: d.id,
      projectUser: surveyUserId,
      acknowledgeStatus: Number(value),
    };
    if (responseId === 0) {
      param.likeStatus = 0;
      param.flagStatus = 0;
    }

    actionSetAcknowledgementReport(responseId, param, callbackAck);
  };

  const handleFlag = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const param = {
      amResponse: d.id,
      projectUser: surveyUserId,
      flagStatus: Number(value),
    };
    if (responseId === 0) {
      param.likeStatus = 0;
      param.acknowledgeStatus = 0;
    }

    actionSetAcknowledgementReport(responseId, param, callbackAck);
  };

  const handleLike = (d, value) => {
    const responseId = d.myStatus.length > 0 ? d.myStatus[0].id : 0;
    const param = {
      amResponse: d.id,
      projectUser: surveyUserId,
      likeStatus: Number(value),
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
      <div className={styles["keythemes-content"]}>
        {data.length > 0 &&
          data.map((d) => {
            if (d.topicValue === "") return null;

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
              />
            );
          })}
      </div>
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
