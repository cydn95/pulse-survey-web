import React, { Component } from 'react';
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  CardTitle
} from "reactstrap";

class Account extends Component {

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
      <Row>
        <Colxx xxs="12" lg="12" className="mb-4">
        <Card>
              <CardBody>
                <CardTitle>
                  My Account
                </CardTitle>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" className="col-6" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">First Name</Label>
                    <Input type="email" name="email" id="exampleEmail" className="col-6"  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Last Name</Label>
                    <Input type="email" name="email" id="exampleEmail" className="col-6" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Team</Label>
                    <Input type="email" name="email" id="exampleEmail" className="col-6" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Organization</Label>
                    <Input type="email" name="email" id="exampleEmail" className="col-6" />
                  </FormGroup>
                  <Button color="primary" className="mt-4">
                    <IntlMessages id="UPDATE" />
                  </Button>
                </Form>
              </CardBody>
            </Card>
        </Colxx>
      </Row>
		);
	}
}

export default Account