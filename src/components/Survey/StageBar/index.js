import React from 'react';
import { Link } from "react-router-dom";
import { Row } from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import {
  selectPage,
} from "Redux/actions";

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

    const { pages, pageIndex } = this.props;
    return (
      <div>
        <Row>
          <Colxx xxs="2">
            <a href="/" onClick={e => this.onPrevPage(e, pageIndex)}><i className="iconsmind-Arrow-Back"></i>Previous</a>
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
            <DropDownMennu />
          </Colxx>
        </Row>
        <Separator />
      </div>
    )
  }
}

const mapStateToProps = ({ settings }) => {

  const { locale } = settings;

  return {
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    setSurveyPage: selectPage
  }
)(StageBar);