import React, { Component, Fragment } from 'react';
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import { Redirect, Route, Switch, NavLink, Link } from 'react-router-dom';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardSubtitle,
  CardTitle
} from "reactstrap";

import Account from './account';
import Project from './project';

import classnames from "classnames";

class Settings extends Component {

	constructor(props) {
    super(props);

    this.state = {
      activeFirstTab: "1"
    };
	}
	
	toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
	}
	
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs="12">
						{/* <h1 className="h-title"><IntlMessages id="settings.settings" /></h1> */}

{ false && 
						<Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink className={classnames({active: this.state.activeFirstTab === "1", "nav-link": true })}
                  onClick={() => {this.toggleTab("1");}} to="#">
                  <IntlMessages id="settings.account" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeFirstTab === "2", "nav-link": true })}
                  onClick={() => { this.toggleTab("2"); }} to="#">
                  <IntlMessages id="settings.project" />
                </NavLink>
              </NavItem>
            </Nav>
  }

						<TabContent activeTab={this.state.activeFirstTab}>

              <TabPane tabId="1">
                <Account/>
							</TabPane>
							
							<TabPane tabId="2">
                <Project/>
							</TabPane>

						</TabContent>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}

export default Settings