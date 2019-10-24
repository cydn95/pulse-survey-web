import React, { Component, Fragment } from "react";

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { Title } from "Components/Survey";

class Dashboard extends Component {

  render() {

    return (
      <Fragment>
        <Title title="Alfa Project" />
        <Row>
          <Colxx xs="12" className="coming-box">
            <span>
            We are still checking the Pulse of the project...<br/>
            That means the reports won't be available for a few more days. <br />
            Please check back soon.<br/>
            </span>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default Dashboard
