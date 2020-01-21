import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Draggable, Droppable } from 'react-drag-and-drop'

class StakeholderList extends React.Component {

  constructor(props) {

    super(props);

    const { stakeholderList } = props;
    this.state = {
      'stakeholderList': stakeholderList
    };
  }

  componentWillReceiveProps(props) {
    const { stakeholderList } = props;
    
    this.setState({
      stakeholderList
    });
  }

  AddStakeHolderToGraph = (e, index) => {
    e.preventDefault();

    const data = {
      "stakeholder": index
    }
    this.props.onAddStakeHolder(data);
  }

  render() {
    
    return (
      <Row className="stakeholder-list-container">
        <Colxx xs="12">
          <ul>
          {
            this.state.stakeholderList.map((sh, index) => {
              if (sh.show === false) return;
              return (
                <Draggable key={sh.projectuserId} type="stakeholder" data={index} >
                  <li className="stakeholder-item">
                    <FontAwesomeIcon icon="user" />
                    <span>{sh.fullName}</span>
                    <a href="/" onClick={e => this.AddStakeHolderToGraph(e, index)}><FontAwesomeIcon icon="plus"/></a>
                  </li>
                </Draggable>
              )}
            )
          }
          </ul>
        </Colxx>  
      </Row>
    )
  }
}

export default StakeholderList;