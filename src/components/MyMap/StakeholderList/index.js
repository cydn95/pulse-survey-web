import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Draggable, Droppable } from 'react-drag-and-drop'

class StakeholderList extends React.Component {

  constructor(props) {

    super(props);

    const { projectUserList } = props;
    this.state = {
      'projectUserList': projectUserList
    };
  }

  componentWillReceiveProps(props) {
    const { projectUserList } = props;
    
    this.setState({
      'projectUserList': projectUserList
    });
  }

  render() {
    
    return (
      <Row className="stakeholder-list-container">
        <Colxx xs="12">
          <ul>
          {
            this.state.projectUserList.map((statkeholder, index) => {
              if (statkeholder.show === false) return;
              return (
                <Draggable key={index} type="stakeholder" data={index} >
                  <li className="stakeholder-item">
                    <FontAwesomeIcon icon="user" />
                    <span>{statkeholder.firstName + " " + statkeholder.lastName}</span>
                    <a href=""><FontAwesomeIcon icon="plus"/></a>
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