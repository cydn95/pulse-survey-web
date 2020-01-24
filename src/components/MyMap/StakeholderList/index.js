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
      stakeholderList
    };
  }

  componentWillReceiveProps(props) {
    const { stakeholderList } = props;

    this.setState({
      stakeholderList
    });
  }

  AddStakeHolderToGraph = (e, projectUserId) => {
    e.preventDefault();
    this.props.onAddStakeHolder({ projectUserId });
  }

  render() {
    
    return (
      <Row className="stakeholder-list-container">
        <Colxx xs="12">
          <ul>
          {
            this.state.stakeholderList.map((sh, index) => {
              if (sh.show === false) return false;
              return (
                <Draggable key={sh.projectUserId} type="stakeholder" data={sh.projectUserId} >
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