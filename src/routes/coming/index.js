import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

class ComingSoon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    
  }
  render() {
    console.log("dhfkjashfjkfhjaksdfsdafasdfasdf");
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">Pulse</p>
                    {/* <p className="white">Yes, it is indeed!</p> */}
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      {/* <span className="logo-single" /> */}
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="layouts.coming-soon-title" />
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      <IntlMessages id="layouts.coming-soon-message" />
                    </p>
                    <p className="display-1 font-weight-bold mb-5">   </p>
                    <Button
                      href="/app"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="layouts.go-back-home" />
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
export default ComingSoon;