import React from "react";
import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import { connect } from "react-redux";

import { selectPage } from "Redux/actions";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class StageBar extends React.Component {
  onClickPage = (e, pageIndex) => {
    e.preventDefault();
    this.props.setSurveyPage(pageIndex);
  };

  onPrevPage = (e, pageIndex) => {
    e.preventDefault();
    if (pageIndex > 0) {
      this.props.setSurveyPage(pageIndex - 1);
    }
  };

  render() {
    const { pages, pageIndex, percentage } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="stage-progress-container">
            <div className="survey-previous-link">
              <a href="/" onClick={(e) => this.onPrevPage(e, pageIndex)}>
                <i className="previous-link iconsmind-Arrow-Back"></i>Previous
              </a>
            </div>
            <div className="offset"></div>
            <div className="survey-category">
              <a href="/">
                <IntlMessages id="survey.engagement" />{" "}
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.influence" />
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.interest" />
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.sentiment" />
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.engagement" />
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.confidence" />
                <FontAwesomeIcon icon="play" />
              </a>
              <a href="/">
                <IntlMessages id="survey.culture" />
              </a>
            </div>
            <div className="stage-progress">
              <ul className="state-nav">
                {pages.map((page, index) => {
                  let active = index === pageIndex ? "active" : "";
                  return (
                    <li key={index}>
                      <a
                        href="/"
                        onClick={(e) => this.onClickPage(e, index)}
                        className={active}
                        title={"Question" + index}
                      >
                        1
                      </a>
                    </li>
                  );
                })}
              </ul>
              <CircularProgressbar
                className="stage-progress-circle"
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  trailColor: "#ccc",
                  pathColor: "#89CBC1",
                  textSize: "20px",
                })}
              />
            </div>
          </div>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ survey, settings }) => {
  const { locale } = settings;
  const { percentage } = survey;

  return {
    percentage,
    locale,
  };
};

export default connect(mapStateToProps, {
  setSurveyPage: selectPage,
})(StageBar);
