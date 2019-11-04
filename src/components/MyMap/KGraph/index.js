import React from "react";
import { Row, Input } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { Chart } from 'regraph';
import { height } from "window-size";

class KGraph extends React.Component {

  constructor(props) {
    super(props);

    const { chart } = props;

    this.state = {
      style: {
        flex: 1, 
        width: '100%',
        height: '100%'
      },
      data: { 
        node: { 
          label: { 
            text: 'Me' 
          }
        },
      }
    }
  }

  render() {
    return (
      <div className="div-regraph">
        <Chart
          style={this.state.style}
          items={this.state.data}/>
      </div>
    )
  }
}

export default KGraph;