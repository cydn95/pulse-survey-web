import React from "react";

import { Row, Input } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  changeSearchBox = (e) => {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        this.props.onFilter(this.state.search);
      }
    );
  };

  render() {
    return (
      <Row>
        <Colxx xs="12">Enter Name</Colxx>
        <Colxx xs="12">
          <Input
            type="text"
            value={this.state.search}
            onChange={(e) => this.changeSearchBox(e)}
          />
        </Colxx>
      </Row>
    );
  }
}

export default SearchBox;
