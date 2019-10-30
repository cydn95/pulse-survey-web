import React, { Component, Fragment } from "react";

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { connect } from 'react-redux';

import classnames from 'classnames';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      menu_state: 'menu-1',
      menu_bar_width: 'dashboard-container-width-1'
    }

  }
  clickSubMenu = (e, menu) => {
    
    e.preventDefault();

    this.setState({
      menu_state: menu
    });
  }
  
  componentWillReceiveProps(props) {
      const { menuClickCount } = props;
      this.setState({
        menu_bar_width: menuClickCount % 2 === 0 ? 'dashboard-container-width-1' : 'dashboard-container-width-2'
      });
  }

  render() {

    // var containerClass = classNames({
    //   'dashboard-container': true,
    //   this.state.da
    // });
    
    return (
      <div className={"dashboard-container " + this.state.menu_bar_width}>
        <div className="dashboard-sidebar">
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

const mapStateToProps = ({ menu, survey, settings }) => {

  const { pageList, pageIndex } = survey;
  const { locale } = settings;
  const { menuClickCount } = menu; 

  return {
    menuClickCount
  };
};

export default connect(
  mapStateToProps,
  {
  }
)(Dashboard);


// export default Dashboard
