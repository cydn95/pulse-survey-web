import React, { Component, Fragment } from "react";

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      menu_state: 'menu-1'
    }

  }
  clickSubMenu = (e, menu) => {
    
    e.preventDefault();

    this.setState({
      menu_state: menu
    });
  }
  
  render() {

    return (
      <div>
        <div class="dashboard-sidebar">
          <ul>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-1')} 
                className={this.state.menu_state === 'menu-1' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-engagement.png"/>
                </a>
              </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-2')} 
                className={this.state.menu_state === 'menu-2' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-projmap.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-3')} 
                className={this.state.menu_state === 'menu-3' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-mymap.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-4')} 
                className={this.state.menu_state === 'menu-4' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-engagement.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-5')} 
                className={this.state.menu_state === 'menu-5' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-sentiment-smile.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-6')} 
                className={this.state.menu_state === 'menu-6' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-engagement.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-7')} 
                className={this.state.menu_state === 'menu-7' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-culture.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-8')} 
                className={this.state.menu_state === 'menu-8' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-influence.png"/>
              </a>
            </li>
            <li>
              <a href="/" onClick={e => this.clickSubMenu(e, 'menu-9')} 
                className={this.state.menu_state === 'menu-9' ? 'active' : ''}>
                <img src="/assets/img/survey/menu-projmap.png"/>
              </a>
            </li>
          </ul>
        </div>
        <div class="dashboard-main">
          <Row>
            <Colxx xs="12" className="text-center mt-5">
              <img src="/assets/img/survey/results.png" width="150"/>
            </Colxx>
          </Row>
          <Row>
            <Colxx xs="12" className="text-center">
              <h1>
                We are still checking the Pulse of the project... 
              </h1>
              <p>
                Reports will be available in a few days.  Please check back soon!
              </p>
            </Colxx>
          </Row>
        </div>
        <img class="dashboard-logo" src="/assets/img/survey/site-logo.png"/>
      </div>
    );
  }
}

export default Dashboard
