import React, { Component } from 'react';
import { Colxx } from "Components/CustomBootstrap";
import { NavLink } from 'react-router-dom';
import {
  Row,
  Card,
  CardBody,
} from "reactstrap";

import Switch from "rc-switch";

import "rc-switch/assets/index.css";

class Project extends Component {

  constructor(props) {
    super(props);

    this.state = {
      switchCheckedPrimary: false,
    };
  }

	render() {
		return (
      <Row>
        <Colxx>
          <Card className="d-flex flex-row mb-3">
            <div className="d-flex flex-grow-1 min-width-zero">
              <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                <NavLink
                  to="#"
                  className="list-item-heading mb-1 truncate w-40 w-xs-100"
                >
                Linn Ronning
                </NavLink>
                <div className="w-15 w-xs-100 text-right">
                  <Switch
                    className="custom-switch custom-switch-primary"
                    checked={this.state.switchCheckedPrimary}
                    onChange={switchCheckedPrimary => {
                      this.setState({ switchCheckedPrimary });
                    }}
                  />
                </div>
              </CardBody>
            </div>
          </Card>
        </Colxx>
      </Row>
		);
	}
}

export default Project