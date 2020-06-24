import React, { Component } from "react";
import { Row } from "reactstrap";

import { Colxx } from "Components/CustomBootstrap";

class Title extends Component {
  render() {
    const { title } = this.props;

    return (
      <Row>
        <Colxx xs="12" md="6" className="survey-content mt-xs">
          <div>Project</div>
          <div className="mt-xs">
            <h1 className="project-name">{title}</h1>
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default Title;
