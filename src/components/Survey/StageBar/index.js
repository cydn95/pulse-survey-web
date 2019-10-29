import React from 'react';
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import {
  selectPage,
} from "Redux/actions";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// const Previous = (props) => {
//   return (
//     <div>
      
//     </div>
//   );
// };

const DropDownMennu = (props) => {
  return (
    <div>
      <Link to="" tooltip="Settings"><i className="fas fa-sliders-h right"></i></Link>
    </div>
  )
}

class StageBar extends React.Component {

  onClickPage = (e, pageIndex) => {
    e.preventDefault();
    this.props.setSurveyPage(pageIndex);
  }

  onPrevPage = (e, pageIndex) => {
    e.preventDefault();
    if (pageIndex > 0) {
      this.props.setSurveyPage(pageIndex - 1);
    }
  }

  render() {

    const { pages, pageIndex, percentage } = this.props;
    
    return (
      <div className="stage-progress-container">
        <Row>
          <Colxx xxs="2">
            <a href="/" onClick={e => this.onPrevPage(e, pageIndex)}><i className="previous-link iconsmind-Arrow-Back"></i>Previous</a>
          </Colxx>
          <Colxx xxs="8" className="stage-progress">
            <ul className="state-nav">
              {
                pages.map((page, index) => {
                  let active = index === pageIndex ? 'active' : '';
                  return (
                    <li key={index}>
                      <a href="/" onClick={e=>this.onClickPage(e, index)} className={active} title={"Question" + index}>1</a>
                    </li>
                  )
                })
              }
            </ul>
          </Colxx>
          <Colxx xxs="2">
            <CircularProgressbar 
                className="stage-progress-circle"
                value={percentage} 
                text={`${percentage}%`} 
                styles={buildStyles({
                  trailColor: '#ccc',
                  pathColor: '#89CBC1',
                  textSize: '20px',
                })}/>
          </Colxx>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ survey, settings }) => {

  const { locale } = settings;
  const { percentage } = survey;

  return {
    percentage,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    setSurveyPage: selectPage
  }
)(StageBar);